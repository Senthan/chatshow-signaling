var initWebsocketServer = function(httpServer) {
  var io = require('socket.io').listen(httpServer);

  io.sockets.on('connection', function(socket) {
    console.log('user connected!');
    socket.on('joinRoom', function(room) {
      console.log('user joined room', room);
      socket.join(room);
    });

    socket.on('mySnapshot', function(data) {
      io.to(data.sessionId).emit('userSnapshot', data);
    });

    socket.on('updateEvent', function(data) {
      io.sockets.emit('updateEvent', data);
    });

    socket.on('disconnect', function() {
      console.log('user disconnected!');
    });
  });

  return io;
};

module.exports = initWebsocketServer;
