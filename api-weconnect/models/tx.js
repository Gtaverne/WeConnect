const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Tx = Schema({
    utxo: {
        type: String
    },
    address: {
        type: String
    },
})

module.exports = mongoose.model('Tx', Tx)