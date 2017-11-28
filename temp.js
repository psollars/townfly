const express = require('express');
const app = express();
const NodeGeocoder = require('node-geocoder');
const bodyParser = require('body-parser');
const errorCallback = console.error.bind(console);

// We totally copied this from the 'Net.

var locationOptions = {
  provider: 'google',
 
  // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: 'AIzaSyB-P7bqRn9jc4fhgVP4d2aDZloE8GZUvmw', // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};
 
var geocoder = NodeGeocoder(locationOptions);
 
// Or using Promise
geocoder.geocode('Grand Rapids, MI')
  .then(function(res) {
    console.log(res[0]);
  })
  .catch(function(err) {
    console.log(err);
  });

// End stolen code