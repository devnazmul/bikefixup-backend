const router = require("express").Router();
const Home = require('../../controllers/Home')

// HeroAllContent
router.post("/create", Home.AllText.createData);
router.get("/", Home.AllText.getData);
router.put("/update", Home.AllText.updateData);

module.exports  = router;