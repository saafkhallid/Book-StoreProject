import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { PORT, mongoDBURL } from "./config.js";
import booksRoute from "./routes/bookRoute.js";

const app = express();

// Middleware pour parser le JSON
app.use(express.json());
app.use(cors());
app.use("/books", booksRoute);

// Connexion à MongoDB
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Database connection error:", error);
  });
