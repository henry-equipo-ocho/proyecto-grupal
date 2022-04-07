import { Router } from "express";
import passport from 'passport';
import { addUserActivitiesController, deleteUserActivitiesController, getUserActivitiesController } from "../controllers/userFavorites.controller";

const router: Router = Router();

router.get('/', passport.authenticate('jwt', { session: false }), getUserActivitiesController);
router.post('/', passport.authenticate('jwt', { session: false }), addUserActivitiesController);
router.delete('/', passport.authenticate('jwt', { session: false }), deleteUserActivitiesController);

export default router;