import PropTypes from "prop-types";  // Importation de PropTypes pour la validation des props
import { Navigate } from "react-router-dom";  // Importation de Navigate depuis react-router-dom pour la navigation conditionnelle
import { useSelector } from "react-redux";  // Importation de useSelector depuis react-redux pour accéder à l'état global

// Définition du composant AuthGuard qui protège des routes en fonction de l'authentification
const AuthGuard = ({ children }) => {
  // Utilisation de useSelector pour accéder à l'état d'authentification depuis le store Redux
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Si l'utilisateur n'est pas authentifié, redirige vers la page d'accueil
  if (!isAuthenticated) {
    return <Navigate to="/" replace />; 
  }

  // Si l'utilisateur est authentifié, rend les enfants du composant
  return <>{children}</>;
};

// Validation des props avec PropTypes
AuthGuard.propTypes = {
  children: PropTypes.node.isRequired,  // children est obligatoire et doit être un nœud React (élément ou texte)
};

export default AuthGuard;
