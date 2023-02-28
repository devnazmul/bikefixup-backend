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
                    data: results,
                    message: 'State created successfully.'
                })

            })
        }
    })
}

const ReadAll = async (req, res) => {
    let getAllStatesQuery = `SELECT * FROM states ORDER BY name;`
    if (req.query.id) {
        getAllStatesQuery = `SELECT * FROM states WHERE id=${req.query.id} ORDER BY name;`
    }
    connection.query(getAllStatesQuery, (error, result) => {
        if (error) {
            res.status(502).send({
                error: true,
                data: [error],
                message: `Something is wrong!`
            })
        } else {
            if (result?.length > 0) {
                res.status(200).send({
                    error: false,
                    data: result,
                    message: 'All states are loaded.'
                })
            } else {
                res.status(404).send({
                    error: true,
                    data: [],
                    message: `No data fount!`
                })
            }
        }
    })
}

const Read = async (req, res) => {
    const getAllStatesQuery = req.query.search ?
        `SELECT * FROM states WHERE name LIKE '%${req.query.search}%' LIMIT ${(req?.body?.pageNo - 1) * req?.body?.dataPerPage}, ${req?.body?.dataPerPage};`
        :
        `SELECT * FROM states ORDER BY name LIMIT ${(req?.body?.pageNo - 1) * req?.body?.dataPerPage}, ${req?.body?.dataPerPage};`

    let countTotalStatesQery = req.query.search ?
        `SELECT COUNT(*) FROM states WHERE name LIKE '%${req.query.search}%';`
        :
        `SELECT COUNT(*) FROM states;`

    connection.query(countTotalStatesQery, (error1, result1) => {
        if (error1) {
            res.status(500).send({
                error: true,
                data: [error1],
                message: `Something is wrong!`
            })
        }
        connection.query(getAllStatesQuery, (error, result) => {
            if (error) {
                res.status(500).send({
                    error: true,
                    data: [error],
                    message: `Something is wrong!`
                })
            }
            res.status(200).send({
                error: false,
                data: {
                    total_data: result1[0]['COUNT(*)'],
                    page_no: req?.body?.pageNo,
                    per_page: req?.body?.dataPerPage,
                    total_pages: Math.ceil(result1[0]['COUNT(*)'] / req?.body?.dataPerPage),
                    result
                },
                message: 'States are loaded.'
            })
        })

    })
}

const Update = async (req, res) => {
    const updateStateQuery = `UPDATE states SET name=? WHERE id=${req.body.id}`;
    connection.query(updateStateQuery, [req.body?.name], (error, results) => {
        if (error) {
            res.status(500).send({
                error: true,
                data: [error],
                message: `Something is wrong!`
            })
        }
        res.status(200).send({
            error: false,
            data: results,
            message: 'State updated successfully.'
        })
    })
}

const Delete = async (req, res) => {
    const deleteSingleStateQuery = `DELETE FROM states WHERE id=${req.body.id}`;

    connection.query(deleteSingleStateQuery, (error, result) => {
        if (error) {
            res.status(500).send({
                error: true,
                data: [error],
                message: `Something is wrong!`
            })
        }
        res.status(200).send({
            error: false,
            data: result,
            message: 'Deleted successfully.'
        })
    })
}

module.exports = {
    Create,
    ReadAll,
    Read,
    Update,
    Delete
}