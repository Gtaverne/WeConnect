const socketIO = require("socket.io");
const abiDecoder = require('abi-decoder');
const testABI = require('./abi.json');

// var crypto = require('crypto');
// var hash = crypto.createHash('sha256');

const {
	sha256
} = require("./sha256")
// async function sha256(message) {
// 	// encode as UTF-8
// 	const msgBuffer = new TextEncoder('utf-8').encode(message);

// 	// hash the message
// 	const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

// 	// convert ArrayBuffer to Array
// 	const hashArray = Array.from(new Uint8Array(hashBuffer));

// 	// convert bytes to hex string
// 	const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
// 	console.log(hashHex);
// 	return hashHex;
//   }

const Guard = require("./auth");
const {
	mint_message,
	deploy_contract
} = require("./starton");
const {
	start
} = require("repl");

class Sockets {
	constructor(http, address) {
		this.io = socketIO(http, {
			pingTimeout: 60000
		}); //socket io stream gobal
		this.security = new Guard()
		this.all_sockets = []

		this.address = address
	}

	listenToEvents() {


		//Listen to new socket
		this.io.sockets.on('connection', (socket) => { // on first connect of new socket id
			//On disconnect Update firewall State
			//Firewall drop DoS:DDoS
			socket.on("disconnect", () => {
				console.log("Au revoir")
			})
			if (this.security.runCheck(socket)) {
				this.all_sockets[socket.id] = {
					socket
				}
				////////////////////////////////////////////////

				this.io.local.emit("start", "start");


				//Start Auth
				console.log("socket obj", socket.id)

				//Start listening event
				console.log("New user successfully auth")
				socket.on("test", () => console.log("user speaking ", socket.id))

				socket.on("message", async (arg, sender, receiver, id) => {

					//Hash
					var code = arg
					code = sha256(code)
					var receiverAddress = receiver
					var senderAddress = sender
					// var receiverAddress = await userAdress(0)
					// var senderAddress = sender
					console.log(receiver)
					console.log(sender)
					console.log(code, arg)
					//Mint 
					socket.broadcast.emit("response", arg, id); // world

					const mint_response = await mint_message(senderAddress, receiverAddress, code)
					//console.log("hash:" + mint_response.transactionHash)
					//Emit

					this.io.local.emit("blockchained", id, mint_response.transactionHash); // world

				});

				socket.on("pub_key", (arg) => {
					socket.broadcast.emit("key", arg); // world
				});

				//socket.on("decode", (arg) => {

				//	};
			}
		});
	}
}
module.exports = Sockets;