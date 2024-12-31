import { Router } from "express";
import { postRegistration } from "../controllers/registration.controllers.js";

const router = Router()

router.post('/api/register', postRegistration)

export default router