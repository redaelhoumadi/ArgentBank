import { clsx } from "clsx";  // Importation de la bibliothèque clsx pour gérer les classes conditionnelles
import { twMerge } from "tailwind-merge";  // Importation de la bibliothèque tailwind-merge pour fusionner les classes Tailwind CSS

// Définition de la fonction cn qui combine et optimise les classes CSS
export function cn(...inputs) {
  // Utilisation de clsx pour gérer les classes conditionnelles et les transformer en une chaîne de caractères
  // Ensuite, utilisation de twMerge pour fusionner les classes Tailwind CSS et gérer les conflits
  return twMerge(clsx(inputs));
}
