const request = require('postman-request');

const geocode = (address, callback) => {
  const url =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    encodeURIComponent(address) +
    '.json?access_token=pk.eyJ1IjoicGZpbmZlcm5vIiwiYSI6ImNrOXY5MWxkMzA5NXozcm53bTJvajkxdG0ifQ.J-ViVjUPm1-Bw76zcr1v_A&limit=1';

  //old way before shorthand
  //   request({ url: url, json: true }, (error, response) => {
  //     if (error) {
  //       callback('Unable to connect to maxbox service.');
  //     } else if (response.body.features.length === 0) {
  //       callback('No matching results');
  //     } else {
  //       const latitude = response.body.features[0].center[1];
  //       const longitude = response.body.features[0].center[0];
  //       callback(undefined, {
  //         latitude,
  //         longitude,
  //         location: response.body.features[0].place_name,
  //       });
  //     }
  //   });
  // };

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to maxbox service.');
    } else if (body.features.length === 0) {
      callback('No matching results');
    } else {
      const latitude = body.features[0].center[1];
      const longitude = body.features[0].center[0];
      callback(undefined, {
        latitude,
        longitude,
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
