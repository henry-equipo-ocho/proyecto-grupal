import { Router } from "express";
import { amadeusController } from "../controllers/activities.controller";

const router: Router = Router();

router.get('/', amadeusController);

export default router;