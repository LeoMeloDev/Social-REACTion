import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyBlreHide0A2O4EFRo-Gt5xZGOE3i2Sme0",
    authDomain: "social-reaction-ae27c.firebaseapp.com",
    databaseURL: "https://social-reaction-ae27c.firebaseio.com",
    projectId: "social-reaction-ae27c",
    storageBucket: "social-reaction-ae27c.appspot.com",
    messagingSenderId: "529505332404",
    appId: "1:529505332404:web:8ac35e8ee0ef63c15f7be1",
    measurementId: "G-TV37X6PNTG"
  };

firebase.initializeApp(firebaseConfig)

export default firebase;