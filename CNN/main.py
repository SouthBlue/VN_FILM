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

from flask import Flask, request, jsonify, make_response

# cnn_lstm_model()
# we're still going to use a Tokenizer here, but we don't need to fit it
tokenizer = Tokenizer(num_words=50000)
# for human-friendly printing
labels = ['love', 'fear', 'comedy']
# read in our saved dictionary

with open('E:\\pythonProject\\CNN\\word2vec\\vocab.json') as f:
    data = json.load(f)
dictionary = tokenizer_from_json(data)


# this utility makes sure that all the words in your input
# are registered in the dictionary
# before trying to turn them into a matrix.
def convert_text_to_index_array(text):
    words = kpt.text_to_word_sequence(text, filters='!"#$%&()*+,-./:;<=>?@[\\]^`{|}~\t\n\'')
    wordIndices = []
    for word in words:
        if word in dictionary.word_docs:
            wordIndices.append(dictionary.word_docs[word])
        else:
            print("'%s' not in training corpus; ignoring." % (word))
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

app = Flask(__name__)


@app.route('/label')
def hello_world():
    sentence = []
    evalSentence = request.args.get('text')
    if evalSentence:
        evalSentence = evalSentence.lower()
    else:
        return make_response(jsonify(message = 'failed'), 500)
    testArr = convert_text_to_index_array(evalSentence)

    # print(testArr)
    sentence.append(testArr)
    sentence = pad_sequences(sentence, maxlen=300, padding='post')
    pred = model.predict(sentence)
    print("%s sentiment; %f%% confidence" % (labels[np.argmax(pred)], pred[0][np.argmax(pred)] * 100))
    return make_response(jsonify(label = labels[np.argmax(pred)]), 200)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
