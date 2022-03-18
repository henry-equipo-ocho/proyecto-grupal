import { Router } from "express";
import { signInController, signInGoogleCallBackController, signInGoogleController, signInGoogleFailureController } from "../controllers/signin.controller";
import passport from "passport";

const router = Router();

router.post('/', signInController);

router.get('/google', signInGoogleController);

router.get('/google/failure', signInGoogleFailureController);

router.get('/google/callback', signInGoogleCallBackController);

export default router;