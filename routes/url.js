var express = require('express')
var {generateURLShortener, handleGetAnalytics} = require('../controllers/url')
var router = express.Router()


router.post('/', generateURLShortener)

router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router