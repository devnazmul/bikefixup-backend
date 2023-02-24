
const Nodemailer = require('./Nodemailer');
const Auth = require('./Auth/AuthRoutes');
const User = require('./Dashboard/User/UserRoutes');
const State = require('./Dashboard/State/StateRoutes');
const City = require('./Dashboard/City/CityRoutes');




module.exports = {
    Nodemailer,
    User,
    Auth,
    State,
    City
}