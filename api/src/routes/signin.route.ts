import { Router } from "express";
import { signInController } from "../controllers/signin.controller";

const router = Router();

router.post('/', signInController);

export default router;