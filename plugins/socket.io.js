import io from 'socket.io-client'

const socket = io(process.server ? 'http://localhost:3000' : null)

export default socket
