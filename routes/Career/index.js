const router = require("express").Router();
const Career = require('../../controllers/Career')

router.post("/create", Career.createData);
router.get("/", Career.getData);
router.put("/update", Career.updateData);
router.delete("/delete", Career.deleteData);

module.exports  = router;