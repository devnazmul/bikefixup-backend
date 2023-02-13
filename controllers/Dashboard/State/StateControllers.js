const connection = require('../../../db');
const Create = async (req, res) => {
    const data = [
        req.body.name,
        req.body.is_serviceable,
    ]

    // CHECK USER DUPLICATION 
    const checkEmailQuery = `SELECT * FROM states WHERE name = ?`;
    connection.query(checkEmailQuery, [req.body.name], (error, results) => {
        if (error) {
            res.status(500).send({
                error: true,
                data: [],
                message: `Something is wrong!`
            })
        }

        if (results.length > 0) {
            res.status(500).send({
                error: true,
                data: [],
                message: `State is already exist!`
            })
        } else {

            // INSERT USER INTO DATABASE 
            const insertQuery = `INSERT INTO states (name,is_serviceable) VALUES (?,?)`;
            connection.query(insertQuery, data, (error, results) => {
                if (error) {
                    res.status(500).send({
                        error: true,
                        data: [error],
                        message: `Token genarating faild!`
                    })
                }

                res.status(200).send({
                    error: false,
                    data: [],
                    message: 'State created successfully.'
                })

            })
        }
    })
}
const Read = async (req, res) => {

}
const Update = async (req, res) => {

}
const Delete = async (req, res) => {

}

module.exports = {
    Create,
    Read,
    Update,
    Delete
}