const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const address = process.argv[2];

if (!address) {
    console.log('Please provide an address');
    return;
}

// destructure "data" into its three components... 
// in case of errors we need to give a default value (like const sayHello(name = 'Hodor') ..)
geocode(address, (error, {latitude, longitude, location} = {}) => {
    if (error) {
        console.log(error);
        return;
    }
    forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
            console.log(error);
            return;
        } 
        console.log(location);
        console.log(forecastData);
    });
});