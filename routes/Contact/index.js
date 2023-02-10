const router = require("express").Router();
const Contact = require('../../controllers/Contact')

router.post("/create", Contact.createData);
router.get("/", Contact.getData);
router.put("/update", Contact.updateData);
router.delete("/delete", Contact.deleteData);

module.exports  = router;