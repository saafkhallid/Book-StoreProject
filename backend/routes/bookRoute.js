import express from "express";
import {
  getallBook,
  getoneBook,
  deleteBook,
  createBook,
  updateBook
} from "../controllers/bookController.js";



const router = express.Router();
// ✅ Route pour sauvegarder un nouveau livre
router.post("/", createBook);

// ✅ Route pour récupérer tous les livres
router.get("/", getallBook);

// ✅ Route pour récupérer un livres
router.get("/:id", getoneBook);
// ✅ Route pour modifier un livres
router.put("/:id", updateBook);
// ✅ Route pour supprimer un livres
router.delete("/:id", deleteBook);

export default router;
