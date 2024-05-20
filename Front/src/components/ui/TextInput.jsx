import PropTypes from "prop-types";  // Importation de PropTypes pour la validation des props

// Définition du composant fonctionnel TextInput avec des destructurations des props
const TextInput = ({ type, placeholder, name, label, register, error }) => {
  return (
    <div className="flex flex-col items-start gap-1">
      {/* Label pour le champ de saisie */}
      <label className="text-sm text-dark font-semibold" htmlFor={String(name)}>
         {label}  {/*// Texte du label */}
      </label>
      {/* Champ de saisie */}
      <input
        {...register(name)}  // Intégration de la méthode register pour la gestion des formulaires
        type={type}  // Type de l'input (text, password, etc.)
        id={String(name)}  // ID de l'input, utile pour lier le label
        placeholder={placeholder}  // Placeholder pour l'input
        className={`p-3 outline-[#00bc77] text-dark/80 font-normal border w-full text-sm hover:border-brand duration-200 ease-in ${
          error ? "border-red-500" : "border-[#919191]"  // Classe conditionnelle pour afficher la bordure rouge en cas d'erreur
        }`}
      />
      {/* Message d'erreur */}
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

// Validation des props avec PropTypes
TextInput.propTypes = {
  type: PropTypes.string.isRequired,  // type est obligatoire et doit être une chaîne de caractères
  placeholder: PropTypes.string,  // placeholder est facultatif et doit être une chaîne de caractères
  name: PropTypes.string.isRequired,  // name est obligatoire et doit être une chaîne de caractères
  label: PropTypes.string.isRequired,  // label est obligatoire et doit être une chaîne de caractères
  register: PropTypes.func.isRequired,  // register est obligatoire et doit être une fonction
  error: PropTypes.shape({  // error est facultatif et doit être un objet avec une propriété message de type chaîne de caractères
    message: PropTypes.string,
  }),
};

export default TextInput;
