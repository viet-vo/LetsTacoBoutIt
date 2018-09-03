$("#checkEmailPass").on("click", function () {
  var userEmail = $("#userEmail").val().trim();
  var passwords = $("#userPassword").val().trim();
  console.log(userEmail);
  console.log(passwords);
});
// updated variables and values to match ids in html
$("#newEmailPassLoca").on("click", function () {
  var newUserEmail = $("#newUserEmail").val().trim();
  var newPassword = $("#newUserPassword").val().trim();
  var newAddress = $("#newUserLoca").val().trim();
  console.log(newUserEmail);
  console.log(newPassword);
  console.log(newAddress);
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

connectedRef.on("value", function (snap) {
  if (snap.val()) {
    var con = connectionsRef.push(true);
    con.onDisconnect().remove();
  }
});
connectionsRef.on("value", function (snap) {
  $("#connected-viewers").text(snap.numChildren());
});

var initialBid = 0;
var initialBidder = "No one :-(";
var highPrice = initialBid;
var highBidder = initialBidder;

// Enter inputs into Firebase
//! 07-firebase\01-Activities\13-mostrecentuser\Solved\recentuser-solved.html
$("#checkEmailPass").on("click", function(event) {
  event.preventDefault();
  var userEmail = $("#userEmail").val().trim();
  var passwords = $("#userPassword").val().trim();

// used the push method instead of set to store information on firebase
  database.ref().push({
    userEmail: userEmail,
    passwords: passwords
  });
});
$("#newEmailPassLoca").on("click", function(event) {
  event.preventDefault();
  var newUserEmail = $("#newUserEmail").val().trim();
  var newPassword = $("#newUserPassword").val().trim();
  var newAddress = $("#newUserLoca").val().trim();
  database.ref().push({
    newUserEmail: newUserEmail,
    newPassword: newPassword,
    newAddress: newAddress,
  });
});