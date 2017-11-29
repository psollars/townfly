const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const errorCallback = console.error.bind(console);
require('dotenv').config();

app.use(express.static('client/build'));

const moment = require('moment');
  let nowUnix = moment().unix();
  let endOfTodayUnix = moment().endOf("day").unix();
  let endOfTomorrowUnix = moment().endOf("day").add(1, 'days').unix();
  let oneWeekFromNowUnix = moment().add(7, 'days').unix();
  console.log(nowUnix);
  console.log(endOfTodayUnix);
  console.log(endOfTomorrowUnix);
  console.log(oneWeekFromNowUnix);

// geocoder
const NodeGeocoder = require('node-geocoder');
const locationOptions = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.GOOGLE_API_KEY,
  formatter: null
};
const geocoder = NodeGeocoder(locationOptions);

// event search
const EventSearch = require("facebook-events-by-location-core");
const es = new EventSearch();

app.get("/api/", (req, res) => {
  geocoder.geocode(req.query.location).then(function(geoResponse) {
    es.search({
      "lat": geoResponse[0].latitude,
      "lng": geoResponse[0].longitude,
      "sort": "time",
      "categories": req.query.categories,
      "distance": 1609, // one mile in meters
      "since": nowUnix,
      "until": oneWeekFromNowUnix,
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
