const PORT = process.env.PORT || 3000;
const io = require('socket.io')(PORT);

// res.setHeader("Access-Control-Allow-Origin", "*");
// res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
const users = {};

io.on('connection', socket => {
    // console.log('Connection with ' + socket.id)
    socket.on('new-user-joined' , name => {
        users[socket.id] = name;
        socket.broadcast.emit('user-joined' , name)
        // console.log(users[socket.id])
    });

    socket.on('send' , message=>{
        socket.broadcast.emit('recieve' , {message:message , user: users[socket.id]})
    });

    socket.on('disconnect' , message =>{
        socket.broadcast.emit('left' , users[socket.id]);
        delete users[socket.id];
    });

});