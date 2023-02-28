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

const ReadAll = async (req, res) => { // read by state is
    let getAllCitiesQuery = `SELECT * FROM cities ORDER BY name;`
    if (req.query.state_id) {
        getAllCitiesQuery = `SELECT * FROM cities WHERE state_id=${parseInt(req.query.state_id)} ORDER BY name;`
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

const ReadWithPagination = async (req, res) => {
    let getAllCitiesQuery;
    let countTotalCitiesQery = `SELECT COUNT(*) FROM cities;`

    if (parseInt(req?.query?.pageNo) && parseInt(req?.query?.dataPerPage)) {
        if (req.query?.search) {
            getAllCitiesQuery = `SELECT * FROM cities WHERE name LIKE '%${req.query.search}%' LIMIT ${(parseInt(req?.query?.pageNo) - 1) * parseInt(req?.query?.dataPerPage)}, ${parseInt(req?.query?.dataPerPage)};`
            countTotalCitiesQery = `SELECT COUNT(*) FROM cities WHERE name LIKE '%${req.query.search}%';`;
        } else {
            getAllCitiesQuery = `SELECT * FROM cities ORDER BY name LIMIT ${(parseInt(req?.query?.pageNo) - 1) * parseInt(req?.query?.dataPerPage)}, ${parseInt(req?.query?.dataPerPage)};`
        }
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
                            page_no: parseInt(req?.query?.pageNo),
                            per_page: parseInt(req?.query?.dataPerPage),
                            total_pages: Math.ceil(result1[0]['COUNT(*)'] / parseInt(req?.query?.dataPerPage)),
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
    if (req.role === 'admin') {
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