import json
import numpy as np
import pandas as pd
import keras.preprocessing.text as kpt
from keras.preprocessing.text import Tokenizer
from keras.utils import to_categorical
from keras.preprocessing.sequence import pad_sequences
from gensim.models.keyedvectors import KeyedVectors
from keras.models import Sequential
from keras.layers import Conv1D, MaxPooling1D, LSTM
from keras.layers import Dense, Dropout
from keras.callbacks import ModelCheckpoint
from keras.models import model_from_json
from keras_preprocessing.text import tokenizer_from_json
from keras import regularizers

url_full_train_data = "E:\\pythonProject\\CNN\\Data_Full_train.xlsx"
url_word2vec_full = "E:\\pythonProject\\CNN\\word2vec\\Full_Data_for_Word2vec.model"
pad = 'post'
epoch = 100
batch_size = 128
max_length = 300
NUM_WORDS = 50000
EMBEDDING_DIM = 300
test_num_full = 3004
L2 = 0.004


def load_full_data():
    train_data = pd.read_excel(url_full_train_data, 'Sheet1', encoding='utf-8')
    train_len = len(train_data)
    dic = {'love': 0, 'fear': 1, 'comedy': 2}

    labels = train_data.polarity.apply(lambda x: dic[x])
    print("labels")
    print(labels)

    val_data = train_data.sample(frac=0.17, random_state=200)
    train_len = train_len - len(val_data)
    train_data = train_data.drop(val_data.index)
    texts = train_data.text
    print("Len train_data:")
    print(len(train_data))

    tokenizer = Tokenizer(num_words=NUM_WORDS, filters='!"#$%&()*+,-./:;<=>?@[\\]^_`{|}~\t\n\'', lower=True)
    tokenizer.fit_on_texts(texts)
    print("tokenizer Text:")
    print(texts)
    sequences_train = tokenizer.texts_to_sequences(texts)
    sequences_valid = tokenizer.texts_to_sequences(val_data.text)
    word_index = tokenizer.word_index
    print('Found %s unique tokens.' % len(word_index))

    X_train = pad_sequences(sequences_train, maxlen=max_length, padding=pad)
    X_val = pad_sequences(sequences_valid, maxlen=X_train.shape[1], padding=pad)
    y_train = to_categorical(np.asarray(labels[train_data.index]))
    y_val = to_categorical(np.asarray(labels[val_data.index]))

    word_vectors = KeyedVectors.load(url_word2vec_full, mmap='r')
    # word_vectors = KeyedVectors.load_word2vec_format(url_word2vec_full)

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

    vocabulary_size = min(len(word_index) + 1, NUM_WORDS)

    X_test = X_train[train_len - test_num_full:]
    y_test = y_train[train_len - test_num_full:]
    X_train = X_train[0: train_len - test_num_full]
    y_train = y_train[0: train_len - test_num_full]

    return X_train, y_train, X_test, y_test, X_val, y_val, vocabulary_size, embedding_layer


def cnn_lstm_model():
    X_train, y_train, X_test, y_test, X_val, y_val, vocabulary_size, embedding_layer = load_full_data()
    print("y_test")
    print(y_test)
    model = Sequential()
    # model.add(Embedding(vocabulary_size, 100, input_length=50, weights=[embedding_matrix], trainable=False))
    model.add(embedding_layer)
    model.add(Conv1D(32, kernel_size=3, padding='same', activation='relu', kernel_regularizer=regularizers.l2(L2)))
    model.add(MaxPooling1D(pool_size=3))
    model.add(Dropout(0.2))
    model.add(Conv1D(64, kernel_size=3, padding='same', activation='relu', kernel_regularizer=regularizers.l2(L2)))
    model.add(MaxPooling1D(pool_size=3))
    model.add(Dropout(0.3))
    model.add(Conv1D(128, kernel_size=3, padding='same', activation='relu', kernel_regularizer=regularizers.l2(L2)))
    model.add(MaxPooling1D(pool_size=3))
    model.add(Dropout(0.4))
    model.add(Conv1D(256, kernel_size=4, padding='same', activation='relu', kernel_regularizer=regularizers.l2(L2)))
    model.add(MaxPooling1D(pool_size=3))
    model.add(Dropout(0.3))
    model.add(Conv1D(298, kernel_size=5, padding='same', activation='sigmoid', kernel_regularizer=regularizers.l2(L2)))
    model.add(MaxPooling1D(pool_size=3))
    model.add(Dropout(0.4))
    model.add(LSTM(300))
    model.add(Dropout(0.35))
    model.add(Dense(128, activation='relu'))
    model.add(Dropout(0.4))
    model.add(Dense(3, activation='sigmoid'))

    model.compile(loss='mse', optimizer='adam', metrics=['accuracy'])

    checkpoint_filepath = 'E:\\pythonProject\\CNN\\CNN_LSTM_raw_aspect-{epoch:03d}-{val_loss:.4f}-{val_acc:.4f}.h5'
    model_checkpoint_callback = ModelCheckpoint(
        filepath=checkpoint_filepath,
        save_weights_only=True,
        monitor='val_acc',
        mode='max',
        save_best_only=True)

    model.fit(X_train, y_train, batch_size=batch_size, epochs=epoch,
              validation_data=(X_test, y_test),
              callbacks=[model_checkpoint_callback])


# cnn_lstm_model()
# we're still going to use a Tokenizer here, but we don't need to fit it
tokenizer = Tokenizer(num_words=50000)
# for human-friendly printing
# labels = ['positive', 'neutral', 'negative']
labels = ['love', 'fear', 'comedy']
# read in our saved dictionary

with open('E:\\pythonProject\\CNN\\word2vec\\vocab.json') as f:
    data = json.load(f)
dictionary = tokenizer_from_json(data)

# this utility makes sure that all the words in your input
# are registered in the dictionary
# before trying to turn them into a matrix.
def convert_text_to_index_array(text):
    words = kpt.text_to_word_sequence(text,filters='!"#$%&()*+,-./:;<=>?@[\\]^`{|}~\t\n\'')
    wordIndices = []
    for word in words:
        if word in dictionary.word_docs:
            wordIndices.append(dictionary.word_docs[word])
        else:
            print("'%s' not in training corpus; ignoring." %(word))
    return wordIndices

# read in your saved model structure
# json_file = open('model.json', 'r')
json_file = open('E:\\pythonProject\\CNN\\CNN_doc_raw_train_2c_relu.json', 'r')
loaded_model_json = json_file.read()
json_file.close()
# and create a model from that
model = model_from_json(loaded_model_json)
model.load_weights('E:\\pythonProject\\CNN\\model\\CNN_doc_raw_train_2c-016-0.1623-0.8770.h5')

# okay here's the interactive part
sentence = []
while True:
    evalSentence = input()
    if evalSentence:
        evalSentence = evalSentence.lower()
    else:
        break
    testArr = convert_text_to_index_array(evalSentence)

    # print(testArr)
    sentence.append(testArr)
    sentence = pad_sequences(sentence, maxlen=300, padding='post')
    pred = model.predict(sentence)
    print("%s sentiment; %f%% confidence" % (labels[np.argmax(pred)], pred[0][np.argmax(pred)] * 100))
    del evalSentence
    sentence = []
