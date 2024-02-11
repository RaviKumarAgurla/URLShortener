var express = require('express')
var {handleSignUpUser,handleLoginUser} = require('../controllers/user.js')
var router = express.Router()

router.post('/signup', handleSignUpUser)
router.post('/login', handleLoginUser)

module.exports = router