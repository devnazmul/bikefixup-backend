const router = require('express').Router();
const { State } = require('../../../controllers');
const checkJwt = require('../../../middlewares/checkJwt');

router.post('/create', checkJwt, State.Create)
router.get('/read-all', State.ReadAll)
router.get('/read', State.ReadWithPagination)
router.put('/update', checkJwt, State.Update)
router.delete('/delete', checkJwt, State.Delete)

module.exports = router;