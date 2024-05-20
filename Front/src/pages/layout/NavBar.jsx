import { useEffect } from "react";  // Importation du hook useEffect pour les effets de bord
import { Link } from "react-router-dom";  // Importation de Link pour la navigation
import { logo } from "../../utils/assets";  // Importation du logo de l'application
import { useGetCurrentUserQuery } from "@/store/services/authApiSlice";  // Importation de la requête pour obtenir l'utilisateur actuel
import { useDispatch, useSelector } from "react-redux";  // Importation de useDispatch et useSelector pour interagir avec le store Redux
import { clearCredentials } from "@/store/features/authSlice";  // Importation de l'action clearCredentials pour la déconnexion

const NavBar = () => {
  const dispatch = useDispatch();  // Initialisation de useDispatch pour dispatcher les actions
  const { access_token, isAuthenticated } = useSelector((state) => state.auth);  // Sélection des états auth depuis le store Redux

  // Utilisation de la requête pour obtenir les données de l'utilisateur actuel
  const { data: user, refetch } = useGetCurrentUserQuery(null);

  // Effet pour refetch les données de l'utilisateur lorsque access_token change
  useEffect(() => {
    if (access_token) {
      refetch();  // Refetch des données utilisateur si le token d'accès change
    }
  }, [access_token, refetch]);

  // Fonction de gestion de la déconnexion
  const handleLogout = () => {
    dispatch(clearCredentials());  // Dispatch de l'action pour effacer les informations d'authentification
  };

  return (
    <header>
      <nav className="main-nav">  
        <Link className="main-nav-logo" to="/">  
          <img
            className="main-nav-logo-image"
            src={logo}  
            alt="Argent Bank Logo"  
          />
          <h1 className="sr-only">Argent Bank</h1> 
        </Link>
        {isAuthenticated ? (  // Vérification de l'authentification de l'utilisateur
          <div>
            <Link className="main-nav-item" to="/profile">  {/* Lien vers le profil utilisateur */}
              {user?.body.firstName}  {/* Affichage du prénom de l'utilisateur */}
            </Link>
            <button onClick={handleLogout} className="main-nav-item font-bold">  {/* Bouton de déconnexion */}
              Sign Out
            </button>
          </div>

        ) : (  // Si l'utilisateur n'est pas authentifié
          <Link className="main-nav-item" to="/login">  {/* Lien vers la page de connexion */}
            <i className="fa fa-sign-out"></i>  {/* Icône de connexion */}
            Sign In
          </Link>
        )}
      </nav>
    </header>
  );
};

export default NavBar;  // Exportation du composant NavBar pour utilisation dans d'autres parties de l'application
