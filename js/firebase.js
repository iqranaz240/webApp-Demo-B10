// firebaseFunctions.js

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWp8g42jpHAAiYr3sbx4_HTvmAYu-Z2J8",
  authDomain: "abcd-92773.firebaseapp.com",
  projectId: "abcd-92773",
  storageBucket: "abcd-92773.appspot.com",
  messagingSenderId: "394813059340",
  appId: "1:394813059340:web:79a8aebf335cb97d225929",
  measurementId: "G-VGBMVX5NY9"
};
  
  // Initialize Firebase
  var app = firebase.initializeApp(firebaseConfig);
  
  var auth = firebase.auth();
  
  function signup() {
    var email = document.getElementById('inputEmail').value;
    var password = document.getElementById('inputPassword').value;
  
    auth.createUserWithEmailAndPassword(email, password)
      .then(function(userCredential) {
        // Signed up 
        var user = userCredential.user;
        // ...
        console.log(user);
      })
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log(error);
      });
  }

  function signIn () {
    var email = document.getElementById('inputEmail').value;
    var password = document.getElementById('inputPassword').value;

    auth.signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log("Signed in user: ", user)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("Error: ", errorMessage)
  });
  }

  function signInWithGoogle () {
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
  