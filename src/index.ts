import { io, server } from './server'
import { moveMouse, mouseClick, keyTap } from './robot'
import activeWin, { getWindowInfo } from './activeWin'

activeWin.on('change', (win) => {
  delete win.id
  io.emit('window_change', win)
})


io.on('connection', (socket) => {
  // console.log('a user connected');
  getWindowInfo().then(win => {
    delete win.id
    io.emit('window_change', win)
  })

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

})

server.listen(3000, () => {
  console.log('listening on *:3000')
})
