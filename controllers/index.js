
const Nodemailer = require('./Nodemailer');
const Auth = require('./Auth/AuthControllers')
const State = require('./Dashboard/State/StateControllers')
const City = require('./Dashboard/City/CityControllers')

module.exports = {
    Nodemailer,
    Auth,
    State,
    City,
}