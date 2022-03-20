const express = require('express');
const {
    process_params
} = require('express/lib/router');
const router = express.Router();
const Tx = require('../../models/tx');
const axios = require('axios')

router.route('/tx/:utxo')
    .get(async (req, res) => {
        const txhash = req.params.utxo
        console.log("ID from param", id)
        const http = await axios.get("https://api.polygonscan.com/api", {
            params: {
                module: "proxy",
                action: "eth_getTransactionByHash",
                txhash,
                apikey: process.env.POLYGON_SCANNER_API
            }
        })
        console.log(http.data)
        //Pull TX
        res.json({
            status: true,
            response: http.data
        })
    })
module.exports = router;