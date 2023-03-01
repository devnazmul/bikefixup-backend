const connection = require('../../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const UserRegistration = async (req, res) => {
    await bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
        const data = [
            'admin',
            req.body.active_state,
            req.body.name,
            req.body.email,
            req.body.phone,
            hash,
            parseInt(req.body.state_id),
            parseInt(req.body.city_id),
            parseFloat(req.body.latitude),
            parseFloat(req.body.longitude),
        ]
        // CHECK USER DUPLICATION 
        const checkEmailQuery = `SELECT * FROM users WHERE email = ?`;
        connection.query(checkEmailQuery, [req.body.email], (error, results) => {
            if (error) {
                res.status(502).send({
                    error: true,
                    data: [error],
                    message: `Something is wrong!`
                })
            } else {
                if (results.length > 0) {
                    res.status(500).send({
                        error: true,
                        data: [],
                        message: `User is already exist!`
                    })
                } else {
                    // INSERT USER INTO DATABASE 
                    const insertQuery = `INSERT INTO users (role,active_state,name,email,phone,password,state_id,city_id,latitude,longitude) VALUES (?,?,?,?,?,?,?,?,?,?)`;
                    connection.query(insertQuery, data, (error, results) => {
                        if (error) {
                            res.status(502).send({
                                error: true,
                                data: [error],
                                message: `Something is wrong!`
                            })
                        } else {
                            jwt.sign({ id: results, name: data.name, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '7d' }, (error, token) => {
                                if (error) {
                                    res.status(500).send({
                                        error: true,
                                        data: [error],
                                        message: `Token genarating faild!`
                                    })
                                } else {
                                    res.status(200).send({
                                        error: false,
                                        data: {
                                            user: {
                                                id: results.insertId,
                                                name: req.body.name,
                                                role: 'admin'
                                            },
                                            token
                                        },
                                        message: 'User created successfully.'
                                    })
                                }

                            })
                        }
                    })
                }
            }
        })
    })
}

const UserLogin = async (req, res) => {
    const checkEmailQuery = `SELECT * FROM users WHERE email = ? OR phone = ?`;
    connection.query(checkEmailQuery, [req.body.email, req.body.phone], async (error, results) => {
        if (error) {
            res.status(502).send({
                error: true,
                data: [error],
                message: `Something is wrong!`
            })
        } else {
            if (results.length > 0) {
                bcrypt.compare(req.body.password, results[0].password, (err, result) => {
                    if (err) {
                        res.status(500).send({
                            error: true,
                            data: [error],
                            message: `Token genarating faild!`
                        })
                    } else {
                        if (result) {
                            jwt.sign({ id: results[0].id, name: results[0].name, role: results[0].role }, process.env.JWT_SECRET, { expiresIn: `${results[0].role === 'admin' ? '7m' : '7d'}` }, (error, token) => {
                                if (error) {
                                    res.status(500).send({
                                        error: true,
                                        data: [error],
                                        message: `Token genarating faild!`
                                    })
                                } else {
                                    res.status(200).send({
                                        error: false,
                                        data: {
                                            user: {
                                                id: results.insertId,
                                                name: req.body.name,
                                                role: 'admin'
                                            },
                                            token
                                        },
                                        message: 'User created successfully.'
                                    })
                                }
                            })
                        } else {
                            res.status(500).send({
                                error: true,
                                data: [],
                                message: `Incorrect credentials!`
                            })
                        }
                    }

                })
            } else {
                res.status(500).send({
                    error: true,
                    data: [],
                    message: `Incorrect credentials!`
                })
            }
        }


    })
}

// CHECK IS PHONE NUMBER IS EXIST 
const checkPhone = async (req, res) => {

    const checkPhoneQuery = `SELECT * FROM users WHERE phone = ?`;

    connection.query(checkPhoneQuery, [req.body.phone], (error, results) => {
        if (error) {
            res.status(502).send({
                error: true,
                data: [error],
                message: `Something is wrong!`
            })
        } else {
            if (results.length > 0) {
                res.status(500).send({
                    error: true,
                    data: [],
                    message: `This number is already exist!`
                })
            } else {
                res.status(200).send({
                    error: false,
                    data: [],
                    message: `It's a new number.`
                })
            }
        }
    })
}

const checkJWTvalidation = async (req, res) => {
    res.status(200).send({
        error: false,
        data: [],
        message: 'Token is valid'
    })
}

module.exports = {
    UserRegistration,
    UserLogin,
    checkPhone,
    checkJWTvalidation
}