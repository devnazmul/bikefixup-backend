const router = require('express').Router(); 
const {Ser} = require('../../../controllers');
const checkJwt = require('../../../middlewares/checkJwt');

router.post('/create',checkJwt,City.Create)
router.get('/read-all',City.ReadAll)
router.get('/read',City.ReadWithPagination)
router.put('/update',checkJwt,City.Update)
router.delete('/delete',checkJwt,City.Delete)

module.exports = router;