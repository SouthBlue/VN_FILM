import io
import json

import numpy as np
import pandas as pd
import re
from keras.preprocessing.text import Tokenizer
from keras.preprocessing.sequence import pad_sequences
from keras.utils import to_categorical
from gensim.models.keyedvectors import KeyedVectors

Data_Full_train_2C = "E:\\pythonProject\\CNN\\Data_Full_train.xlsx"  # co them phan test
url_word2vec_aspect = "E:\\pythonProject\\CNN\\word2vec\\Full_Data_for_Word2vec.model"

EMBEDDING_DIM = 300
NUM_WORDS = 50000
max_length = 300
pad = ['post', 'pre']
test_num_full = 110


def clean_str(string):
    string = re.sub(r"[^A-Za-z0-9(),!?\'\`]", " ", string)
    string = re.sub(r"\'s", " \'s", string)
    string = re.sub(r"\'ve", " \'ve", string)
    string = re.sub(r"n\'t", " n\'t", string)
    string = re.sub(r"\'re", " \'re", string)
    string = re.sub(r"\'d", " \'d", string)
    string = re.sub(r"\'ll", " \'ll", string)
    string = re.sub(r",", " , ", string)
    string = re.sub(r"!", " ! ", string)
    string = re.sub(r"\(", " \( ", string)
    string = re.sub(r"\)", " \) ", string)
    string = re.sub(r"\?", " \? ", string)
    string = re.sub(r"\s{2,}", " ", string)
    return string.strip().lower()


def load_data_temp():
    test_data = pd.read_excel(Data_Full_train_2C, 'Sheet1')
    train_data = pd.read_excel(Data_Full_train_2C, 'Sheet1')
    train_len = len(train_data)

    print(train_data.shape, test_data.shape)
    print(train_data.isnull().sum())
    print(test_data.isnull().sum())

    dic = {'love': 0, 'fear': 1, 'comedy': 2}
    labels = train_data.polarity.apply(lambda x: dic[x])

    val_data = train_data.sample(frac=0.17, random_state=42)
    train_len = train_len - len(val_data)
    train_data = train_data.drop(val_data.index)
    texts = train_data.text
    tokenizer = Tokenizer(num_words=NUM_WORDS, filters='!"#$%&()*+,-./:;<=>?@[\\]^_`{|}~\t\n\'',
                          lower=True)
    tokenizer.fit_on_texts(texts)
    tokenizer_json = tokenizer.to_json()
    with io.open('E:\\pythonProject\\CNN\\word2vec\\vocab.json', 'w', encoding='utf-8') as f:
        f.write(json.dumps(tokenizer_json, ensure_ascii=False))
    print("tokenizer Text:")
    print(texts)
    sequences_train = tokenizer.texts_to_sequences(texts)
    sequences_valid = tokenizer.texts_to_sequences(val_data.text)
    word_index = tokenizer.word_index
    print('Found %s unique tokens.' % len(word_index))

    print("Cau thu train_data")
    print(sequences_train[train_len - test_num_full + 1])

    X_train = pad_sequences(sequences_train, maxlen=max_length, padding=pad[0])
    X_val = pad_sequences(sequences_valid, maxlen=X_train.shape[1], padding=pad[0])
    y_train = to_categorical(np.asarray(labels[train_data.index]))
    y_val = to_categorical(np.asarray(labels[val_data.index]))

    word_vectors = KeyedVectors.load(url_word2vec_aspect, mmap='r')

    vocabulary_size = min(len(word_index) + 1, NUM_WORDS)
    print("vocabulary_size size:")
    print(vocabulary_size)
    embedding_matrix = np.zeros((vocabulary_size, EMBEDDING_DIM))
    print("embedding_matrix size:")
    print(embedding_matrix)
    for word, i in word_index.items():
        if i >= NUM_WORDS:
            continue
        try:
            embedding_vector = word_vectors[word]
            embedding_matrix[i] = embedding_vector
        except KeyError:
            embedding_matrix[i] = np.random.normal(0, np.sqrt(0.25), EMBEDDING_DIM)

    del (word_vectors)

    from keras.layers import Embedding
    embedding_layer = Embedding(vocabulary_size,
                                EMBEDDING_DIM,
                                weights=[embedding_matrix],
                                trainable=True)
    print("embedding_layer")
    #    print(embedding_layer.weights())
    vocabulary_size = min(len(word_index) + 1, NUM_WORDS)

    X_test = X_train[train_len - test_num_full:]
    y_test = y_train[train_len - test_num_full:]
    X_train = X_train[0: train_len - test_num_full]
    y_train = y_train[0: train_len - test_num_full]

    return X_train, y_train, X_test, y_test, X_val, y_val, embedding_layer
