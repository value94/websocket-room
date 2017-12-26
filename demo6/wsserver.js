var app = require('http').createServer()
var io = require('socket.io')(app)

var PORT = 3333

var clientCount = 0;//声明聊天室人数

app.listen(PORT)//监听端口

//服务端处理
io.on('connection', function (socket) {
    clientCount++
    socket.nickname = "user" + clientCount
    io.emit('enter', socket.nickname + ' comes in')

    socket.on('message',function (str) {
        io.emit('message', socket.nickname + ' says:  ' + str)
    })

    socket.on('disconnect',function () {
        io.emit('leave', socket.nickname + ' left')
    })
})

console.log("websocket server listening on port "+ PORT)
