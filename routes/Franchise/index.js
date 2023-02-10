const router = require("express").Router();
const Franchise = require('../../controllers/Franchise')

router.post("/create", Franchise.createData);
router.get("/", Franchise.getData);
router.put("/update", Franchise.updateData);
router.delete("/delete", Franchise.deleteData);

module.exports  = router;