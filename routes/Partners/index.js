const router = require("express").Router();
const Partners = require('../../controllers/Partners')

router.post("/create", Partners.createData);
router.get("/", Partners.getData);
router.put("/update", Partners.updateData);
router.delete("/delete", Partners.deleteData);

module.exports  = router;