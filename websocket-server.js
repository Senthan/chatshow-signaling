var utils = require('./lib/utils');

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

    socket.on('askQuestion', function(payload) {
      var message = payload.data.message;
      utils.checkPremiumUser(message.email, function(isPremium) {
        if (isPremium) io.to(message.sessionId).emit('newQuestion', payload);
      });
    });

    socket.on('disconnect', function() {
      console.log('user disconnected!');
    });
  });

  return io;
};

module.exports = initWebsocketServer;
