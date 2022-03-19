const path = require('path');
const http = require('http');
const express = require('express');
const mongoose = require("mongoose");
// const Router = require("./routes");
// const socketio = require('socket.io'); 
const PORT = 3000 || process.env.PORT;

const app = express(); 
// const io = socketio(server);
const Sockets = require("./socket")

// const hash_msg = (msg) =>  //crypto.hash(msg)

class Server {
    constructor() {
        this.http = http.createServer(app);
        
        this.sockets = new Sockets(this.http).listenToEvents()
    }

    listen() {
        this.http.listen(PORT)
        console.log(`Server running on port ${PORT}`)
    }
}
//app.use(express.static(path.join(__dirname, 'public') ));
// app.use(app.use(Router));

new Server().listen()

 
