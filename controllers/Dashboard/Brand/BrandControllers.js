const connection = require('../../../db');

const Create = async (req, res) => {
    const data = [
        req.body.name,
        req.body.active_state,
        req.body.logo,
    ]

    // CHECK BRAND DUPLICATION 
    const checkEmailQuery = `SELECT * FROM brands WHERE name = ?`;
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
    })
}

const Read = async (req, res) => {
    const getAllBrandsQuery = req.query.search ?
        `SELECT * FROM brands WHERE name LIKE '%${req.query.search}%' LIMIT ${(req?.body?.pageNo - 1) * req?.body?.dataPerPage}, ${req?.body?.dataPerPage};`
        :
        `SELECT * FROM brands ORDER BY name LIMIT ${(req?.body?.pageNo - 1) * req?.body?.dataPerPage}, ${req?.body?.dataPerPage};`

    let countTotalBrandsQery = req.query.search ?
        `SELECT COUNT(*) FROM brands WHERE name LIKE '%${req.query.search}%';`
        :
        `SELECT COUNT(*) FROM brands;`

    connection.query(countTotalBrandsQery, (error1, result1) => {
        if (error1) {
            res.status(500).send({
                error: true,
                data: [error1],
                message: `Something is wrong!`
            })
        }
        connection.query(getAllBrandsQuery, (error, result) => {
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
                message: 'brands are loaded.'
            })
        })

    })
}

const Update = async (req, res) => {
    if (req.body.id && req.body.name) {
        const data = req.body.logo ? [req.body?.name, req.body?.logo] : [req.body?.name]
        const updateBrandQuery = req.body.logo ?
            `UPDATE brands SET name=? , logo=?  WHERE id=${req.body.id}`
            :
            `UPDATE brands SET name=?  WHERE id=${req.body.id}`;

        connection.query(updateBrandQuery, data, (error, results) => {
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
                message: 'Brand updated successfully.'
            })
        })
    } else {
        res.status(500).send({
            error: true,
            data: [],
            message: `name and id are required.`
        })
    }
}

const Delete = async (req, res) => {
    if (req.body.id) {
        const deleteSingleStateQuery = `DELETE FROM brands WHERE id=${req.body.id}`;
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
    }else{
        res.status(500).send({
            error: true,
            data: [],
            message: `id is required!`
        })
    }
}

module.exports = {
    Create,
    Read,
    Update,
    Delete
}