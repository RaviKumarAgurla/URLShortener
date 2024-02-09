var nanoid = require('nanoid/non-secure')
var Url = require('../models/url')

function generateURLShortener(req, res) {
    var body = req.body;
    const id = nanoid.nanoid();
    if(!body || !body.url) return res.status(400).send('URL is required')
    var result = Url.create({
        redirectURL: body.url,
        shortURL: id
    })

    return res.status(200).send('Success')

}

module.exports = {
    generateURLShortener
}