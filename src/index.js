import express from "express";
import dotenv from "dotenv";
import medicationRoutes from "./routes/medicationRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import supplierRoutes from "./routes/supplierRoutes.js";
import reportsRoutes from "./routes/reportsRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ 
    message: "Pharmacy API is running!", 
    version: "1.0.0",
    endpoints: {
      suppliers: "/api/suppliers",
      categories: "/api/categories", 
      medications: "/api/medications",
      reports: "/api/reports"
    }
  });
});

app.use("/api/suppliers", supplierRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/medications", medicationRoutes);
app.use("/api/reports", reportsRoutes);

app.use((req, res) => {
  res.status(404).json({
    error: "Endpoint tidak ditemukan",
    message: "endpoint yang anda cari tidak tersedia"
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: "Internal Server Error",
    message: "Something went wrong on our end"
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server rberjalan di port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;