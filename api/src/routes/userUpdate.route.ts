import { Router } from "express";
import passport from 'passport';
import { getUserCurrentInfoController, passwordUpdateController, userUpdateController } from '../controllers/userUpdate.controller';

const router: Router = Router();

router.get('/', passport.authenticate('jwt', { session: false }), getUserCurrentInfoController);
router.post('/', passport.authenticate('jwt', { session: false }), userUpdateController);
router.post('/password/', passport.authenticate('jwt', { session: false }), passwordUpdateController)

export default router;