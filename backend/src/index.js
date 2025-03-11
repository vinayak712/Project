import express from 'express'
import dotenv from 'dotenv'
import { ConnectDb } from './lib/db.js';
import cookieParser from 'cookie-parser';
import authRouter from'./routes/auth.route.js'
const app = express();
app.use(express.json());
dotenv.config();
// app.use(cookieParser()); 
const port = process.env.PORT;

// this tell that any HTTP requests to paths that start with /api/auth will hadle by  router in authRouter   it means any request start with /api/auth handle only by authRoutes

app.use('/api/auth',authRouter)
app.listen(port, () => {
    console.log(` Server Running on ${port}`);
    ConnectDb();
    
})