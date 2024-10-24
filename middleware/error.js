const winston = require('winston');

module.exports = (err, req, res, next) => {
    winston.error('error', err.message);
    console.log(err);
    res.status(500).send('Something failed.');
}