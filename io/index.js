import http from 'http'
import socketIO from 'socket.io'

export default function () {
  this.nuxt.hook('render:before', (renderer) => {
    const server = http.createServer(this.nuxt.renderer.app)
    const io = socketIO(server)

    // overwrite nuxt.server.listen()
    this.nuxt.server.listen = (port, host) => {
      return new Promise(resolve => server.listen(port || 3000, host || '0.0.0.0', resolve))
    }
    // close this server on 'close' event
    this.nuxt.hook('close', () => new Promise(server.close))

    // Add socket.io events
    const messages = []

    io.on('connection', (socket) => {
      socket.on('last-messages', function (fn) {
        fn(messages.slice(-50))
      })
      socket.on('send-message', function (message) {
        messages.push(message)
        socket.broadcast.emit('new-message', message)
      })
    })
  })
}
