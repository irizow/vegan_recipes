import { json, Router } from "express";
import { postLogin } from "../controllers/login.controllers.js";
import {rateLimit} from 'express-rate-limit'

const router = Router();

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: { message:'Too many request login for this IP address, try again in 15 minutes'},
    standardHeaders: true,
    legacyHeaders: false
})

router.post('/api/login', loginLimiter, postLogin);

export default router;