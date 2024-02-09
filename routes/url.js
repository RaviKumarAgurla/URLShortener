var express = require('express')
var {generateURLShortener} = require('../controllers/url')
var router = express.Router()


router.post('/', generateURLShortener)



module.exports = router