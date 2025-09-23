import { MedicationModel } from "../models/medicationModel.js";

export const MedicationController = {
  async getAll(req, res) {
    try {
      const { name, page, limit } = req.query;
      const filters = { name, page, limit };
      
      const result = await MedicationModel.getAll(filters);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const med = await MedicationModel.getById(id);
      res.json(med);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  },

  async create(req, res) {
    try {
      const med = await MedicationModel.create(req.body);
      res.status(201).json(med);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const med = await MedicationModel.update(id, req.body);
      res.json(med);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async remove(req, res) {
    try {
      const { id } = req.params;
      await MedicationModel.remove(id);
      res.json({ message: "Deleted successfully" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};