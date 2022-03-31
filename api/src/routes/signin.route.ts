import { Router } from "express";
import { signInController, signInSocialFailureController, signInSocialCallBackController } from "../controllers/signin.controller";
import passport from 'passport';


//
import verifyEmail from '../middlewares/verification';

const router: Router = Router();

router.post('/', verifyEmail, signInController);

// Google sign in

router.get('/google', passport.authenticate('google', {scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'], session: false }));

router.get('/google/failure', signInSocialFailureController);

router.get('/google/callback', passport.authenticate('google', {failureRedirect: '/signin/google/failure'}), signInSocialCallBackController);

// Facebook sign in

router.get('/facebook', passport.authenticate('facebook', {scope: ['email', 'public_profile'], session: false }));

router.get('/facebook/failure', signInSocialFailureController);

router.get('/facebook/callback', passport.authenticate('facebook', {failureRedirect: '/signin/facebook/failure'}), signInSocialCallBackController);

export default router;