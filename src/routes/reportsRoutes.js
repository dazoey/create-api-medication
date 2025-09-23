import express from "express";
import { ReportsController } from "../controllers/reportsController.js";

const router = express.Router();

router.get("/total", ReportsController.getTotalMedications);

export default router;