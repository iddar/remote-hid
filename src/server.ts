import express from 'express'
import http from 'http'
import MakeSocket from 'socket.io'
import cors from 'cors'

export const app = express()
export const server = http.createServer(app)
export const io = MakeSocket(server)

const appDir = process.env.PWD

app.use(cors())
app.use('/_assets', express.static(appDir + '/client/dist/_assets'))

app.get('/', (req, res) => {
  res.sendFile(appDir + '/client/dist/index.html')
})
