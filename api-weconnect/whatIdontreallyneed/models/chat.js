const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Chat = Schema({
    content: {type: String},
})

module.exports = mongoose.model('Chat', Chat)