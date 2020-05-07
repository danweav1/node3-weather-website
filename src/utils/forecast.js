const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
  const url =
    'http://api.weatherstack.com/current?access_key=7bcec1cee855407f37bb4c0b3989a696&query=' +
    encodeURIComponent(latitude) +
    ',' +
    encodeURIComponent(longitude) +
    '&units=f';

  // old non shorthand way
  //   request({ url: url, json: true }, (error, response) => {
  //     if (error) {
  //       callback('Unable to connect to weather service.');
  //     } else if (response.body.error) {
  //       // if response.body.error property exists, something has gone wrong
  //       callback('Unable to find location');
  //     } else {
  //       callback(
  //         undefined,
  //         response.body.current.weather_descriptions[0] +
  //           '. It is currently ' +
  //           response.body.current.temperature +
  //           ' degrees out. It feels like ' +
  //           response.body.current.feelslike +
  //           ' degrees out.'
  //       );
  //     }
  //   });
  // };

  request({ url, json: true }, (error, { body }) => {
    // we only use the body property of response
    if (error) {
      callback('Unable to connect to weather service.');
    } else if (body.error) {
      // if response.body.error property exists, something has gone wrong
      callback('Unable to find location');
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          '. It is currently ' +
          body.current.temperature +
          ' degrees out. It feels like ' +
          body.current.feelslike +
          ' degrees out.'
      );
    }
  });
};

module.exports = forecast;
