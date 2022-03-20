const fs = require('fs')
//import fetch from 'node-fetch'
const axios = require("axios")

const http = axios.create({
	baseURL: "https://api.starton.io/v2",
	headers: {
		"x-api-key": process.env.STARTON_KEY,
		//"x-api-key": 'sGSD0ISljm98G1IKvXq7A27aAVRNspnJ',
	},
})

const bytecode = fs.readFileSync('./bytecode.txt', {
	encoding: 'utf-8',
	flag: 'r'
});
const abi = require('./abi.json');

const deploy_contract = async () => {

	const response = await http.post('/smart-contract/from-bytecode', {
		"network": "polygon-mumbai",
		"name": "WeConnect",
		"description": "Blockchain certified chat application.",
		"signerWallet": process.env.WALLET_STARTON,
		"params": [ // parameter values for the smart contract constructors, this will change depending of your contract
			`0x930AC6Cfa1357e1E11577eF5C7523AC498f970ca`,
			`0x930AC6Cfa1357e1E11577eF5C7523AC498f970ca`,
			//`${user1}`,
			// `${user2}`,
		],
		"abi": abi,
		// Paste here the abi you copied to clipboard
		"bytecode": bytecode,
		// Paste here the bytecode you copied to clipboard
		"compilerVersion": "string"
	})

	// console.log("Try deploy :", response.data.smartContract.address)
	// console.log(response.data)
	return response.data.smartContract.address
	// }).then(response => {
	// 	console.log("Try deploy :", response.data.smartContract.address)
	// 	return response.data.smartContract.address
	// }).catch(e => {
	// 	console.log("Failed", e)
	// 	return ("Error " + e)
	// })
}
const mint_message = async (receiverAddress, msg, SMART_CONTRACT_ADDRESS) => {
	console.log("Minting...", receiverAddress, msg)
	const SMART_CONTRACT_NETWORK = "polygon-mumbai";
	// const SMART_CONTRACT_ADDRESS = ;
	const WALLET_IMPORTED_ON_STARTON = process.env.WALLET_STARTON;
	const nft = await http.post(`/smart-contract/${SMART_CONTRACT_NETWORK}/${SMART_CONTRACT_ADDRESS}/call`, {
		functionName: "safeMintMessage",
		signerWallet: WALLET_IMPORTED_ON_STARTON,
		speed: "low",
		params: [receiverAddress, msg],
	});
	// console.log("NFT Starton ", nft.data)

	return nft.data;
}

module.exports = {
	deploy_contract,
	mint_message
}