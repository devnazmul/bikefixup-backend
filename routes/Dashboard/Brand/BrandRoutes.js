const router = require('express').Router();
const Brand = require('../../../controllers/Dashboard/Brand/BrandControllers');
const checkJwt = require('../../../middlewares/checkJwt');
const upload = require('../../../middlewares/multerMW');

router.post('/create', checkJwt, upload.single('brandImg'), Brand?.Create);
router.get('/read-all', Brand?.ReadAll);
router.get('/read', Brand?.ReadWithPagination);
router.put('/update', checkJwt, upload.single('brandImg'), Brand?.Update);
router.delete('/delete', checkJwt, Brand?.Delete);

module.exports = router;