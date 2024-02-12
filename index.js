var express = require('express')
var path = require('path')
var URL = require('./models/url')
var cookieParser = require('cookie-parser')
var connectToDB = require('./connect')
var {checkAuthentication, restrictToRole} = require('./middlewares/auth')


var urlRouter = require('./routes/url')
var staticRouter = require('./routes/staticRouter')
var userRouter = require('./routes/userRouter')

var app = express()
var PORT = 8000

// Connect to mongoDB
connectToDB('mongodb://localhost:27017/url-shortener').then(()=>{
    console.log('mongoDB is connected')
})

// middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser());
app.use(checkAuthentication)

app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))

app.get("/url/:shortId", async (req, res) => {
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
    res.redirect(data.redirectURL)
})

// Routes
app.use('/url', restrictToRole(['NORMAL']), urlRouter)
app.use('/', staticRouter)
app.use('/user', userRouter)

app.listen(PORT, () => {
    console.log(`Server is listening at PORT: ${PORT}`)
})