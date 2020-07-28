import express from 'express'
import http from 'http'
import MakeSocket from 'socket.io'
import cors from 'cors'

import { moveMouse, mouseClick, keyTap } from './robot'

const app = express()
const server = http.createServer(app)
const io = MakeSocket(server)

app.use(cors())

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

io.on('connection', (socket) => {
  // console.log('a user connected');

  socket.on('movemouse', (position) => {
    moveMouse(position)
  })

  socket.on('mouseClick', () => {
    mouseClick()
  })

  socket.on('keypress', (key) => {
    console.log('keypress', key)
    keyTap(key)
  })

});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
