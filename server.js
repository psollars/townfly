const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const errorCallback = console.error.bind(console);
require('dotenv').config();

app.use(express.static('client/build'));

// geocoder configuration settings
const NodeGeocoder = require('node-geocoder');
const locationOptions = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.GOOGLE_API_KEY,
  formatter: null
};

const geocoder = NodeGeocoder(locationOptions);

app.get("/api/geolocate/", (req, res) => {
  if (req.query.lat && req.query.lon) {
    geocoder.reverse({ // Reverse brings back the lat & lon
      lat:req.query.lat,
      lon:req.query.lon
    }).then(function(geoResponse) {
      res.send(geoResponse[0]);
    }).catch(function(error) {
      console.log(errorCallback);
    });
  } else {
    geocoder.geocode(
      req.query.text
      // using Promise
    ).then(function(geoResponse) {
      res.send(geoResponse[0]);
    }).catch(function (error) {
      console.log(errorCallback);
    });
  }
});

// event search
const EventSearch = require("facebook-events-by-location-core");
const es = new EventSearch();

app.get("/api/events/", (req, res) => {
    es.search({
      "lat": req.query.location.latitude,
      "lng": req.query.location.longitude,
      "sort": "time",
      "since": req.query.date[0],
      "until": req.query.date[1],
      "distance": req.query.distance, // in meters
      "categories": req.query.categories,
      "accessToken": process.env.FEBL_ACCESS_TOKEN
    }).then(function (events) {
      res.send(events.events);
    }).catch(function (error) {
      console.log(errorCallback);
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`JSON Server is running on ${PORT}`);
});
