const connection = require('../../db')


// All Text
const AllText = {
    createData: async (req, res) => {

        
        const keys = Object.keys(req.body.all_home_plain_content).map((key) => {
            return key
        }).join(",")

        const values = Object.keys(req.body.all_home_plain_content).map((key) => {
            return `'${req.body.all_home_plain_content[key]}'`
        }).join(",")


        connection.query(`INSERT INTO all_home_plain_content (${keys}) VALUES (${values})`, function (error, results, fields) {
            if (error) throw res.status(200).send({
                error: false,
                data: error,
                message: 'Something went wrong!'
            });
            res.status(200).send({
                error: false,
                data: results,
                message: 'data created successfully!'
            })
        });
    },
    getData: async (req, res) => {

    },
    updateData: async (req, res) => {

    }
}


module.exports = {
    AllText,
}