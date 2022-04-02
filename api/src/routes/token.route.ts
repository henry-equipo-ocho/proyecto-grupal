import { Router } from "express";
import passport from "passport";
import { handleRefreshToken, clearRefreshToken, protectedRoute } from "../controllers/refreshToken.controller";

const router: Router = Router();

router.get('/', handleRefreshToken);
router.get('/clear', clearRefreshToken);
router.post('/protected', passport.authenticate('jwt', {session: false}), protectedRoute);

export default router;