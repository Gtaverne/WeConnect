const socketIO = require("socket.io");
const Guard = require("./auth")
class Sockets {
	constructor(http) {
		this.io = socketIO(http, { pingTimeout: 60000}); //socket io stream gobal
		this.security = new Guard()
		this.all_sockets = []
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
				//Start Auth
				console.log("socket obj", socket.id)
				this.all_sockets[socket.id] = {socket}

				
				//Start listening event
				console.log("New user successfully auth")
				socket.on("test", () => console.log("user speaking ", socket.id))
			}
		});
	}
}
module.exports = Sockets;
