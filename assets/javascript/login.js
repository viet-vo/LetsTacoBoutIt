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
    var userEmail = $("#email").val().trim();
    var passwords = $("#password").val().trim();
    var location = $("#location").val().trim();
    window.location.replace("index.html");
  
  // used the push method instead of set to store information on firebase
    database.ref().push({
      userEmail: userEmail,
      passwords: passwords,
      location: location
    });
  });
 