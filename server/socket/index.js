module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(socket.id, 'has made a persisent connection!')
    socket.on('update-requests', () => {
      socket.broadcast.emit('update-requests')
    });
    socket.on('update-users', () => {
      socket.broadcast.emit('update-users')
    });
    socket.on('notify-accepted', (name) => {
      socket.broadcast.emit('notify-accepted', name)
    });
    socket.on('notify-request', (name) => {
      socket.broadcast.emit('notify-request', name)
    });
  });
}
