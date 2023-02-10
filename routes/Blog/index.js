const router = require("express").Router();
const Blog = require('../../controllers/Blog')

router.post("/create", Blog.createData);
router.get("/", Blog.getData);
router.put("/update", Blog.updateData);
router.delete("/delete", Blog.deleteData);

module.exports  = router;