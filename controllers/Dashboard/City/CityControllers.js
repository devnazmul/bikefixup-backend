const connection = require('../../../db');

const Create = async (req, res) => {
    const data = [
        req.body.state_id,
        req.body.name,
        req.body.is_serviceable,
    ]

    // CHECK USER DUPLICATION 
    const checkEmailQuery = `SELECT * FROM cities WHERE name = ?`;
    connection.query(checkEmailQuery, [req.body.name], (error, results) => {
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
                data: [results],
                message: `City is already exist!`
            })
        } else {
            // INSERT USER INTO DATABASE 
            const insertQuery = `INSERT INTO cities (state_id,name,is_serviceable) VALUES (?,?,?)`;
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
                    message: 'City created successfully.'
                })

            })
        }
    })
}

const ReadAll = async (req, res) => {
    let getAllCitiesQuery = `SELECT * FROM cities ORDER BY name;`
    if (req.query.state_id) {
        getAllCitiesQuery = `SELECT * FROM cities WHERE state_id=${req.query.state_id} ORDER BY name;`
    }
    connection.query(getAllCitiesQuery, (error, result) => {
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
                    message: 'All cities are loaded.'
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
    let getAllCitiesQuery = `SELECT * FROM cities ORDER BY name LIMIT ${(req?.body?.pageNo - 1) * req?.body?.dataPerPage}, ${req?.body?.dataPerPage};`
    let countTotalCitiesQery = `SELECT COUNT(*) FROM cities;`

    if (req.query?.search) {
        getAllCitiesQuery = `SELECT * FROM cities WHERE name LIKE '%${req.query.search}%' LIMIT ${(req?.body?.pageNo - 1) * req?.body?.dataPerPage}, ${req?.body?.dataPerPage};`

        countTotalCitiesQery = `SELECT COUNT(*) FROM cities WHERE name LIKE '%${req.query.search}%';`;
    }

    connection.query(countTotalCitiesQery, (error1, result1) => {
        if (error1) {
            res.status(502).send({
                error: true,
                data: [error1],
                message: `Something is wrong!`
            })
        } else {
            connection.query(getAllCitiesQuery, (error, result) => {
                if (error) {
                    res.status(502).send({
                        error: true,
                        data: [error],
                        message: `Something is wrong!`
                    })
                } else {
                    res.status(200).send({
                        error: false,
                        data: {
                            total_data: result1[0]['COUNT(*)'],
                            page_no: req?.body?.pageNo,
                            per_page: req?.body?.dataPerPage,
                            total_pages: Math.ceil(result1[0]['COUNT(*)'] / req?.body?.dataPerPage),
                            result
                        },
                        message: 'Cities are loaded.'
                    })
                }
            })
        }
    })
}

const Update = async (req, res) => {
    const updateCityQuery = `UPDATE cities SET name=?, state_id=? WHERE id=${req.body.id}`;
    connection.query(updateCityQuery, [req.body?.name, req.body?.state_id], (error, results) => {
        if (error) {
            res.status(502).send({
                error: true,
                data: [error],
                message: `Something is wrong!`
            })
        } else {
            res.status(200).send({
                error: false,
                data: results,
                message: 'City updated successfully.'
            })
        }
    })
}

const Delete = async (req, res) => {
    const deleteSingleCitieQuery = `DELETE FROM cities WHERE id=${req.body.id}`;
    connection.query(deleteSingleCitieQuery, (error, result) => {
        if (error) {
            res.status(502).send({
                error: true,
                data: [error],
                message: `Something is wrong!`
            })
        } else {
            res.status(200).send({
                error: false,
                data: result,
                message: 'Deleted successfully.'
            })
        }
    })
}

module.exports = {
    Create,
    ReadAll,
    Read,
    Update,
    Delete
}