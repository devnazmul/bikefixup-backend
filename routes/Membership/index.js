const router = require("express").Router();
const Membership = require('../../controllers/Membership')

router.post("/create", Membership.createData);
router.get("/", Membership.getData);
router.put("/update", Membership.updateData);
router.delete("/delete", Membership.deleteData);

module.exports  = router;