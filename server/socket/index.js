module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(socket.id, 'has made a persisent connection!')
    socket.on('update-requests', () => {
      socket.broadcast.emit('update-requests')
    });
  });
}
