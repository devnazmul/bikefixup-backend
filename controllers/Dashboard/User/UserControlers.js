const connection = require('../../../db');

// const Create = async (req, res) => {
//     const data = [
//         req.body.state_id,
//         req.body.name,
//         req.body.is_serviceable,
//     ]

//     // CHECK USER DUPLICATION 
//     const checkEmailQuery = `SELECT * FROM users WHERE name = ?`;
//     connection.query(checkEmailQuery, [req.body.name], (error, results) => {
//         if (error) {
//             res.status(500).send({
//                 error: true,
//                 data: [],
//                 message: `Something is wrong!`
//             })
//         }

//         if (results.length > 0) {
//             res.status(500).send({
//                 error: true,
//                 data: [],
//                 message: `State is already exist!`
//             })
//         } else {
//             // INSERT USER INTO DATABASE 
//             const insertQuery = `INSERT INTO cities (state_id,name,is_serviceable) VALUES (?,?,?)`;
//             connection.query(insertQuery, data, (error, results) => {
//                 if (error) {
//                     res.status(500).send({
//                         error: true,
//                         data: [error],
//                         message: `Token genarating faild!`
//                     })
//                 }

//                 res.status(200).send({
//                     error: false,
//                     data: [],
//                     message: 'State created successfully.'
//                 })

//             })
//         }
//     })
// }

const Read = async (req, res) => {
    if (req.body.pageNo && req.body.dataPerPage) {
        let getAllUsersQuery = `SELECT * FROM users ORDER BY id DESC LIMIT ${(req?.body?.pageNo - 1) * req?.body?.dataPerPage}, ${req?.body?.dataPerPage};`

        let countTotalUsersQery = `SELECT COUNT(*) FROM users;`

        if (req.query?.search) {
            getAllUsersQuery = `SELECT * FROM users WHERE name LIKE '%${req.query.search}%' OR phone LIKE '%${req.query.search}%' OR email LIKE '%${req.query.search}%' LIMIT ${(req?.body?.pageNo - 1) * req?.body?.dataPerPage}, ${req?.body?.dataPerPage};`

            countTotalUsersQery = `SELECT COUNT(*) FROM users WHERE name LIKE '%${req.query.search}%' OR phone LIKE '%${req.query.search}%' OR email LIKE '%${req.query.search}%';`;
        }
        connection.query(countTotalUsersQery, (error1, result1) => {
            if (error1) {
                res.status(500).send({
                    error: true,
                    data: [error1],
                    message: `Something is wrong!`
                })
            }
            connection.query(getAllUsersQuery, (error, result) => {
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
                    message: 'All users are loaded.'
                })
            })
        })
    } else {
        if (req.query?.search) {
            getAllUsersQuery = `SELECT * FROM users WHERE name LIKE '%${req.query.search}%' OR phone LIKE '%${req.query.search}%' OR email LIKE '%${req.query.search}%';`

            countTotalUserQery = `SELECT COUNT(*) FROM users WHERE name LIKE '%${req.query.search}%' OR phone LIKE '%${req.query.search}%' OR email LIKE '%${req.query.search}%';`;
        }
        const getAllUsersWithoutPaginationQuery = req.query.search ?
            `SELECT * FROM users WHERE name LIKE '%${req.query.search}%' OR phone LIKE '%${req.query.search}%' OR email LIKE '%${req.query.search}%';`
            :
            `SELECT * FROM users ORDER BY id DESC;`
        connection.query(getAllUsersWithoutPaginationQuery, (error, result) => {
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
                    total_data: result.length,
                    result
                },
                message: 'All users are loaded.'
            })
        })
    }

}

const Update = async (req, res) => {
    if (req.body.id && req.body.role) {
        const updateUserQuery = `UPDATE users SET role=? WHERE id=${req.body.id}`;
        connection.query(updateUserQuery, [req.body?.role], (error, results) => {
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
                message: 'Role changed successfully.'
            })
        })
    } else {
        res.status(500).send({
            error: true,
            data: [error],
            message: `id and role is required!`
        })
    }

}

const Delete = async (req, res) => {
    if (req.body.id) {
        const deleteSingleUserQuery = `DELETE FROM users WHERE id=${req.body.id}`;
        connection.query(deleteSingleUserQuery, (error, result) => {
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
                message: 'User deleted successfully.'
            })
        })
    } else {
        res.status(500).send({
            error: true,
            data: [error],
            message: `id is required!`
        })
    }

}

module.exports = {
    Read,
    Update,
    Delete
}