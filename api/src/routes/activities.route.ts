import { Router } from "express";
import { apiActivitiesController, getActivitiesController } from "../controllers/activities.controller";

const router: Router = Router();

router.get('/', getActivitiesController);
router.get('/amadeus', apiActivitiesController);

export default router;