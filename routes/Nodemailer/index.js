const router = require("express").Router();
const Nodemailer = require('../../controllers').Nodemailer;

router.post("/send", Nodemailer.send);

module.exports = router;