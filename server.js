const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const errorCallback = console.error.bind(console);

app.use(express.static('client/build'));

// event search
//const FEBL_ACCESS_TOKEN = "815582698621963|M98FZpl1cTvP0STpQUvGpFbH2AQ";
const EventSearch = require("facebook-events-by-location-core");
const es = new EventSearch();

app.get("/api/", (req, res) => {
  console.log(req.query.lat);
  console.log(req.query.lng); 
  es.search({
    "lat": req.query.lat, //42.9634
    "lng": req.query.lng, //-85.6681
    "sort": "time",
    "accessToken": "815582698621963|M98FZpl1cTvP0STpQUvGpFbH2AQ"
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
