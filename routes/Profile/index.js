const router = require("express").Router();
const Profile = require('../../controllers/Profile')

router.post("/create", Profile.createData);
router.get("/", Profile.getData);
router.put("/update", Profile.updateData);
router.delete("/delete", Profile.deleteData);

module.exports  = router;