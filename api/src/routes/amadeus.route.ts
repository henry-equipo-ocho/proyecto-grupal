import { Router } from "express";
import { amadeusController } from "../controllers/amadeus.controller";

const router = Router();

router.get('/', amadeusController);

export default router;