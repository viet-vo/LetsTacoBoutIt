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
var queryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=delis&location=boston";
$.ajax({
url: queryURL,
headers: {
  'Authorization':'Bearer GyfJWsQft0GaFw1cD1iTZYZYSt_-CKPwuChKa5PNlyG5GaTcrq1t6PIhl5pxTr-b4Ic8mg3grBq97lC6LIv9M8j3BtFF-zkRWdB7M9DlF_sxQ_dXu3q0bAKULimIW3Yx',
},
method: 'GET',
success: function(response){
  // Grab the results from the API JSON return
  var totalresults = response.total;

  if (totalresults > 0){
      
      // Itirate through the JSON array of 'businesses' which was returned by the API
      $.each(response.businesses, function(i, item) {
          // Store each business's object in a variable
          var id = item.id;
          var phone = item.display_phone;
          var image = item.image_url;
          var name = item.name;
          var rating = item.rating;
          var reviewcount = item.review_count;
          var address = item.location.address1;
          var city = item.location.city;
          var state = item.location.state;
          var zipcode = item.location.zip_code;
          var coordinate1 = item.coordinates.latitude;
          var coordinate2 = item.coordinates.longitude;
          // Append our result into our page
          $('#results').append('<div id="' + id + '" style="margin-top:50px;margin-bottom:50px;"><img src="' + image + '" style="width:200px;height:150px;"><br>We found <b>' + name + '</b><br>Business ID: ' + id 
          + '<br> Address: ' + address + ' ' + city + ', ' + state + ' ' + zipcode 
          + '<br> Coordinates: ' + coordinate1 + ', ' + coordinate2
          + '<br> Phone Number: ' + phone 
          + '<br> Rating: ' + rating + ' with ' + reviewcount + ' reviews</div>');
      });
  } else {
      // If our results are 0; no businesses were returned by the JSON therefore we display on the page no results were found
      $('#results').append('<h5>We discovered no results!</h5>');
  }
  console.log(response);
  database.ref().push({
      coordinate1: coordinate1,
      coordinate2: coordinate2
      
  });
}
}); 