import PropTypes from "prop-types";

const TextInput = ({ type, placeholder, name, label, register, error }) => {
  return (
    <div className="flex flex-col items-start gap-1">
      <label className="text-sm text-dark font-semibold" htmlFor={String(name)}>
        {label}
      </label>
      <input
        {...register(name)}
        type={type}
        id={String(name)}
        placeholder={placeholder}
        className={`p-3 outline-[#00bc77] text-dark/80 font-normal border w-full text-sm hover:border-brand duration-200 ease-in ${
          error ? "border-red-500" : "border-[#919191]"
        }`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

TextInput.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
};

export default TextInput;
