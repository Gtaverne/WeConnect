const io = require('socket.io-client')

const socket = io("http://localhost:3000")

socket.on("connect_error", () => {
    // revert to classic upgrade
    socket.io.opts.transports = ["polling", "websocket"];
});


socket.on("connect", () => {
    console.log("Socket established to server")
    //action
    socket.emit("message", {
        message: "hello world",
        address: "0x8111558D25E134ABCF4B792e11e22f03c08ec891"
    })
});

socket.on("response", async (msg) => {
    console.log(msg)
})

// socket.on("response", async function() {

// })