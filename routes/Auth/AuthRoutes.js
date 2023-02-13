const router = require('express').Router(); 
const authControler = require('../../controllers/Auth/AuthControllers')

router.post('/registration',authControler.UserRegistration)
router.post('/login',authControler.UserLogin)


module.exports = router;