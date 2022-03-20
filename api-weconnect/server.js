require('dotenv').config()
const path = require('path');
const http = require('http');
const express = require('express');
const mongoose = require("mongoose");
const {
    mint_message,
    deploy_contract
} = require("./straton");


// const socketio = require('socket.io'); 
const PORT = 3000 || process.env.PORT;

// const io = socketio(server);
const Sockets = require("./socket")

const app = express();

const index = require("./routes");
// const hash_msg = (msg) =>  //crypto.hash(msg)

class Server {
    constructor(address) {
        this.http = http.createServer(app);
        console.log("Hello", address)
        // const address = "0x607b568025a1eCF97b0b3Cce38201843E1bffBFe"
        this.sockets = new Sockets(this.http, address).listenToEvents()
    }

    listen() {
        this.http.listen(PORT)
        console.log(`Server running on port ${PORT}`)
    }
}
//app.use(express.static(path.join(__dirname, 'public') ));
app.use(index);

const init = async () => {
    const address = "0x6CBE446cBA77aAB5F823233B9128aD620eEc8A7A" //await deploy_contract();
    console.log('address', address)
    const server = new Server(address).listen()
}
init()