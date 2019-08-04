const request = require('request');
const url = (location) => 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + location + '.json?access_token=pk.eyJ1Ijoic3Rpb25lcSIsImEiOiJjanl3MzY5b3owdDllM2NwcnZmeGxvbHFiIn0.fqfwQR0wZoy7MgBYEzqaeQ';
exports.getLocation = (location, cb) => {
    request.get({url: url(location), json: true}, (err, response) => {
        if (err) {
            cb('Cannot connect to ' + url);
        } else if (!response.body.features.length) {
            cb('Cannot find given location');
        } else {
            const features = response.body.features[0];
            cb(null, {lat: features.center[0], lng: features.center[1], location: features.place_name});
        }
    })
};