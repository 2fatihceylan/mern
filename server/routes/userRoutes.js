const express = require('express');
const router = express.Router();
const {registerUser, loginUser, getMe} = require('../controllers/userController')
const {validateToken} =require('../middlewares/JWT');


router.post('/', registerUser)
router.post('/login', loginUser)
router.post('/me',validateToken, getMe)




module.exports = router;