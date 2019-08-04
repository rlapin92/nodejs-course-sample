const express = require('express');
const path = require('path');
const hbs = require('hbs');
const {getForecast} = require('./utils/forecast');
const {getLocation} = require('./utils/geocode');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../public')));


const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


app
    .get('', (req, res) => {
        res.render('index', {title: 'WeatherApp', name: 'Roman'});
    })
    .get('/about', (req, res) => {
        res.render('about', {title: 'About', name: 'Roman'});
    })
    .get('/help', (req, res) => {
        res.render('help', {title: 'Help', name: 'Roman'});
    })
    .get('/weather', (req, res) => {
        const {address} = req.query;
        if (!address) {
            return res.send({
                error: 'You must provide the address param'
            })
        }
        getLocation(address, (err, {lat, lng, location}) => {
            if (err) {
                return res.send({
                    error: err
                });
            }
            getForecast(lat, lng, (err, forecast) => {
                if (err) {
                    return res.send({
                        error: err
                    });
                }
                res.send({
                    forecast,
                    location,
                    address

                });
            });
        });
    })
    .get('/help/*', (req, res) => {
        res.render('404', {title: '404', name: 'Roman', error: 'Help article cannot be found'});
    })
    .get('*', (req, res) => {
        res.render('404', {title: '404', name: 'Roman', error: 'Page cannot be found'});
    })
    .listen(port, () => {
        console.log('Server is up on port '+port);
    });