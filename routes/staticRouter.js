var express = require('express')
var URL = require('../models/url')
var {handleSignUpUser, handleLoginUser} = require('../controllers/user.js')
var router = express.Router()

router.get('/', async (req, res) => {
   // console.log('request user', req)
    if (!req.user) return res.redirect("/login");
    console.log('request user', req.user)
    var allUrls = await URL.find({ createdBy: req.user._id });
    res.render('home', {urls: allUrls})
})

router.get('/signup', async (req, res) => {
    res.render('signup')
})


router.get('/login', async (req, res) => {
    res.render('login')
})


router.post('/user/signup', handleSignUpUser)

router.post('/user/login', handleLoginUser)



module.exports = router