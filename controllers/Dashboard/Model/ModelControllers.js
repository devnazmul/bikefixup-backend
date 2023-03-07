const connection = require('../../../db');

const Create = async (req, res) => {
    const data = [
        req.body.name,
        req.body.active_state,
        parseInt(req.body.brand_id),
    ]
    // CHECK MODEL DUPLICATION 
    const checkNameQuery = `SELECT * FROM vehicle_models WHERE name = ? AND brand_id = ?`;
    console.log({checkNameQuery})
    connection.query(checkNameQuery, [req.body.name,parseInt(req.body.brand_id)], (error, results) => {
        if (error) {
            res.status(409).send({
                error: true,
                data: [],
                message: `Something is wrong!`
            })
        } else {
            if (results.length > 0) {
                res.status(500).send({
                    error: true,
                    data: [],
                    message: `${req.body.name} is already exist in database!`
                })
            } else {
                // INSERT BRAND INTO DATABASE 
                const insertQuery = `INSERT INTO vehicle_models (name, active_state, brand_id) VALUES (?,?,?)`;
                connection.query(insertQuery, data, (error, results) => {
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
                        message: 'Model is created successfully.'
                    })

                })
            }
        }
    })
}

const ReadAll = async (req, res) => {
    let getAllBrandsQuery = `SELECT * FROM vehicle_models ORDER BY name;`
    let getCountAllBrandsQuery = `SELECT COUNT(*) FROM vehicle_models`
    if (req.query.id) {
        getAllBrandsQuery = `SELECT * FROM vehicle_models WHERE id=${parseInt(req.query.id)} ORDER BY name;`
        getCountAllBrandsQuery = `SELECT COUNT(*) FROM vehicle_models WHERE id=${parseInt(req.query.id)} `
    }
    connection.query(getCountAllBrandsQuery, (error1, result1) => {
        if (error1) {
            res.status(500).send({
                error: true,
                data: [error1],
                message: `Something is wrong!`
            })
        } else {
            connection.query(getAllBrandsQuery, (error1, result) => {
                if (error1) {
                    res.status(500).send({
                        error: true,
                        data: [error1],
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
                        message: 'Models are loaded.'
                    })
                }

            })
        }
    })
}

const ReadWithPagination = async (req, res) => {
    let getAllBrandsQuery;
    let countTotalBrandsQery = `SELECT COUNT(*) FROM vehicle_models;`;

    if (parseInt(req?.query?.pageNo) && parseInt(req?.query?.dataPerPage)) {
        if (req.query?.search) {
            getAllBrandsQuery = `SELECT * FROM vehicle_models WHERE name LIKE '%${req.query.search}%' LIMIT ${(parseInt(req?.query?.pageNo) - 1) * parseInt(req?.query?.dataPerPage)}, ${parseInt(req?.query?.dataPerPage)};`
            countTotalBrandsQery = `SELECT COUNT(*) FROM vehicle_models WHERE name LIKE '%${req.query.search}%';`;
        } else {
            getAllBrandsQuery = `SELECT * FROM vehicle_models ORDER BY name LIMIT ${parseInt(parseInt(req?.query?.pageNo) - 1) * parseInt(req?.query?.dataPerPage)}, ${parseInt(req?.query?.dataPerPage)};`
        }
    }


    connection.query(countTotalBrandsQery, (error1, result1) => {
        if (error1) {
            res.status(500).send({
                error: true,
                data: [error1],
                message: `Something is wrong!`
            })
        } else {
            connection.query(getAllBrandsQuery, (error, result) => {
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
                            page_no: parseInt(req?.query?.pageNo),
                            per_page: parseInt(req?.query?.dataPerPage),
                            total_pages: Math.ceil(result1[0]['COUNT(*)'] / parseInt(req?.query?.dataPerPage)),
                            result
                        },
                        message: 'Models are loaded.'
                    })
                }
            })
        }
    })
}

const Update = async (req, res) => {
    if (req.body.id && req.body.name) {
        const data = req.body.logo ? [req.body?.name, req.body?.logo] : [req.body?.name]
        const updateBrandQuery = req.body.logo ?
            `UPDATE vehicle_models SET name=? , logo=?  WHERE id=${req.body.id}`
            :
            `UPDATE vehicle_models SET name=?  WHERE id=${req.body.id}`;

        connection.query(updateBrandQuery, data, (error, results) => {
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
                    message: 'Model updated successfully.'
                })
            }
        })
    } else {
        res.status(400).send({
            error: true,
            data: [],
            message: `name and id are required.`
        })
    }
}

const Delete = async (req, res) => {
    if (req.body.id) {
        const deleteSingleStateQuery = `DELETE FROM vehicle_models WHERE id=${req.body.id}`;
        connection.query(deleteSingleStateQuery, (error, result) => {
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
        res.status(400).send({
            error: true,
            data: [],
            message: `id is required!`
        })
    }
}

module.exports = {
    Create,
    ReadWithPagination,
    ReadAll,
    Update,
    Delete
}