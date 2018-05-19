module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(socket.id, 'has made a persisent connection!')
    socket.on('update-requests', () => {
      socket.broadcast.emit('update-requests')
    });
    socket.on('update-users', () => {
      socket.broadcast.emit('update-users')
    })
    socket.on('send-notification', (name) => {
      socket.broadcast.emit('send-notification')
    })
  });
}
