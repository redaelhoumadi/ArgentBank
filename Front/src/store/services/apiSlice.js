// Importation de BASE_URL à partir de la configuration
import { BASE_URL } from "@/config";

// Importation des fonctions nécessaires de Redux Toolkit Query
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Importation de la bibliothèque js-cookie pour gérer les cookies
import Cookies from "js-cookie";

// Fonction pour obtenir le jeton d'accès à partir des cookies
const getAccessToken = () => Cookies.get("access_token") || "";

// Configuration de la baseQuery avec fetchBaseQuery
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,  // URL de base pour toutes les requêtes
  prepareHeaders: (headers) => {
    // Obtention du jeton d'accès
    const access_token = getAccessToken();

    // Si un jeton d'accès est présent, l'ajouter aux en-têtes
    if (access_token) {
      headers.set("Authorization", `Bearer ${access_token}`);
    }
    // Définir le type de contenu à JSON pour toutes les requêtes
    headers.set("Content-Type", "application/json");
    return headers;  // Retourner les en-têtes modifiés
  },
});

// Création de l'apiSlice avec createApi de Redux Toolkit Query
export const apiSlice = createApi({
  baseQuery,  // Utiliser baseQuery comme configuration de base
  endpoints: () => ({}),  // Initialiser avec des endpoints vides, à compléter plus tard
});
