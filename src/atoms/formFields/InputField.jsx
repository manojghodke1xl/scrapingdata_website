import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const FormField = ({ divClassName, label, type = 'text', name, id, placeholder, showPasswordToggle = false, disabled, errorMessage = '', onChange, value, preview = false }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`${divClassName} w-full`}>
      <label htmlFor={id} className="block text-sm font-medium text-primary">
        {label}
      </label>
      <div className="relative flex justify-center items-center">
        <input
          type={showPasswordToggle && showPassword ? 'text' : type}
          id={id}
          onChange={onChange}
          onWheel={(e) => e.target.blur()}
          value={value}
          name={name}
          placeholder={placeholder}
          className={`w-full mt-2 rounded-xl border bg-white ${
            errorMessage ? 'border-fadered focus:border-fadered' : ' border-primary focus:border-blue'
          } font-normal focus:outline-none focus:ring-0 px-4 py-2.5 focus:border  placeholder:text-gray-400 text-dark bg-transparent`}
          disabled={disabled}
        />
        {showPasswordToggle && (
          <button
            type="button"
            className="absolute right-3 mt-1 top-1/2 transform -translate-y-1/2 text-secondary hover:text-primary transition-colors"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </button>
        )}
      </div>
      {errorMessage && <p className="text-red-500 mt-1 text-sm">{errorMessage}</p>}
      {preview && (
        <p className="text-secondary mt-1 text-sm">
          <span className="text-primary font-semibold">Ticket preview:</span> {preview}
        </p>
      )}
    </div>
  );
};

export default FormField;
