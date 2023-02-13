const router = require('express').Router(); 
const State = require('../../../controllers/Dashboard/State/StateControllers');
const checkJwt = require('../../../middlewares/checkJwt');

router.post('/create',State.Create)
router.get('/read',State.Read)
router.put('/update',State.Update)
router.delete('/delete',State.Delete)

module.exports = router;