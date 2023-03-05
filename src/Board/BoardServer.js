const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const sockjs = require("sockjs");

// SocketJS 서버 설정
const sockjs_opts = {
    sockjs_url: "http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js",
};
const chat = sockjs.createServer(sockjs_opts);

chat.on("connection", (conn) => {
    console.log("connected");

    conn.on("data", (message) => {
        const parsedMessage = JSON.parse(message);
        console.log(parsedMessage);
        // 클라이언트로부터 받은 메시지를 다른 클라이언트들에게 전송
        io.emit("chat message", parsedMessage);

    });

    conn.on("close", () => {
        console.log("disconnected");
    });
});

// Socket.IO 서버 설정
io.on("connection", (socket) => {
    console.log("a user connected");

    // 클라이언트로부터 메시지를 받으면, 다른 클라이언트들에게 전송
    socket.on("chat message", (msg) => {
        io.emit("chat message", msg);
    });

    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});

// express 서버 시작
const port = 3001;
http.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// sockjs 서버 시작
const chat_port = 3000;
chat.installHandlers(http, { prefix: "/chat" });
chat.listen(chat_port, () => {
    console.log(`SockJS chat server is running on port ${chat_port}`);
});