import { Router } from "express";
import { createUserController, deleteActivityController, deleteUserController, getAllActivitiesController, getAllUsersController, roleVerify, tokenVerifyController, userUpdateController, activityUpdateController, createActivityController } from "../controllers/admin.controller";
import passport from "passport";

const router: Router = Router();

router.post('/token', tokenVerifyController);

// User
router.put('/update/user', passport.authenticate('jwt', {session: false}), roleVerify, userUpdateController);
router.post('/create/user', passport.authenticate('jwt', {session: false}), roleVerify, createUserController);
router.delete('/delete/user', passport.authenticate('jwt', {session: false}), roleVerify, deleteUserController);
router.get('/users', passport.authenticate('jwt', {session: false}), roleVerify, getAllUsersController);

// Activity
router.put('/update/activity', passport.authenticate('jwt', {session: false}), roleVerify, activityUpdateController);
router.post('/create/activity', passport.authenticate('jwt', {session: false}), roleVerify, createActivityController);
router.delete('/delete/activity', passport.authenticate('jwt', {session: false}), roleVerify, deleteActivityController);
router.get('/activities', passport.authenticate('jwt', {session: false}), roleVerify, getAllActivitiesController);

export default router;