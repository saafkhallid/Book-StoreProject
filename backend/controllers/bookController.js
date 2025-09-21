import { Book } from "../models/bookModel.js";

// ✅ Route pour sauvegarder un nouveau livre
export const createBook = async (request, response) => {
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
};

// ✅ Route pour récupérer tous les livres
export const getallBook = async (request, response) => {
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
};

// ✅ Route pour récupérer un livres
export const getoneBook = async (request, response) => {
  try {
    const { id } = request.params;
    const book = await Book.findById(id);
    return response.status(200).json(book);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ success: false, message: error.message });
  }
};
// ✅ Route pour modifier un livres
export const updateBook = async (request, response) => {
  try {
    const { titre, author, publishYear } = request.body;

    if (!titre || !author || !publishYear) {
      return response.status(400).json({
        success: false,
        message: "Tous les champs sont requis: titre, author, publishYear",
      });
    }

    const { id } = request.params;
    const result = await Book.findByIdAndUpdate(id, request.body, {
      new: true,
    });

    if (!result) {
      return response.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    return response.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: result,
    });
  } catch (error) {
    console.error(error.message);
    return response.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ✅ Route pour supprimer un livres
export const deleteBook = async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return response.status(404).json({
        success: false,
        message: "Book not found",
      });
    }
    return response.status(200).json({
      success: true,
      message: "Book delete successfully",
      data: result,
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// export default { getallBook, getoneBook, deleteBook, createBook, updateBook };
