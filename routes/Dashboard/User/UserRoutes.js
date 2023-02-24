const router = require('express').Router(); 
const User = require('../../../controllers/Dashboard/User/UserControlers');

router.get('/read',User?.Read);
router.put('/update',User?.Update);
router.delete('/delete',User?.Delete);

module.exports = router;