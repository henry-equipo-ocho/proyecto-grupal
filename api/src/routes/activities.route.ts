import { Router } from "express";
import { getActivitiesController } from "../controllers/activities.controller";

const router: Router = Router();

router.get('/', getActivitiesController);
// router.get('/cities', saveCitiesController);

export default router;