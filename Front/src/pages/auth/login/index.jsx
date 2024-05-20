import { useEffect } from "react";  // Importation du hook useEffect pour les effets de bord
import { FaUserCircle } from "react-icons/fa";  // Importation de l'icône d'utilisateur depuis react-icons
import { zodResolver } from "@hookform/resolvers/zod";  // Importation du resolver Zod pour react-hook-form
import { useForm } from "react-hook-form";  // Importation de useForm pour la gestion des formulaires
import { useDispatch } from "react-redux";  // Importation de useDispatch pour dispatcher les actions Redux
import TextInput from "@/components/ui/TextInput";  // Importation du composant TextInput personnalisé
import { signInShcema } from "@/lib/validation";  // Importation du schéma de validation Zod pour le formulaire de connexion
import { useLoginMutation } from "@/store/services/authApiSlice";  // Importation de la mutation de connexion depuis le slice authApi
import { setCredentials } from "@/store/features/authSlice";  // Importation de l'action setCredentials pour mettre à jour les informations d'authentification
import { toast } from "react-toastify";  // Importation de toast pour afficher des notifications
import { useNavigate } from "react-router-dom";  // Importation de useNavigate pour la navigation programmatique
import PulseLoader from "react-spinners/PulseLoader";  // Importation du loader pour afficher un indicateur de chargement

const Index = () => {
  const navigate = useNavigate();  // Initialisation de useNavigate pour la navigation
  const dispatch = useDispatch();  // Initialisation de useDispatch pour dispatcher les actions Redux

  // Initialisation de react-hook-form avec le schéma de validation Zod
  const {
    register,  // Fonction pour enregistrer les champs de formulaire
    handleSubmit,  // Fonction pour gérer la soumission du formulaire
    formState: { errors },  // Objet contenant les erreurs de validation
    reset,  // Fonction pour réinitialiser le formulaire
  } = useForm({
    resolver: zodResolver(signInShcema),  // Utilisation de Zod pour la validation
  });

  // Mutation de connexion avec les états de chargement et de succès
  const [login, { isLoading, isSuccess }] = useLoginMutation();

  // Fonction de soumission du formulaire
  const onSubmit = async (data) => {
    try {
      const res = await login(data).unwrap();  // Exécution de la mutation de connexion et déballage de la réponse
      dispatch(setCredentials({ access_token: res.body.token }));  // Mise à jour des informations d'authentification dans le store Redux
    } catch (err) {
      toast.error(err.data?.message || err.error);  // Affichage d'une notification d'erreur en cas d'échec
    }
  };

  // Effet pour réinitialiser le formulaire et naviguer vers la page d'accueil en cas de succès de la connexion
  useEffect(() => {
    if (isSuccess) {
      reset();  // Réinitialisation du formulaire
      navigate("/");  // Navigation vers la page d'accueil
    }
  }, [isSuccess, reset, navigate]);

  return (
    <main className="main bg-dark">  {/* Conteneur principal avec une classe pour le style */}
      <section className="sign-in-content">  {/* Section du formulaire de connexion */}
        <div className="sign-in-head">  {/* En-tête du formulaire de connexion */}
          <FaUserCircle className="user-icon" />  {/* Icône d'utilisateur */}
          <h1>Sign In</h1>  {/* Titre */}
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>  {/* Formulaire avec gestion de la soumission */}
          <div className="mb-6 space-y-3">  {/* Conteneur des champs de formulaire avec un espacement vertical */}
            <TextInput
              register={register}  // Enregistrement du champ avec react-hook-form
              error={errors.email}  // Gestion des erreurs pour le champ email
              type="text"
              name="email"
              label="Email"
            />
            <TextInput
              register={register}  // Enregistrement du champ avec react-hook-form
              error={errors.password}  // Gestion des erreurs pour le champ password
              type="password"
              name="password"
              label="Password"
            />
          </div>
          <button className="sign-in-button" disabled={isLoading}>  {/* Bouton de soumission avec gestion de l'état de chargement */}
            {isLoading ? <PulseLoader color="#ffffff" /> : "Sign In"}  {/* Affichage du loader ou du texte en fonction de l'état de chargement */}
          </button>
        </form>
      </section>
    </main>
  );
};

export default Index; 
