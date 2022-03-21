import { Router } from "express";
import { amadeusController } from "../controllers/activities.controller";

const router = Router();

router.get('/', amadeusController);

export default router;