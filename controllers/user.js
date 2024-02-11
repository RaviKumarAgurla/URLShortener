var nanoid = require('nanoid/non-secure')
var User = require('../models/user')
var {setUser} = require('../service/auth')
const { v4: uuidv4 } = require('uuid');

async function handleSignUpUser(req, res) {
    var body = req.body;
    var uuid = uuidv4()
    if(!body || !body.password || !body.name || !body.email) return res.status(400).send('Please submit required fields')
    var result = await User.create({
        name: body.name,
        email: body.email,
        password: body.password
    })

    return res.redirect('/')

}

async function handleLoginUser(req, res) {
    var body = req.body;
    if(!body || !body.password || !body.email) return res.status(400).send('Please submit required fields')
    var user = await User.findOne({
        email: body.email,
        password: body.password
    })
    if(!user) return res.status(404).json('check username and password')
    var sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie("uuid", sessionId);
    res.redirect('/')
}


module.exports = {
    handleSignUpUser,
    handleLoginUser
}
