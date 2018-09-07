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

  $(".waves-effect").on("click", function (event) {
    event.preventDefault();
    var newUserEmail = $("#newUserEmail").val().trim();
    var newPasswords = $("#newUserPassword").val().trim();
    var newLocation = $("#newUserLoca").val().trim();
    window.location.replace("index.html");
  
  // used the push method instead of set to store information on firebase
    database.ref().push({
      newUserEmail: newUserEmail,
      newPasswords: newPasswords,
      newLocation: newLocation
    });
  });
 