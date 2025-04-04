import express from 'express'
import { Login, Signup, Logout, Update,CheckAuth } from '../controllers/auth.controller.js';
import Protect from '../middleware/auth.protect.js';
const router = express.Router();
router.post('/signup', Signup)
router.post('/login',Login )
router.post('/LogOut', Logout)
router.put('/update-profile', Protect, Update);
router.get('/check', Protect, CheckAuth);
export default router;