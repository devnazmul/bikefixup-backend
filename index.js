// All PACKAGES =========================================================
const express = require('express');
const cors = require("cors");
const colog = require('colog');
const routes = require('./routes');
const connection = require('./db');

require('dotenv').config()


const app = express()


// MIDDLEWARE ===========================================================
app.use(cors());
app.use(express.json());



// TEST ROUTE ===========================================================
app.get('/', (req, res) => {
    res.send('Server Is Running...')
})





// ROUTES ================================================================
// DASHBOARD 
app.use('/api/v1/auth', routes?.Auth);
app.use('/api/v1/dashboard/user', routes?.User);
app.use('/api/v1/dashboard/brand', routes?.Brand);
app.use('/api/v1/dashboard/state', routes?.State);
app.use('/api/v1/dashboard/city', routes?.City);

app.use('/api/v1/contact-mail', routes?.Nodemailer);





























// ERROR HANDELER MIDDLEWARE ===========================================
const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err)
    }
    res.status(500).send({
        error: true,
        data: [],
        message: err,
    })
}
app.use(errorHandler);

// CONNECTION SECTION ==================================================== 
const PORT = process.env.PORT || 8080;

// DATABASE CONNECTION ===================================================
connection.connect((err)=>{
    if (err) throw err;
    colog.info('=======================================================')
    colog.info(`✅ Database is connected!`);
    colog.info('=======================================================')
})


// START SERVER  ==========================================================
app.listen(PORT, () => {
    colog.info('=======================================================')
    colog.info(`🚀 Server is running on http://localhost:${PORT}`);
    colog.info('=======================================================')
})