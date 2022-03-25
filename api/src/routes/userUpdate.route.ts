import { Router } from "express";
import { userUpdateController, passwordUpdateController } from '../controllers/userUpdate.controller';
import passport from 'passport';

const router: Router = Router();

router.post('/', passport.authenticate('jwt', { session: false }), userUpdateController);
router.post('/password/', passport.authenticate('jwt', { session: false }), passwordUpdateController)

export default router;