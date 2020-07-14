const request = require('postman-request');

const geocode = (address, callback) => {

    const geoAccessKey = 'pk.eyJ1Ijoic2h1ZmZsZWJ5dGUiLCJhIjoiY2tjM2N0cWcwMWU3YjJ2bXI5ZzFkbWRkeCJ9.pYCKSPfJarCXYMFnF72xAw';
    const geoUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=' + geoAccessKey + '&limit=1';

    request({url: geoUrl, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to localtion services!', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search', undefined);
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }

    })
};

module.exports = geocode;