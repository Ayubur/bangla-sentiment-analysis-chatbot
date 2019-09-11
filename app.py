from flask import Flask, render_template, url_for, request,jsonify
from flask_cors import CORS
import pandas as pd 
import pickle
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.externals import joblib

from bengali_stemmer.rafikamal2014 import RafiStemmer
import string
from nltk.corpus import stopwords
from urllib.parse import urlparse


app = Flask(__name__)
CORS(app)

stemmer = RafiStemmer()
bangla_stopwords = pd.read_csv("stopwords-bn.txt",header=None)

def text_process(text):

    emoticons = [':)',':D',':(',':(',':P','O:)','3:)','o.O',';)',':O','-_-','^_^','8-)','8|','>:(',':v',':/',':3','<3','(y)','>:O',':*']
    
    mess=''
    for i in text.split():
        s, n, p, pa, q, f = urlparse(i)
        if s and n:
            pass
        elif i[:1] == '@':
            pass
        elif i[:1] == '#':
            pass
        else:
            mess = mess.strip() + ' ' + i
			
    mess= mess.strip()  
    word_list  = mess.split(" ")
    for n,word in enumerate(word_list):
         if word not in emoticons:
                word = word.translate(str.maketrans('','',string.punctuation))
                word_list[n]=word
        
    nopunc=" ".join(word_list)
    filtered_tokens= [word for word in nopunc.split(" ") if word not in bangla_stopwords]
    filtered_tokens=[token for token in filtered_tokens if token.lower() not in stopwords.words('english')]
    return [stemmer.stem_word(x) for x in filtered_tokens]


@app.route('/api/predict',methods=['POST'])
def predict():
	NB_spam_model = open('bangla_nlp_model.pkl','rb')
	pipeline = joblib.load(NB_spam_model)

	if request.method == 'POST':
		message= request.json.get('text')
		my_prediction = pipeline.predict([message])
		
	return jsonify({'prediction':my_prediction[0]})



if __name__ == '__main__':
	app.run(debug=True)