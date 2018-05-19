module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(socket.id, 'has made a persisent connection!')
    socket.on('get-request', (request) => {
      socket.broadcast.emit('get-request', request)
    });
    socket.on('remove-request', (request) => {
      socket.broadcast.emit('remove-request', request)
    })
  })
}
