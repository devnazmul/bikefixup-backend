const nodemailer = require('nodemailer');
const send = async (req, res) => {
    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASS
        }
    });

    let mailDetails = {
        to: process.env.NODEMAILER_FROM_EMAIL,
        subject: req.body.subject,
        html: req.body.html
    };
    mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
            res.status(500).send({ message: "Error Occurs" });
        } else {
            res.status(200).send({
                from: data.envelope.from,
                to: data.envelope.to[0],
                message: "Email sent successfully"
            });
        }
    });
}
const autoReplay = async (req, res) => {
    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASS
        }
    });

    let mailDetails = {
        to: req.body.from,
        subject: req.body.subject,
        html: req.body.html
    };
    mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
            res.status(500).send({ message: "Error Occurs" });
            console.log(err);
        } else {
            res.status(200).send({ from:data, message: "Email sent successfully" });
        }
    });
}

module.exports = { send }