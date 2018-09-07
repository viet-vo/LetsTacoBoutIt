// Firebase Database
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
var map, infoWindow, marker;

// Shows Online Users
connectedRef.on("value", function (snap) {
  if (snap.val()) {
    var con = connectionsRef.push(true);
    con.onDisconnect().remove();
  }
});
connectionsRef.on("value", function (snap) {
  $("#connected-viewers").text(snap.numChildren());
  $("#connections").text("Jalape\u00f1o Bizness: " + snap.numChildren() + " people ready to taco 'bout it!");
});

// Enter inputs into Firebase
$("#newEmailPassLoca").on("click", function (event) {
  event.preventDefault();
  var userEmail = $("#newUserEmail").val().trim();
  var passwords = $("#newUserPassword").val().trim();
  var location = $("#newUserLoca").val().trim();

  var newEntry = {
    userEmail: userEmail,
    passwords: passwords,
    location: location
  };

  // Adds the New Set of Inputs Into Firebase
  database.ref().push(newEntry)

  // Takes you to Maps Page after you click on submit button
  window.location.replace("index.html");

});
// Google Geocode API that Translates Rough Addresses into Well-Formatted Addresses
// and Latitude and Longitude to use with Google Maps
function geocode() {
  database.ref().on("child_added", function (childSnapshot) {

    var userEmail1 = childSnapshot.val().userEmail;
    var location1 = childSnapshot.val().location;

    // Similar to Ajax, Axios Retrieves data from an API
    // I Chose to Use Axios Instead because Ajax was not working for me
    axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: location1,
          key: 'AIzaSyBR8TnfvXloNv8HCiWjrKG6uzIuI9d_z1c'
        }
      })
      .then(function (response) {
        console.log(response);
        var formAddress = response.data.results[0].formatted_address;
        var formLat = response.data.results[0].geometry.location.lat;
        var formLng = response.data.results[0].geometry.location.lng;

        // Create New Markers for Each Child_added and Changed Marker Icon
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(formLat, formLng),
          map: map,
          title: userEmail1,
          icon: 'assets/images/tacoCouple4.png'
        });

        // Sets Marker on the Map
        google.maps.event.addListener(marker, 'click', (function (marker) {
          infowindow.setContent(formAddress);
          infowindow.open(map, marker);
        })(marker));

      })
      .catch(function (error) {
        console.log(error)
      })
  });
}

// Initializing the Map
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    
    // Starting Position for Google Maps
    center: {
      lat: 33.6449531,
      lng: -117.8369658
    },

    // Starting Zoom for Google Maps Window
    zoom: 14
  });
  infoWindow = new google.maps.InfoWindow;

  // Will be prompted to ask for user's location
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
}

// Error Handler
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
};

// Main Execution
geocode();
initMap();
<<<<<<< HEAD
handleLocationError();
getKeys();
console.log(database);

//------------------------------


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
=======
handleLocationError();
>>>>>>> viet-vo
