import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

var config = {
    apiKey: "AIzaSyACQiw8QioBXecxs0QP__A3WeonNRwvx58",
    authDomain: "campusrecuirtment.firebaseapp.com",
    databaseURL: "https://campusrecuirtment.firebaseio.com",
    projectId: "campusrecuirtment",
    storageBucket: "campusrecuirtment.appspot.com",
    messagingSenderId: "874600307382"
  };
  firebase.initializeApp(config);

ReactDOM.render(<MuiThemeProvider><App /></MuiThemeProvider>, document.getElementById('root'));
registerServiceWorker();
