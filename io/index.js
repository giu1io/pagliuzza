import http from 'http'
import socketIO from 'socket.io'
import { v4 as uuidv4 } from 'uuid'
import { add } from 'date-fns'

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
    const rooms = {}

    /*
      Garbage Collector
    */
    setInterval(() => {
      const toBeRemoved = Object.keys(rooms).filter(k => rooms[k].expires_at < new Date())
      toBeRemoved.forEach(k => delete rooms[k])
    }, 60 * 1000)

    /*
      On Socket Connection
    */
    io.on('connection', (socket) => {
      socket.on('get-room', function (roomId, fn) {
        if (!rooms[roomId]) {
          rooms[roomId] = getRoom(roomId)
        }

        const { picked, straws } = rooms[roomId]

        socket.join(roomId)

        fn({
          picked,
          straws: straws.map(({ color, id }) => ({ color, id }))
        })
      })

      socket.on('subscribe', function (roomId) {
        if (!rooms[roomId]) {
          return
        }

        socket.join(roomId)
      })

      socket.on('pick', function ({ strawId, roomId, name, userId }, fn) {
        if (!rooms[roomId]) {
          return fn(false)
        }

        const { straws, picked } = rooms[roomId]

        const strawIndex = straws.findIndex(s => s.id === strawId)
        if (strawIndex === -1) {
          return fn(false)
        }

        const straw = straws[strawIndex]
        straw.name = name
        straw.userId = userId
        straws.splice(strawIndex, 1)
        picked.push(straw)

        rooms[roomId].expires_at = getExpiration()
        rooms[roomId].picked = picked.sort((a, b) => a.length > b.length ? 1 : -1)

        socket.to(roomId).emit('picked', straw)

        fn(straw)
      })
    })
  })
}

function getRoom (name) {
  function getColor () {
    return 'hsl(' + 360 * Math.random() + ',' +
               (25 + 70 * Math.random()) + '%,' +
               (85 + 10 * Math.random()) + '%)'
  }

  const extracted = []
  function between (min, max) {
    return Math.floor(
      Math.random() * (max - min) + min
    )
  }

  function getRand () {
    const n = between(0, 100)
    if (extracted.includes(n)) {
      return getRand()
    }

    extracted.push(n)
    return n
  }

  function getParticipant () {
    const length = getRand()
    return {
      color: getColor(), length, id: uuidv4()
    }
  }

  const straws = []

  for (let i = 0; i < 50; i++) {
    straws.push(getParticipant())
  }

  return {
    name,
    straws,
    expires_at: getExpiration(),
    picked: []
  }
}

function getExpiration () {
  return add(new Date(), { minutes: 60 })
}
