import { Router } from "express";
import { signInController, signInGoogleCallBackController, signInGoogleController, signInGoogleFailureController } from "../controllers/signin.controller";
import passport from 'passport';

const router: Router = Router();

router.post('/', signInController);

router.get('/google', passport.authenticate('google', {scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'], session: false }));

router.get('/google/failure', signInGoogleFailureController);

router.get('/google/callback', passport.authenticate('google', {failureRedirect: '/signin/google/failure'}), signInGoogleCallBackController);

export default router;