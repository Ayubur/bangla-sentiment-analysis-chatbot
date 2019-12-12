Chatbot can detect sentiment from bangla text and response back with sentiment. Currently chatbot can categorize the bangla text in two types- postive, negative.

#### Technologis
* Frontend - React js
* Backend - Python Flask
* Machine Learning Classifier - Naive Bayes, Support Vector Machine(SVM)

#### Installation and Setup
* Install the packages from requirements.txt
* As current english stopwords used here, nltk english corpora need to download first.
     ```
     import nltk
     nltk.download()
     ```
     Then download english stopwords corpora.
* Run ```python app.py``` from ```root ``` directory to start the backend using terminal
* Then run ```cd client``` and ```npm start``` from ```root``` directory to start the frontend using terminal

