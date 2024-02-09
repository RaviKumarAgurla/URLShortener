var express = require('express')
var URL = require('../models/url')
var router = express.Router()

router.get('/', async (req, res) => {
    var allUrls = await URL.find({})
    console.log('urls', allUrls)
    res.render('home', {urls: allUrls})
})


module.exports = router