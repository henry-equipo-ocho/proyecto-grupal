import { Router } from "express";
import { rmSync } from "fs";
import { signUpController } from "../controllers/signup.controller";
import { verifyEmail } from '../controllers/verifyemail.controller';


const router: Router = Router();

router.post('/', signUpController);
router.get('/verify-email', verifyEmail);

export default router;