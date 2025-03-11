import express from 'express'
import {GetUserOnSideBar, GetMsg,SendMsg} from '../controllers/msg.controller.js';
import Protect from '../middleware/auth.protect.js';
const router = express.Router();
router.get('/users', Protect, GetUserOnSideBar);
router.get('/:id', Protect, GetMsg);
router.post('/send/:id', Protect, SendMsg);
export default router;