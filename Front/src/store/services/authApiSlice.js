import { apiSlice } from "./apiSlice";

// Définition de l'URL de base pour les utilisateurs
const USER_URL = "/user";

// Amélioration de l'apiSlice en ajoutant un type de tag "user"
const apiSliceWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["user"],  // Ajout du tag "user" pour le cache et la gestion des données
});

// Définition et exportation des endpoints pour les opérations d'authentification
export const authApiSlice = apiSliceWithTag.injectEndpoints({
  endpoints: (builder) => ({

    // Endpoint pour la mutation de connexion
    login: builder.mutation({
      query: (data) => {
        return {
          url: `${USER_URL}/login`,  // URL pour la requête de connexion
          method: "POST",  // Méthode HTTP POST
          body: data,  // Corps de la requête contenant les données de connexion
        };
      },
    }),

    // Endpoint pour la requête de l'utilisateur actuel
    getCurrentUser: builder.query({
      query: () => {
        return {
          url: `${USER_URL}/profile`,  // URL pour récupérer le profil de l'utilisateur actuel
          method: "POST",  // Méthode HTTP POST
          body: {},  // Corps vide
        };
      },
      providesTags: ["user"],  // Tag "user" fourni pour la gestion du cache
    }),
    
    // Endpoint pour la mutation de mise à jour du profil
    updateProfile: builder.mutation({
      query: (data) => {
        return {
          url: `${USER_URL}/profile`,  // URL pour mettre à jour le profil de l'utilisateur
          method: "PUT",  // Méthode HTTP PUT
          body: data,  // Corps de la requête contenant les données de mise à jour
        };
      },
      invalidatesTags: ["user"],  // Invalidation du tag "user" pour rafraîchir les données mises en cache
    }),
  }),
});

// Exportation des hooks générés pour utiliser les mutations et requêtes dans les composants
export const {
  useLoginMutation,  // Hook pour la mutation de connexion
  useGetCurrentUserQuery,  // Hook pour la requête de l'utilisateur actuel
  useUpdateProfileMutation,  // Hook pour la mutation de mise à jour du profil
} = authApiSlice;
