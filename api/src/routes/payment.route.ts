import { Router } from "express";
import passport from 'passport';
import { captureOrder, createOrder } from "../controllers/payment.controller";

const router: Router = Router();

router.post('/create', passport.authenticate('jwt', { session: false }), createOrder);
router.get('/capture', passport.authenticate('jwt', { session: false }), captureOrder);

export default router;