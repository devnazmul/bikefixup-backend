const connection = require('../../db')

const Hero = {
    create: async (req, res) => {
        const values = [
            req.body.home_hero.id,
            req.body.home_hero.title,
            req.body.home_hero.paragraph,
            req.body.home_hero.image,
            req.body.home_hero.form_title,
            req.body.home_hero.form_button,
            req.body.home_hero.form_phone
        ]
        const values2 = req.body.hero_service_card.map(i => {
            return [i.id, i.image, i.title]
        })
        console.log({
            values,
            values2
        })
        connection.query(`REPLACE INTO home_hero (id,title,paragraph,image,form_title,form_button,form_phone) VALUES (?, ?, ?, ?, ?, ?, ?)`, values, (err, row) => {
            if (err) {
                res.status(500).send({
                    error: true,
                    data: err,
                    message: `Something went wrong!`
                })
            }
            connection.query(`REPLACE INTO hero_service_card (id,image,title) VALUES ?;`, [values2], (err, row) => {
                if (err) {
                    res.status(500).send({
                        error: true,
                        data: err,
                        message: `Something went wrong!`
                    })
                }
                res.status(200).send({
                    error: false,
                    data: [],
                    message: `Data created successfully!`
                })

            })
        })
    },
    read: async (req, res) => {
        connection.query(`SELECT * FROM home_hero`, (err, home_heros) => {
            if (err) {
                res.status(500).send({
                    error: true,
                    data: err,
                    message: `Something was wrong!`
                })
            }

            connection.query(`SELECT * FROM hero_service_card`, (err, hero_service_cards) => {
                if (err) {
                    res.status(500).send({
                        error: true,
                        data: err,
                        message: `Something was wrong!`
                    })
                }
                console.log({ hero_service_cards })
                res.status(200).send({
                    error: false,
                    data: {home_heros, hero_service_cards},
                    message: `Successfully get data.`
                })
            })
        })
    },
    update: async (req, res) => {
        connection.query(`
        UPDATE home_hero SET 
        title="${req.body.home_hero.title}", 
        paragraph="${req.body.home_hero.paragraph}",
        image="${req.body.home_hero.image}",
        form_title="${req.body.home_hero.form_title}",
        form_button="${req.body.home_hero.form_button}",
        form_phone="${req.body.home_hero.form_phone}" WHERE id=${req.body.home_hero.id}`, (err, row1) => {
            if (err) {
                res.status(500).send({
                    error: true,
                    data: err,
                    message: `Something went wrong!`
                })
            }

            req.body.hero_service_card.map((item) => {
                connection.query(`
                UPDATE hero_service_card SET 
                image="${item.image}", 
                title="${item.title}"
                WHERE id=${item.id}`, (err, row2) => {
                    if (err) {
                        res.status(500).send({
                            error: true,
                            data: err,
                            message: `Something was wrong!`
                        })
                    }
                });
            })

            res.status(200).send({
                error: false,
                data: [],
                message: `Updated successfully.`
            })

        })
    },
    delete: async (req, res) => {
        connection.query(`DELETE FROM hero_service_card WHERE id=${req.body.id}`, (err, row) => {
            if (err) {
                res.status(500).send({
                    error: true,
                    data: err,
                    message: `Something was wrong!`
                })
            }
            res.status(200).send({
                error: false,
                data: row,
                message: `Deleted successfully!`
            })
        })
    }
}


const MobileApp = {
    create: async () => {

    },
    read: async () => {

    },
    update: async () => {

    },
    delete: async () => {

    }
}


const ServiceApp = {
    create: async () => {

    },
    read: async () => {

    },
    update: async () => {

    },
    delete: async () => {

    }
}


const Benifit = {
    create: async () => {

    },
    read: async () => {

    },
    update: async () => {

    },
    delete: async () => {

    }
}


const Location = {
    create: async () => {

    },
    read: async () => {

    },
    update: async () => {

    },
    delete: async () => {

    }
}


const CustomerSpeak = {
    create: async () => {

    },
    read: async () => {

    },
    update: async () => {

    },
    delete: async () => {

    }
}

module.exports = {
    Hero,
    MobileApp,
    ServiceApp,
    Benifit,
    Location,
    CustomerSpeak,
}