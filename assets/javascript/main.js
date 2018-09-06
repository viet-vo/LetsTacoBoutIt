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
$("#checkEmailPass").on("click", function (event) {
  event.preventDefault();
  var userEmail = $("#userEmail").val().trim();
  var passwords = $("#userPassword").val().trim();

  // used the push method instead of set to store information on firebase
  database.ref().push({
    userEmail: userEmail,
    passwords: passwords
  });
});


$("#newEmailPassLoca").on("click", function (event) {
  event.preventDefault();
  var userEmail = $("#newUserEmail").val().trim();
  var passwords = $("#newUserPassword").val().trim();
  var location = $("#newUserLoca").val().trim();



  var geoCodeURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + location + "&key=" + googleGeoCodeKey;

  var newEntry = {
    userEmail: userEmail,
    passwords: passwords,
    location: location
  };

  database.ref().push(newEntry)

  console.log(newEntry.userEmail);
  console.log(newEntry.passwords);
  console.log(newEntry.location);

  $("#newUserEmail").val("");
  $("#newUserPassword").val("");
  $("#newUserLoca").val("");
});


var googleMapKey = "AIzaSyDdm7-qIzpaPhrsOXVe3YLVnQzvT-hpUGI";
var googleGeoCodeKey = "AIzaSyBR8TnfvXloNv8HCiWjrKG6uzIuI9d_z1c";
var exampleAddress = "18090 Culver Dr, Irvine, CA 92612";

var arr1 = [];
var arr2 = [];
var arr3 = [];
var string1 = "";
var string1 = "";
var string3 = "";


geocode();



function geocode() {
  database.ref().on("child_added", function (childSnapshot) {

    var userEmail1 = childSnapshot.val().userEmail;
    var location1 = childSnapshot.val().location;


    var place = location1;
    axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: place,
          key: 'AIzaSyBR8TnfvXloNv8HCiWjrKG6uzIuI9d_z1c'
        }
      })
      .then(function (response) {
        console.log(response.data.results[0].formatted_address);
        console.log(response.data.results[0].geometry.location.lat);
        console.log(response.data.results[0].geometry.location.lng);
        console.log(userEmail1);
        var newRow = $("<tr>").append(
          $("<td>").text(userEmail1)
        );
        $("#chatArea").append(newRow);
        var newRow = $("<tr>").append(
          $("<td>").text(location1)
        );
        $("#feedArea").append(newRow);
        console.log("added");
      })
      .catch(function (error) {
        console.log(error)
      })
  });
}

var locations = [
  ['Trilogy', 33.645139, -117.834831, 4],
  ['Middle-Earth', 33.644826, -117.837073, 5],
  ['Aldrich Park', 33.646011, -117.842742, 3],
  ['Chick Fil-A', 33.649739, -117.839629, 2],
  ['Albertsons', 33.650281, -117.831361, 1],
  ['Taco User1', 33.672138, -117.827172, 6],
  ['Taco User2', 33.672593, -117.823975, 7],
  ['Taco User3', 33.673209, -117.820091, 8]
];


var map, infoWindow, marker;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 33.6449531,
      lng: -117.8369658
    },
    zoom: 14
  });
  infoWindow = new google.maps.InfoWindow;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent("Find people to Taco 'Bout it around you.");
      infoWindow.open(map);
      map.setCenter(pos);
    }, function () {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

  var marker, i;

  for (i = 0; i < locations.length; i++) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i][1], locations[i][2]),
      map: map
    });

    google.maps.event.addListener(marker, 'click', (function (marker, i) {
      return function () {
        infowindow.setContent(locations[i][0]);
        infowindow.open(map, marker);
      }
    })(marker, i));
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
};

// 
initMap();
handleLocationError();
getKeys();
console.log(database);