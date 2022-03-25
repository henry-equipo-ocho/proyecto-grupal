import { Router } from "express";
import { getUserActivitiesController, addUserActivitiesController, deleteUserActivitiesController } from "../controllers/userFavorites.controller";

const router: Router = Router();

router.get('/', getUserActivitiesController);
router.post('/', addUserActivitiesController);
router.delete('/', deleteUserActivitiesController);

export default router;