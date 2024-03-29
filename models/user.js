var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'NORMAL'
    }
}, {timestamps: true})

var User = mongoose.model('user', userSchema)

module.exports = User