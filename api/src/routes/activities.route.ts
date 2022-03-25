import { Router } from "express";
import { apiActivitiesController, getActivitiesController } from "../controllers/activities.controller";

const router: Router = Router();

router.post('/', getActivitiesController);
router.post('/amadeus', apiActivitiesController);

export default router;