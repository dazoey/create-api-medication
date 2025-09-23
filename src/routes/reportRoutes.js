import express from "express";
import { MedicationController } from "../controllers/medicationController.js";

const router = express.Router();

router.get("/total", MedicationController.getTotal);

export default router;
