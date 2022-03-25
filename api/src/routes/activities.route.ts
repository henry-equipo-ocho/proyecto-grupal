import { Router } from "express";
import { apiActivitiesController, getActivitiesController } from "../controllers/activities.controller";
import {getOrderedCities} from '../controllers/orderbycity.controller';
import {getOrderedPrice}  from '../controllers/orderbyprice.controller';

const router: Router = Router();

router.post('/', getActivitiesController);
router.post('/amadeus', apiActivitiesController);
router.post('/orderByCity', getOrderedCities);
router.post('/orderByPrice', getOrderedPrice);

export default router;