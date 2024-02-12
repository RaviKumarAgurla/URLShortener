var express = require('express')
var URL = require('../models/url')
var {handleSignUpUser, handleLoginUser} = require('../controllers/user.js')
const { restrictToRole } = require('../middlewares/auth.js')
var router = express.Router()

router.get('/', restrictToRole(['NORMAL']), async (req, res) => {
    console.log('req from home', req.user)
    // if (!req.user) return res.redirect("/login");
    var allUrls = await URL.find({ createdBy: req.user._id });
    res.render('home', {urls: allUrls})
})

router.get('/admin/url', restrictToRole(['ADMIN']) , async (req, res) => {
    console.log('req', req)
    if (!req.user) return res.redirect("/login");
    var allUrls = await URL.find({});
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