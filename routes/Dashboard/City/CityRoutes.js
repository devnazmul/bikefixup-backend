const router = require('express').Router(); 
const {City} = require('../../../controllers');
const checkJwt = require('../../../middlewares/checkJwt');

router.post('/create',checkJwt,City.Create)
router.get('/read',City.Read)
router.put('/update',City.Update)
router.delete('/delete',City.Delete)

module.exports = router;