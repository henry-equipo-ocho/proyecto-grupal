import { Router } from "express";
import { signUpController } from "../controllers/signup.controller";

const router = Router();

router.post('/', signUpController);

export default router;