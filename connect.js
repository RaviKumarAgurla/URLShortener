var mongoose = require('mongoose')

function connect(connectionString) {
    return mongoose.connect(connectionString)
}

module.exports = connect
