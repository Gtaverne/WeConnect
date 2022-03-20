const express = require('express');

const {
    process_params
} = require('express/lib/router');
const router = express.Router();
const Tx = require('../../models/tx');
const axios = require('axios')
const abiDecoder = require("abi-decoder");
const testABI = require('../../abi.json');
const { append } = require('express/lib/response');


router.route('/api/:hash')
    .get(async (req, res) => {
        const txhash = req.params.hash

        res.set('Access-Control-Allow-Origin', req.get('origin'))

        console.log(txhash);

        abiDecoder.addABI(testABI);

        const decodedData = abiDecoder.decodeMethod(txhash);
        // web3.eth.getTransactionReceipt("0x4d54db4e722ca622d9744b896b24756831080185085b121c9939423aea96ea76", function(e, receipt) {
        // const decodedLogs = abiDecoder.decodeLogs(receipt.logs);
        console.log("decoded", decodedData);
        // });

        //Pull TX
        res.json({
            status: true,
            response: decodedData.params
        })
    })
module.exports = router;