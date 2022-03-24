import { Router } from "express";
import { apiActivitiesController, getActivitiesController } from "../controllers/activities.controller";
import {getOrderedCities} from '../controllers/orderbycity.controller'

const router: Router = Router();

router.post('/', getActivitiesController);
router.post('/amadeus', apiActivitiesController);
router.get('/orderByCity', getOrderedCities);

export default router;