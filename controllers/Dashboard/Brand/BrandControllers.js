const connection = require('../../../db');

const Create = async (req, res) => {
    const data = [
        req.body.name,
        parseInt(req.body.active_state),
        req.protocol + '://' + req.get('host') + '/' + req.file.path.replace(/\\/g, '/'),
    ]
    console.log(req.body)
    // CHECK BRAND DUPLICATION 
    const checkNameQuery = `SELECT * FROM brands WHERE name = ?`;

    connection.query(checkNameQuery, [req.body.name], (error, results) => {
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
                const insertQuery = `INSERT INTO brands (name,active_state,logo) VALUES (?,?,?)`;
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
                        message: 'Brand is created successfully.'
                    })

                })
            }
        }
    })
}

const ReadAll = async (req, res) => {
    let getAllBrandsQuery = `SELECT * FROM brands ORDER BY name;`
    let getCountAllBrandsQuery = `SELECT COUNT(*) FROM brands`
    if (req.query.id) {
        getAllBrandsQuery = `SELECT * FROM brands WHERE id=${parseInt(req.query.id)} ORDER BY name;`
        getCountAllBrandsQuery = `SELECT COUNT(*) FROM brands WHERE id=${parseInt(req.query.id)} `
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
                        message: 'brands are loaded.'
                    })
                }

            })
        }
    })
}

const ReadWithPagination = async (req, res) => {
    let getAllBrandsQuery;
    let countTotalBrandsQery = `SELECT COUNT(*) FROM brands;`;

    if (parseInt(req?.query?.pageNo) && parseInt(req?.query?.dataPerPage)) {
        if (req.query?.search) {
            getAllBrandsQuery = `SELECT * FROM brands WHERE name LIKE '%${req.query.search}%' LIMIT ${(parseInt(req?.query?.pageNo) - 1) * parseInt(req?.query?.dataPerPage)}, ${parseInt(req?.query?.dataPerPage)};`
            countTotalBrandsQery = `SELECT COUNT(*) FROM brands WHERE name LIKE '%${req.query.search}%';`;
        } else {
            getAllBrandsQuery = `SELECT * FROM brands ORDER BY name LIMIT ${parseInt(parseInt(req?.query?.pageNo) - 1) * parseInt(req?.query?.dataPerPage)}, ${parseInt(req?.query?.dataPerPage)};`
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
                        message: 'brands are loaded.'
                    })
                }
            })
        }
    })
}

const Update = async (req, res) => {

    if (req.query.id && req.body.name) {
        const data = req.protocol + '://' + req.get('host') + '/' + req.file.path.replace(/\\/g, '/') ? [req.body?.name, req.protocol + '://' + req.get('host') + '/' + req.file.path.replace(/\\/g, '/')] : [req.body?.name]
        const updateBrandQuery = req.protocol + '://' + req.get('host') + '/' + req.file.path.replace(/\\/g, '/') ?
            `UPDATE brands SET name=? , logo=?  WHERE id=${req.query.id}`
            :
            `UPDATE brands SET name=?  WHERE id=${req.query.id}`;

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
                    message: 'Brand updated successfully.'
                })
            }
        })
    } else {
        res.status(400).send({
            error: true,
            data: [],
            message: `Name and id are required.`
        })
    }
}

const Delete = async (req, res) => {
    if (req.body.id) {
        const deleteSingleStateQuery = `DELETE FROM brands WHERE id=${req.body.id}`;
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