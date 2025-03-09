import express from 'express'
const router = express.Router();
import { Login, Signup,Logout } from '../controllers/auth.controller.js';
router.post('/signup', Signup)
router.get('/login',Login )
router.post('/LogOut',Logout )
export default router;