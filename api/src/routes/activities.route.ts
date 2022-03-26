import { Router } from "express";
import { apiActivitiesController, getActivitiesController } from "../controllers/activities.controller";
import {getOrderedCities} from '../controllers/orderbycity.controller';
import {getOrderedPrice}  from '../controllers/orderbyprice.controller';
import {getMatchActivitiesController} from '../controllers/match.controller'

const router: Router = Router();

router.post('/', getActivitiesController);
router.post('/amadeus', apiActivitiesController);
router.post('/orderByCity', getOrderedCities);
router.post('/orderByPrice', getOrderedPrice);
router.get('/match/:word', getMatchActivitiesController);

export default router;