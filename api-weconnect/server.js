require('dotenv').config()
const path = require('path');
const http = require('http');
const express = require('express');
const mongoose = require("mongoose");
const {
    mint_message,
    deploy_contract
} = require("./starton");


// const socketio = require('socket.io'); 
const PORT = 3005 || process.env.PORT;

// const io = socketio(server);
const Sockets = require("./socket")

const app = express();
app.use(function (req, res) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3005');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
});

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
    const address = await deploy_contract(); //"0x6CBE446cBA77aAB5F823233B9128aD620eEc8A7A" 
    console.log('address', address);
    global.contrat = address;
    const server = new Server(address).listen()
}
init()