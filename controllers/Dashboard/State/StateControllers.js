const connection = require('../../../db');

const Create = async (req, res) => {
    const data = [
        req.body.name,
        req.body.is_serviceable,
    ]

    // CHECK USER DUPLICATION 
    const checkNameQuery = `SELECT * FROM states WHERE name = ?`;
    connection.query(checkNameQuery, [req.body.name], (error, results) => {
        if (error) {
            res.status(500).send({
                error: true,
                data: [],
                message: `Something is wrong!`
            })
        }

        if (results.length > 0) {
            res.status(409).send({
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

const ReadAll = async (req, res) => { // search by Id optinal
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

const ReadWithPagination = async (req, res) => {
    let getAllStatesQuery = '';
    if (parseInt(req?.query?.pageNo) && parseInt(req?.query?.dataPerPage)) {
        getAllStatesQuery = req.query.search ?
            `SELECT * FROM states WHERE name LIKE '%${req.query.search}%' LIMIT ${(parseInt(req?.query?.pageNo) - 1) * parseInt(req?.query?.dataPerPage)}, ${parseInt(req?.query?.dataPerPage)};`
            :
            `SELECT * FROM states ORDER BY name LIMIT ${(parseInt(req?.query?.pageNo) - 1) * parseInt(req?.query?.dataPerPage)}, ${parseInt(req?.query?.dataPerPage)};`
    }

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
        } else {
            connection.query(getAllStatesQuery, (error, result) => {
                if (error) {
                    res.status(500).send({
                        error: true,
                        data: [error],
                        message: `Something is wrong!`
                    })
                } else {
                    res.status(200).send({
                        error: false,
                        data: {
                            total_data: result1[0]['COUNT(*)'],
                            page_no: req?.query?.pageNo,
                            per_page: req?.query?.dataPerPage,
                            total_pages: Math.ceil(result1[0]['COUNT(*)'] / req?.query?.dataPerPage),
                            result
                        },
                        message: 'States are loaded.'
                    })
                }
            })
        }
    })
}

const Update = async (req, res) => {
    if (req.role === 'admin') {
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
    } else {
        res.status(401).send({
            error: true,
            data: [error],
            message: `Unauthenticated!`
        })
    }
}

const Delete = async (req, res) => {
    if (req.role === 'admin') {
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

    } else {
        res.status(401).send({
            error: true,
            data: [error],
            message: `Unauthenticated!`
        })
    }
}

module.exports = {
    Create,
    ReadAll,
    ReadWithPagination,
    Update,
    Delete
}