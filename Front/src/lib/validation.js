import { z } from "zod";  // Importation de la bibliothèque zod pour la validation des schémas

// Définition du schéma de validation pour la connexion
export const signInShcema = z.object({
  email: z
    .string()  // Le champ email doit être une chaîne de caractères
    .trim()  // Supprime les espaces en début et fin de chaîne
    .toLowerCase()  // Convertit la chaîne en minuscules
    .min(1, { message: "Email address is required" })  // Doit avoir au moins 1 caractère (non vide)
    .email({ message: "Must be a valid email" }),  // Doit être un email valide
  password: z
    .string()  // Le champ password doit être une chaîne de caractères
    .trim()  // Supprime les espaces en début et fin de chaîne
    .min(8, { message: "Password must be at least 8 characters." }),  // Doit avoir au moins 8 caractères
});

// Définition du schéma de validation pour l'édition de profil
export const editProfileShcema = z.object({
  firstName: z
    .string()  // Le champ firstName doit être une chaîne de caractères
    .trim()  // Supprime les espaces en début et fin de chaîne
    .min(2, { message: "First name is required" }),  // Doit avoir au moins 2 caractères
  lastName: z
    .string()  // Le champ lastName doit être une chaîne de caractères
    .trim()  // Supprime les espaces en début et fin de chaîne
    .min(2, { message: "Last name is required" }),  // Doit avoir au moins 2 caractères
});

// Définition du schéma de validation pour l'édition de transaction
export const editTransactionShcema = z.object({
  transactionType: z
    .string()  // Le champ transactionType doit être une chaîne de caractères
    .trim()  // Supprime les espaces en début et fin de chaîne
    .min(2, { message: "Transaction type is required" }),  // Doit avoir au moins 2 caractères
  category: z
    .string()  // Le champ category doit être une chaîne de caractères
    .trim()  // Supprime les espaces en début et fin de chaîne
    .min(2, { message: "Category is required" }),  // Doit avoir au moins 2 caractères
  notes: z
    .string()  // Le champ notes doit être une chaîne de caractères
    .trim()  // Supprime les espaces en début et fin de chaîne
    .min(2, { message: "Notes is required" }),  // Doit avoir au moins 2 caractères
});
