import express from 'express'
import dotenv from 'dotenv'
import cors from'cors'
import { ConnectDb } from './lib/db.js';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.route.js'
import msgRouter from './routes/msg.route.js'
import{app,server,io} from'./lib/socket.js'

app.use(express.json({limit:"10mb"}));
dotenv.config();
app.use(cookieParser()); 
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials:true
}))
const port = process.env.PORT;

// this tell that any HTTP requests to paths that start with /api/auth will hadle by  router in authRouter   it means any request start with /api/auth handle only by authRoutes

app.use('/api/auth', authRouter)
app.use('/api/message',msgRouter)
server.listen(port, () => {
    console.log(` Server Running on ${port}`);
    ConnectDb();
    
})