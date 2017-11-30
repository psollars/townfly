const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const errorCallback = console.error.bind(console);
require('dotenv').config();
//const moment = require('moment');

app.use(express.static('client/build'));

// geocoder
const NodeGeocoder = require('node-geocoder');
const locationOptions = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.GOOGLE_API_KEY,
  formatter: null
};
const geocoder = NodeGeocoder(locationOptions);

app.get("/api/geolocate/", (req, res) => {

  geocoder.reverse({lat:42.9661778, lon:-85.6695778})
  .then(function(res) {
    console.log(res);
  })
  .catch(function(error) {
    console.log(errorCallback);
  });

});

// event search
const EventSearch = require("facebook-events-by-location-core");
const es = new EventSearch();

app.get("/api/", (req, res) => {
  geocoder.geocode(req.query.location).then(function(geoResponse) {
    es.search({
      "lat": geoResponse[0].latitude,
      "lng": geoResponse[0].longitude,
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
  }).catch(function (error) {
    console.log(errorCallback);
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`JSON Server is running on ${PORT}`);
});
