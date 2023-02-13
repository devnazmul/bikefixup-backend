const connection = require('../../db');
const jwt = require('jsonwebtoken')
const UserRegistration = async (req, res) => {
    const data = [
        'user',
        req.body.active_state,
        req.body.name,
        req.body.email,
        req.body.phone,
        req.body.password,
        req.body.state_id,
        req.body.city_id,
        req.body.latitude,
        req.body.longitude,
    ]

    // CHECK USER DUPLICATION 
    const checkEmailQuery = `SELECT * FROM users WHERE email = ?`;
    connection.query(checkEmailQuery, [req.body.email], (error, results) => {
        if (error) {
            res.status(500).send({
                error: true,
                data: [error],
                message: `Something is wrong!`
            })
        }

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
                    res.status(500).send({
                        error: true,
                        data: [error],
                        message: `Something is wrong!`
                    })
                }
                jwt.sign({ id: results, name: data.name, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '7d' }, (error, token) => {
                    if (error) {
                        res.status(500).send({
                            error: true,
                            data: [error],
                            message: `Token genarating faild!`
                        })
                    }
                    res.status(200).send({
                        error: false,
                        data: {
                            user: {
                                id: results.insertId,
                                name: req.body.name,
                                role:'admin'
                            },
                            token
                        },
                        message: 'User created successfully.'
                    })
                })
            })
        }
    })

}


const UserLogin = async (req, res) => {

}



module.exports = {
    UserRegistration,
    UserLogin
}