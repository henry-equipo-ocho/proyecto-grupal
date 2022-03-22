import { Router } from "express";
import passport from "passport";
import { signedController } from "../controllers/signed.controller";

const router: Router = Router();

router.get('/', passport.authenticate('jwt', { session: false }), signedController);

export default router;