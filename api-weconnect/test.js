const io = require('socket.io-client')

const socket = io("http://localhost:3000")

socket.on("connect_error", () => {
    // revert to classic upgrade
    socket.io.opts.transports = ["polling", "websocket"];
});


socket.on("connect", () => {
    console.log("Socket established to server")
    //action
    socket.emit("message", "hello world", "0x930AC6Cfa1357e1E11577eF5C7523AC498f970ca", "0x0a3BC00b276beD4848556bd45BbEa62C94B9079E")
});

socket.on("response", async (msg) => {
    console.log(msg)
})

// socket.on("response", async function() {

// })