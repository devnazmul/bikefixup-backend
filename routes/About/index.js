const router = require("express").Router();
const About = require('../../controllers/About')

router.post("/create", About.createData);
router.get("/", About.getData);
router.put("/update", About.updateData);
router.delete("/delete", About.deleteData);

module.exports  = router;