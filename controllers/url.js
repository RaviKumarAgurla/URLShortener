var nanoid = require('nanoid/non-secure')
var Url = require('../models/url')

async function generateURLShortener(req, res) {
    var body = req.body;
    const id = nanoid.nanoid();
    if(!body || !body.url) return res.status(400).send('URL is required')
    var result = await Url.create({
        redirectURL: body.url,
        shortURL: id
    })

    return res.render('home', {id: id})

}

module.exports = {
    generateURLShortener
}