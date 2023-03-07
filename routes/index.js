
const Nodemailer = require('./Nodemailer');

const State = require('./Dashboard/State/StateRoutes');

const City = require('./Dashboard/City/CityRoutes');

const Auth = require('./Auth/AuthRoutes');

const User = require('./Dashboard/User/UserRoutes');

const Brand = require('./Dashboard/Brand/BrandRoutes');

const Model = require('./Dashboard/Model/ModelRoutes');





module.exports = {
    Nodemailer,
    User,
    Auth,
    State,
    City,
    Brand,
    Model,
}