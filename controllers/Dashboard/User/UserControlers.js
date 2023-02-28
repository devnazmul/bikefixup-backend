const connection = require('../../../db');


const ReadWithPagination = async (req, res) => {
    if (req.role === 'admin') {
        if (parseInt(req?.query?.pageNo) && parseInt(req?.query?.dataPerPage)) {
            let getAllUsersQuery = `
        SELECT 
        users.id AS id, 
        users.name AS name, 
        users.email AS email,
        users.phone AS phone,
        states.name AS state,
        cities.name AS city
        FROM users 
        LEFT JOIN states ON users.state_id = states.id
        LEFT JOIN cities ON users.city_id = cities.id
        ORDER BY id DESC LIMIT ${(parseInt(req?.query?.pageNo) - 1) * parseInt(req?.query?.dataPerPage)}, ${parseInt(req?.query?.dataPerPage)};`

            let countTotalUsersQery = `SELECT COUNT(*) FROM users;`

            if (req.query?.search) {
                getAllUsersQuery = `SELECT 
            users.id AS id, 
            users.name AS name, 
            users.email AS email,
            users.phone AS phone,
            states.name AS state,
            cities.name AS city
            FROM users 
            LEFT JOIN states ON users.state_id = states.id
            LEFT JOIN cities ON users.city_id = cities.id
             WHERE users.name LIKE '%${req.query.search}%' OR phone LIKE '%${req.query.search}%' OR email LIKE '%${req.query.search}%' LIMIT ${(parseInt(req?.query?.pageNo) - 1) * parseInt(req?.query?.dataPerPage)}, ${parseInt(req?.query?.dataPerPage)};`

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
                            page_no: parseInt(req?.query?.pageNo),
                            per_page: parseInt(req?.query?.dataPerPage),
                            total_pages: Math.ceil(result1[0]['COUNT(*)'] / parseInt(req?.query?.dataPerPage)),
                            result
                        },
                        message: 'All users are loaded.'
                    })
                })
            })
        } else {
            if (req.query?.search) {
                getAllUsersQuery = `
            SELECT 
            users.id AS id, 
            users.name AS name, 
            users.email AS email,
            users.phone AS phone,
            states.name AS state,
            cities.name AS city
            FROM users 
            LEFT JOIN states ON users.state_id = states.id
            LEFT JOIN cities ON users.city_id = cities.id
            WHERE name LIKE '%${req.query.search}%' OR phone LIKE '%${req.query.search}%' OR email LIKE '%${req.query.search}%';`

                countTotalUserQery = `SELECT COUNT(*) FROM users WHERE name LIKE '%${req.query.search}%' OR phone LIKE '%${req.query.search}%' OR email LIKE '%${req.query.search}%';`;
            }
            const getAllUsersWithoutPaginationQuery = req.query.search ?
                `SELECT 
            users.id AS id, 
            users.name AS name, 
            users.email AS email,
            users.phone AS phone,
            states.name AS state,
            cities.name AS city
            FROM users 
            LEFT JOIN states ON users.state_id = states.id
            LEFT JOIN cities ON users.city_id = cities.id
            WHERE name LIKE '%${req.query.search}%' OR phone LIKE '%${req.query.search}%' OR email LIKE '%${req.query.search}%';`
                :
                `SELECT 
            users.id AS id, 
            users.name AS name, 
            users.email AS email,
            users.phone AS phone,
            states.name AS state,
            cities.name AS city
            FROM users 
            LEFT JOIN states ON users.state_id = states.id
            LEFT JOIN cities ON users.city_id = cities.id
             ORDER BY id DESC;`
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
    } else {
        res.status(401).send({
            error: true,
            data: [error],
            message: `Unauthenticated!`
        })
    }
}

const Update = async (req, res) => {
    if ((req.role === 'admin') || (req.role === 'user' && req.id === req.body.id)) {
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
    } else {
        res.status(401).send({
            error: true,
            data: [error],
            message: `Unauthenticated!`
        })
    }


}

const Delete = async (req, res) => {
    if ((req.role === 'admin') || (req.role === 'user' && req.id === req.body.id)) {
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
    } else {
        res.status(401).send({
            error: true,
            data: [error],
            message: `Unauthenticated!`
        })
    }
}

module.exports = {
    ReadWithPagination,
    Update,
    Delete
}