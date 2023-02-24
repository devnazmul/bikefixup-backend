const router = require('express').Router(); 
const authControler = require('../../controllers/Auth/AuthControllers');
const checkJwt = require('../../middlewares/checkJwt');

router.post('/registration',authControler.UserRegistration)
router.post('/login',authControler.UserLogin)
router.post('/check-if-the-phone-is-exist',authControler.checkPhone)
router.get('/checkJWTvalidation',checkJwt,authControler.checkJWTvalidation)

module.exports = router;