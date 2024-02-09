var express = require('express')
var urlRouter = require('./routes/url')
var URL = require('./models/url')
var connectToDB = require('./connect')
var app = express()
var PORT = 8000

// Connect to mongoDB
connectToDB('mongodb://localhost:27017/url-shortener').then(()=>{
    console.log('mongoDB is connected')
})

// middleware
app.use(express.json())

app.get("/:shortId", async (req, res) => {
    console.log('got request', req.params)
    var shortURL = req.params.shortId
    var data = await URL.findOneAndUpdate({
        shortURL
    }, 
    {
        $push: {
            accessHistory: {timestamp: Date.now()}
            }
    })
    console.log(data)
    res.redirect(data.redirectURL)
})

app.get('/analytics/:shortId', async (req, res) => {
    var shortURL = req.params.shortId
    console.log('shortid', shortURL)
    var data = await URL.findOne({
        shortURL
    })
    console.log('data', data)
    return res.status(200).json({ clicked: data.accessHistory.length, accessHistory: data.accessHistory})
})

// Routes
app.use('/url', urlRouter)

app.listen(PORT, () => {
    console.log(`Server is listening at PORT: ${PORT}`)
})