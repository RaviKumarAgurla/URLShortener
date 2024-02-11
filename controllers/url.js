var nanoid = require('nanoid/non-secure')
var Url = require('../models/url')

async function generateURLShortener(req, res) {
    var body = req.body;
    const id = nanoid.nanoid();
    if(!body || !body.url) return res.status(400).send('URL is required')
    var result = await Url.create({
        redirectURL: body.url,
        shortURL: id,
        createdBy: req.user._id,
    })

    return res.render('home', {id: id})

}



async function handleGetAnalytics(req, res) {
    var shortURL = req.params.shortId
    console.log('shortid', shortURL)
    var data = await URL.findOne({
        shortURL
    })
    console.log('data', data)
    return res.status(200).json({ clicked: data.accessHistory.length, accessHistory: data.accessHistory})
}

module.exports = {
    generateURLShortener,
    handleGetAnalytics
}