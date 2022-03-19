
// const username = "WeConnect";
// const password = "Password";
// const cluster = "WeConnect";
// const dbname = "WeConnect";


//import crypto 



// mongoose.connect(
//     `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`, 
//     {
//       useNewUrlParser: true,
//       //useFindAndModify: false,
//       useUnifiedTopology: true
//     }
//   );

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error: "));
// db.once("open", function () {
//   console.log("Connected successfully");
// });

// io.on('connection', socket => {
//     console.log('New Websocket connection');
//     socket.emit('message', 'Welcome');
//     // socket.broadcast.emit('message', 'User join chat');
//     // socket.on('disconnect', () => {
//         // io.emit('message', 'Disconnected');
//     // });
// })

// io.on('receive', socket =>{
//     socket.emit('message', 'Welcome');
//     socket.broadcast.emit('message', 'User join chat');
//     socket.on('disconnect', () => {
//         io.emit('message', 'Disconnected');
//     });
// })

// io.on('send', socket =>{
//     socket.emit('message', 'Welcome');
//     socket.broadcast.emit('message', 'User join chat');
//     socket.on('disconnect', () => {
//         io.emit('message', 'Disconnected');
//     });
// })