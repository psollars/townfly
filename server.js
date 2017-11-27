const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const errorCallback = console.error.bind(console);
const NodeGeocoder = require('node-geocoder');

app.use(express.static('client/build'));

// geocoder
const locationOptions = {
  provider: 'google',
  httpAdapter: 'https', // Default
  apiKey: 'AIzaSyDMk2B-pWRaC779c39kcEX6lgQ11AZp6mY', // for Mapquest, OpenCage, Google Premier
  formatter: null
};
const geocoder = NodeGeocoder(locationOptions);

// event search
//const FEBL_ACCESS_TOKEN = "815582698621963|M98FZpl1cTvP0STpQUvGpFbH2AQ";
//node dotenv
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
      "accessToken": "815582698621963|M98FZpl1cTvP0STpQUvGpFbH2AQ" //process.env....
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
