$(document.body).on("click", function() {
   var userName = $("#userEmail").val().trim();
   var password = $("#userPassword").val().trim();
    console.log(userName);
    console.log(password);
});

// Firebase Database
//! ScriptKitty'd from activity 07-firebase\01-Activities\16-codersbay-viewtracker\Solved\logic.js
var config = {
    apiKey: "AIzaSyB4Ooeb3AO3GUZ0PlheNtyy2jhedAaIuIQ",
    authDomain: "firstproject-vqv.firebaseapp.com",
    databaseURL: "https://firstproject-vqv.firebaseio.com",
    projectId: "firstproject-vqv",
    storageBucket: "firstproject-vqv.appspot.com",
    messagingSenderId: "578400054546"
  };
  firebase.initializeApp(config);
  var database = firebase.database();
  var connectionsRef = database.ref("/connections");
  var connectedRef = database.ref(".info/connected");
  connectedRef.on("value", function(snap) {
    if (snap.val()) {
      var con = connectionsRef.push(true);
      con.onDisconnect().remove();
    }
  });

  connectionsRef.on("value", function(snap) {
    $("#connected-viewers").text(snap.numChildren());
  });

  