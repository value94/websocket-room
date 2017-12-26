var ws = require("nodejs-websocket")
var PORT = 3333
var clientCount = 0;

// Scream server example: "hi" -> "HI!!!"
var server = ws.createServer(function (conn) {
    console.log("New connection")
    clientCount++
    conn.nickname = 'user' + clientCount
    //消息通知
    var mes = {}//声明消息对象
    mes.type = 'enter'
    mes.data = conn.nickname + ' come in'
    broadcast(JSON.stringify(mes))//发送消息给客户端

    //接收客户端发送的消息,并响应
    conn.on("text", function (str) {
        console.log("Received "+str)
        var mes = {}//声明消息对象
        mes.type = 'message'
        mes.data = conn.nickname + ' says: ' + str
        broadcast(JSON.stringify(mes))//发送消息给客户端
    })
    conn.on("close", function (code, reason) {
        console.log("Connection closed")
        var mes = {}//声明消息对象
        mes.type = 'leave'
        mes.data = conn.nickname + ' leave'
        broadcast(JSON.stringify(mes))//发送消息给客户端
    })
    conn.on("error",function (err) {
        console.log("handle err")
        console.log(err)
    })
}).listen(PORT)

console.log("websocket server listening on port "+ PORT)

function broadcast(str) {
    server.connections.forEach(function (value) {
        value.sendText(str);
    })
    
}