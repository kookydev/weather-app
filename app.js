const request = require("request");
let currentGeoData = [];
var url =
  "https://api.darksky.net/forecast/d6871c5f31d11d2054bf536537c5896c/37.8267,-122.4233?units=si";

const geoCode = (address, callback) => {
  const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?uk&access_token=pk.eyJ1Ijoia29va3lkZXYiLCJhIjoiY2p0N2Rmcjg0MG9paTQ5bXduOHhoYTc2biJ9.Rkyk5fTmr4UjTDYvIBOfrg`;
  request(
    {
      url: geocodeUrl,
      json: true
    },
    (error, response) => {
      if (error) {
        callback("Oops, unable to get data from mapbox...", undefined);
      } else if (response.body.features[0].geometry.coordinates.length == 0) {
        callback("Error: location does not exist", undefined);
      } else {
        const data = response.body;
        currentGeoData = [
          data.features[0].geometry.coordinates,
          data.features[0].place_name
        ];
        callback(undefined, currentGeoData);
      }
    }
  );
};

const weather = (input, callback) => {
  var url = `https://api.darksky.net/forecast/d6871c5f31d11d2054bf536537c5896c/${
    input[0][1]
  },${input[0][0]}?units=si`;
  request(
    {
      url: url,
      json: true
    },
    (error, response) => {
      if (error) {
        callback("Oops, unable to get data from darksky...", undefined);
      } else {
        const data = response.body;
        callback(undefined, data);
      }
    }
  );
};
geoCode("chester", (error, data) => {
  if (error) {
    console.log("Error:", error);
  } else {
    weather(data, (error, data) => {
      if (error) {
        console.log("Error: doggies", error);
      } else {
        console.log(
          `The weather in ${currentGeoData[1]} is ${data.currently.summary}`
        );
      }
    });
  }
});

// setTimeout(
//   weather(currentGeoData, (error, data) => {
//     if (error) {
//       console.log("Error:", error);
//     } else {}
//   }),
//   5000
// );
