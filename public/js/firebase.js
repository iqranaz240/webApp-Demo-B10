// firebaseFunctions.js

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAyEBLfZaQfqr6r8jd9LShmWXOOb0K6Q4",
  authDomain: "webapp-b10.firebaseapp.com",
  projectId: "webapp-b10",
  storageBucket: "webapp-b10.appspot.com",
  messagingSenderId: "64843690643",
  appId: "1:64843690643:web:e9768ba6e930b18c8e9366"
};

// Initialize Firebase
var app = firebase.initializeApp(firebaseConfig);

var auth = firebase.auth();

function signup() {
  var email = document.getElementById('inputEmail').value;
  var password = document.getElementById('inputPassword').value;
  var name = document.getElementById('inputName').value;
  var address = document.getElementById('inputAddress').value;
  var zip = document.getElementById('inputZip').value;

  auth.createUserWithEmailAndPassword(email, password)
    .then(function (userCredential) {
      // Signed up 
      var user = userCredential.user;
      // ...
      writeUserData(user.uid, name, email, address, zip)
      console.log(user);
      sessionStorage.setItem('email', user.email);
      // window.location.href = '../index.html'
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      console.log(error);
    });
}

function signIn() {
  var email = document.getElementById('inputEmail').value;
  var password = document.getElementById('inputPassword').value;

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      readUserData(user.uid);
      console.log("Signed in user: ", user)
      sessionStorage.setItem('email', user.email);
      // window.location.href = '../index.html';
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Error: ", errorMessage)
    });
}

function signInWithGoogle() {
  var provider = new firebase.auth.GoogleAuthProvider();
  console.log(provider)
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;
      console.log(credential);
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      console.log(user)
      sessionStorage.setItem('email', user.email);
      window.location.href = '../index.html'
      // IdP data available in result.additionalUserInfo.profile.
      // ...
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      console.log(error)
      // ...
    });
}

function signOut() {
  firebase.auth().signOut()
    .then(() => {
      sessionStorage.removeItem('email');
      console.log("User logout successfully")
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
      console.log(error);
    });
}

const database = firebase.database();

function writeUserData(userId, name, email, address, zip) {
  firebase.database().ref('users/' + userId).set({
    name: name,
    email: email,
    address: address,
    zip: zip
  });
  console.log('user created successfully.')
}

const dbRef = firebase.database().ref();

function readUserData(userId) {
  dbRef.child("users").child(userId).get().then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
}