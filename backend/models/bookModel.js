import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
  {
    titre: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishYear: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Exporter correctement le modèle
export const Book = mongoose.model("Book", bookSchema);
