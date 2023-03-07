const router = require('express').Router();
const Model = require('../../../controllers/Dashboard/Model/ModelControllers');
const checkJwt = require('../../../middlewares/checkJwt');

router.post('/create', checkJwt, Model?.Create);
router.get('/read-all', Model?.ReadAll);
router.get('/read', Model?.ReadWithPagination);
router.put('/update', checkJwt, Model?.Update);
router.delete('/delete', checkJwt, Model?.Delete);

module.exports = router;