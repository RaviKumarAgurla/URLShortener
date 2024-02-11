var mongoose = require('mongoose')

var urlSchema = new mongoose.Schema({
    redirectURL: {
        type: String,
        required: true,
        unique: true
    },
    shortURL: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    accessHistory: [{timestamp: {type: String}}]
}, {timestamps: true})

var URL = mongoose.model('url', urlSchema)

module.exports = URL