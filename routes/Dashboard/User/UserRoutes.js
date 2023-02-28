const router = require('express').Router(); 
const User = require('../../../controllers/Dashboard/User/UserControlers');
const checkJwt = require('../../../middlewares/checkJwt');

router.get('/read',checkJwt,User?.Read);
router.put('/update',checkJwt,User?.Update);
router.delete('/delete',checkJwt,User?.Delete);

module.exports = router;