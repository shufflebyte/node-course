const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// server starten
const app = express();

// console.log(__dirname);
// console.log(__filename);
// console.log(path.join(__dirname, '../public'));


// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// use a view engine for be able to serve static stuff to all pages and to interprete variables.. blabalbala
// hbs uses handlebars package in the background

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// statische elemente verlinken
// Setup static directory to serve
app.use(express.static(publicDirectoryPath));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Hugo Horst Detlef'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About App',
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help App',
        message: 'Some help message'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.send({
            error: 'You must provide an address'
        });
        return;
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error});
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({error});
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        res.send({
            error: 'You must provide a search term'
        });
        return;
    }

    console.log(req.query);
    //res.query
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help article not found',
        name: 'Hugo Horst',
        errorMessage: 'Help article not found.'
        //searchTerm: req.body
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page not found',
        name: 'Hugo Horst',
        errorMessage: 'Page not found'
        //searchTerm: req.body
    });
});

app.listen(3000, () => {
    console.log('Server started.');
});