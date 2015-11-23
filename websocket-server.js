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

    socket.on('disconnect', function() {
      console.log('user disconnected!');
    });

    socket.on('change-event-status', function(data) {
      io.emit('change-event-status', data);
    });
  });

  return io;
};

module.exports = initWebsocketServer;
