import { Router } from "express";
import { postLogin } from "../controllers/login.controllers.js";

const router = Router();

router.post('/api/login', postLogin);

export default router;