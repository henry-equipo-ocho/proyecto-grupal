import { Router } from "express";
import { signInController, signInGoogleCallBackController, signInGoogleController, signInGoogleFailureController } from "../controllers/signin.controller";


//
import verifyEmail from '../middlewares/verification';

const router: Router = Router();

router.post('/', verifyEmail, signInController);

router.get('/google', signInGoogleController);

router.get('/google/failure', signInGoogleFailureController);

router.get('/google/callback', signInGoogleCallBackController);

export default router;