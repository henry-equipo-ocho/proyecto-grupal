import { Router } from "express";
import passport from "passport";
import { roleVerify, getBusinesActivities, postBusinesActivities, updateBusinessActivities, deleteBusinessActivity } from "../controllers/bussines.controller";

const router: Router = Router();

// User 
router.get('/activities', passport.authenticate('jwt', {session: false}), roleVerify, getBusinesActivities);
router.post('/activities', passport.authenticate('jwt', {session: false}), roleVerify, postBusinesActivities);
router.put('/activities', passport.authenticate('jwt', {session: false}), roleVerify, updateBusinessActivities);
router.delete('/activities', passport.authenticate('jwt', {session: false}), roleVerify, deleteBusinessActivity);


export default router;