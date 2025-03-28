import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import path from'path'
import { ConnectDb } from './lib/db.js';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.route.js'
import msgRouter from './routes/msg.route.js'
import{app,server,io} from'./lib/socket.js'

const __dirname = path.resolve();
app.use(express.json({limit:"10mb"}));
dotenv.config();
app.use(cookieParser()); 
app.use(cors({
    origin: ["http://localhost:5173",  "https://chat-app-teab.onrender.com" ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials:true
}))
const port = process.env.PORT || 7000;

// this tell that any HTTP requests to paths that start with /api/auth will hadle by  router in authRouter   it means any request start with /api/auth handle only by authRoutes

app.use('/api/auth', authRouter)
app.use('/api/message', msgRouter)

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    })

}
server.listen(port, () => {
    console.log(` Server Running on ${port}`);
    ConnectDb();
    
})