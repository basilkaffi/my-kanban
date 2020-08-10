require('dotenv').config()
const express = require('express')
const cors = require('cors')
const port = process.env.PORT
const app = express()
const router = require('./routes')
// const server = app.listen(port)
// const io = require("socket.io").listen(server)
// const http = require('http').createServer(app)
// const io = require("socket.io")(http)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(router)

const server = app.listen(port, () => {
    console.log(`listening to port ${port}`)
})
const io = require("socket.io").listen(server)

io.on('connection', socket => {
    console.log('connected')
    socket.on('updateChange', data => {
        io.emit('updateChange', data)
    })
    socket.on('disconnect', () => {
        console.log('user disconnected');
    })
})