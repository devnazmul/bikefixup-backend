const router = require('express').Router(); 
const Brand = require('../../../controllers/Dashboard/Brand/BrandControllers');
const checkJwt = require('../../../middlewares/checkJwt');

router.post('/create',checkJwt,Brand?.Create);
router.get('/read',Brand?.Read);
router.put('/update',Brand?.Update);
router.delete('/delete',Brand?.Delete);

module.exports = router;