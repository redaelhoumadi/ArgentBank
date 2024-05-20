import { useEffect, useState } from "react"; // Importation de useEffect et useState depuis React pour gérer les effets et l'état local
import PropTypes from "prop-types"; // Importation de PropTypes pour la validation des props
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog"; // Importation des composants de la boîte de dialogue
import TextInput from "@/components/ui/TextInput"; // Importation du composant TextInput pour les champs de formulaire
import { editProfileShcema } from "@/lib/validation"; // Importation du schéma de validation pour l'édition du profil
import { useForm } from "react-hook-form"; // Importation de useForm pour gérer les formulaires
import { zodResolver } from "@hookform/resolvers/zod"; // Importation de zodResolver pour utiliser le schéma de validation Zod avec react-hook-form
import { toast } from "react-toastify"; // Importation de toast pour afficher des notifications
import PulseLoader from "react-spinners/PulseLoader"; // Importation du loader pour indiquer le chargement
import { useGetCurrentUserQuery, useUpdateProfileMutation} from "@/store/services/authApiSlice"; // Importation des requêtes pour obtenir et mettre à jour le profil utilisateur

const EditProfile = ({ children }) => {
  // Récupération des données de l'utilisateur actuel
  const { data: user } = useGetCurrentUserQuery(null);

  // Configuration du hook useForm avec le schéma de validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(editProfileShcema),
  });

  // Initialisation du formulaire avec les données de l'utilisateur
  useEffect(() => {
    if (user) {
      reset({
        firstName: user.body.firstName || "",
        lastName: user.body.lastName || "",
      });
    }
  }, [user, reset]);

  // Gestion de l'état de la boîte de dialogue
  const [open, setOpen] = useState(false);

  // Mutation pour mettre à jour le profil utilisateur
  const [updateProfile, { isLoading, isSuccess }] = useUpdateProfileMutation();

  // Soumission du formulaire
  const onSubmit = async (data) => {
    try {
      await updateProfile(data).unwrap(); // Appel de la mutation pour mettre à jour le profil utilisateur
    } catch (err) {
      toast.error(err.data?.message || err.error); // Affichage d'une notification en cas d'erreur
    }
  };

  // Effet pour afficher une notification de succès et fermer la boîte de dialogue après la mise à jour du profil
  useEffect(() => {
    if (isSuccess) {
      toast.success("Profile updated successfully");
      setOpen(false);
    }
  }, [isSuccess, reset]);

  return (
    <Dialog open={open} onOpenChange={setOpen}> 
      <DialogTrigger>{children}</DialogTrigger> 
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit name</DialogTitle> {/* Titre de la boîte de dialogue */}
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}> {/* Formulaire pour l'édition du profil */}
          <div className="space-y-3">
            <TextInput
              register={register}
              error={errors.firstName}
              type="text"
              name="firstName"
              label="First name"
            /> {/* Champ de saisie pour le prénom */}
            <TextInput
              register={register}
              error={errors.lastName}
              type="text"
              name="lastName"
              label="Last name"
            /> {/* Champ de saisie pour le nom de famille */}
          </div>
          <DialogFooter className="mt-4"> 
            <button className="edit-button" disabled={isLoading}>
              {isLoading ? <PulseLoader color="#ffffff" /> : "Save changes"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

EditProfile.propTypes = {
  children: PropTypes.node.isRequired, 
};

export default EditProfile; 