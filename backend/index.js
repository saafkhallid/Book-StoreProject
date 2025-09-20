import express from "express";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import { PORT, mongoDBURL } from "./config.js";

const app = express();

// Middleware pour parser le JSON
app.use(express.json());

// ✅ Route pour sauvegarder un nouveau livre
app.post("/books", async (request, response) => {
  try {
    const { titre, author, publishYear } = request.body;

    // Vérification des champs obligatoires
    if (!titre || !author || !publishYear) {
      return response.status(400).json({
        success: false,
        message: "Tous les champs sont requis: titre, author, publishYear",
      });
    }

    // Création du livre
    const newBook = await Book.create({ titre, author, publishYear });

    return response.status(201).json({
      success: true,
      data: newBook,
    });
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ success: false, message: error.message });
  }
});

// ✅ Route pour récupérer tous les livres
app.get("/books", async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(200).json({
      success: true,
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ success: false, message: error.message });
  }
});

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
