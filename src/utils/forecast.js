const request = require('request');

const url = (lat, lng) => `https://api.darksky.net/forecast/b4cad60a5395315169291804eba38028/${lat},${lng}`;
exports.getForecast = (lat, lng, cb) => request.get({url: url(lat, lng), json: true}, (err, response) => {
    if (err) {
        return cb(err);
    }
    if(response.body.error){
        return cb('Unable to find location');
    }
    const {currently: {precipProbability, temperature} = {}} = response.body;
    cb(null, `${response.body.daily.data[0].summary} It is currently ${temperature} degrees out. There is a ${precipProbability}% chance of rain`);


});
