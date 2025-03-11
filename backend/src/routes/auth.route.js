import express from 'express'
import { Login, Signup,Logout } from '../controllers/auth.controller.js';
const router = express.Router();
router.post('/signup', Signup)
router.post('/login',Login )
router.post('/LogOut',Logout )
export default router;