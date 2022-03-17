import { Router } from "express";
import { signUp } from "../controllers/signup.controller";

const router = Router();

router.post('/', signUp);

export default router;