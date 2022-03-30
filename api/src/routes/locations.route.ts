import { Router } from "express";
import { getAllCitiesController, getAllCountriesController, saveCityController, saveCountryController } from "../controllers/location.controller";

const router: Router = Router();

router.get('/cities', getAllCitiesController);
router.get('/countries', getAllCountriesController);
router.post('/save/city', saveCityController);
router.post('/save/country', saveCountryController);

export default router;