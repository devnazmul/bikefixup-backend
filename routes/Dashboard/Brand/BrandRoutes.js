const router = require('express').Router();
const Brand = require('../../../controllers/Dashboard/Brand/BrandControllers');
const checkJwt = require('../../../middlewares/checkJwt');

router.post('/create', checkJwt, Brand?.Create);
router.get('/read-all', Brand?.ReadAll);
router.get('/read', Brand?.ReadWithPagination);
router.put('/update', checkJwt, Brand?.Update);
router.delete('/delete', checkJwt, Brand?.Delete);

module.exports = router;