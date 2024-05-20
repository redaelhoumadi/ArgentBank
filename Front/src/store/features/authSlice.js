import { createSlice } from "@reduxjs/toolkit"; // Importe la fonction createSlice de Redux Toolkit pour créer un "slice" de Redux
import Cookies from "js-cookie"; // Importe la bibliothèque js-cookie pour manipuler les cookies dans le navigateur

// Fonction utilitaire pour récupérer le token d'accès à partir des cookies
const getAccessToken = () => Cookies.get("access_token") || "";

// État initial du slice d'authentification
const initialState = {
  access_token: getAccessToken(), // Récupère le token d'accès à partir des cookies
  isAuthenticated: !!getAccessToken(), // Indique si l'utilisateur est authentifié en vérifiant si un token d'accès est présent
};

// Crée un slice de Redux nommé "authSlice" à l'aide de createSlice
const authSlice = createSlice({
  name: "auth", // Nom du slice
  initialState, // État initial
  reducers: {
    // Reducer pour définir les informations d'identification de l'utilisateur
    setCredentials: (state, action) => {
      const { access_token } = action.payload; // Extrait le token d'accès de l'action
      state.access_token = access_token; // Met à jour le token d'accès dans l'état
      state.isAuthenticated = true; // Indique que l'utilisateur est authentifié
      Cookies.set("access_token", access_token); // Enregistre le token d'accès dans les cookies
    },

    // Reducer pour effacer les informations d'identification de l'utilisateur
    clearCredentials: (state) => {
      state.access_token = ""; // Efface le token d'accès de l'état
      state.isAuthenticated = false; // Indique que l'utilisateur n'est pas authentifié
      Cookies.remove("access_token"); // Supprime le token d'accès des cookies
    },
  },
});

// Exporte les actions (reducers) générées automatiquement par createSlice
export const { setCredentials, clearCredentials } = authSlice.actions;

// Exporte le reducer généré automatiquement par createSlice
export default authSlice.reducer;
