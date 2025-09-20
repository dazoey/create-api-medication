import { Router } from "express";
import { MedicationController } from "../controllers/medicationController.js";

const router = Router();

router.get("/total", MedicationController.getTotalMedications);

export default router;
