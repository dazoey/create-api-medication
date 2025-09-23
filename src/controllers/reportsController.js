import { MedicationModel } from "../models/medicationModel.js";

export const ReportsController = {
  async getTotalMedications(req, res) {
    try {
      const total = await MedicationModel.getTotalCount();
      res.json({ 
        total: total,
        message: "jumlah total obat berhasil diambil" 
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};