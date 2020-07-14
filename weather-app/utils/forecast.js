const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    weatherAccessKey = 'a3d06124d041e00ccf8b416590c85fc9';
    weatherQuery = latitude + ',' + longitude;
    weatherUnits = 'm';

    const weatherUrl = 'http://api.weatherstack.com/current?access_key=' + weatherAccessKey + '&query=' + weatherQuery + '&units=' + weatherUnits;

    request({ url: weatherUrl, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Error: ' + body.error.info, undefined);
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees celcius. It feels like ' + body.current.feelslike + ' degree celcius. There is a ' + body.current.humidity + ' percentage of rain.');
        }
    });
}

module.exports = forecast;