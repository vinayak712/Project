import { Server } from 'socket.io'
import http from 'http'
import express from 'express'


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"]
    },
});

//  in this  we give userId of the user and it return the socketId of that user
export function getReciverSocketId(userId) {
    return userSocketMap[userId];
 }
// used to store online users
const userSocketMap={} //{userId,socketId}
io.on("connection", (socket) => {
    console.log('A  User connected', socket.id);
    const userId = socket.handshake.query.userId;
    if (userId) {
        userSocketMap[userId] = socket.id;
        //  io.emit() used to send events to all connected clients
        io.emit("getOnlineUsers",Object.keys(userSocketMap)) // we can place any thing as event name
    }
    
    socket.on('disconnect', () => {
        console.log( 'A User disconnected',socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers",Object.keys(userSocketMap)) 
    })
})

export {io,app,server}