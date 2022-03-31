import { Router } from "express";
import passport from 'passport';
import { createOrder, captureOrder } from "../controllers/payment.controller";

const router: Router = Router();

router.post('/create', passport.authenticate('jwt', { session: false }), createOrder);
router.get('/capture', passport.authenticate('jwt', { session: false }), captureOrder);
// TODO: how to keep user's session after leaving to PayPal (redirect to front?)

export default router;