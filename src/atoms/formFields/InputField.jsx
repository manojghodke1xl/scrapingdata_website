import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const FormField = ({
  divClassName,
  label,
  type = 'text',
  name,
  id,
  placeholder,
  min,
  max,
  showPasswordToggle = false,
  disabled,
  errorMessage = '',
  onChange,
  value,
  previewLabel,
  preview = false,
  required
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`${divClassName} w-full`}>
      <label htmlFor={id} className="block text-sm  font-medium text-primary">
        {label} {required && <span className="text-danger text-lg">*</span>}
      </label>
      <div className="relative flex justify-center items-center">
        <input
          type={showPasswordToggle && showPassword ? 'text' : type}
          id={id}
          onChange={onChange}
          onWheel={(e) => e.target.blur()}
          value={value}
          name={name}
          max={max}
          min={min}
          placeholder={placeholder}
          className={`w-full mt-2 rounded-xl border bg-inherit ${
            errorMessage ? 'border-danger focus:border-fadered' : ' border-primary focus:border-secondary'
          } font-normal focus:outline-none focus:ring-0 px-4 py-2.5 focus:border placeholder:opacity-50 placeholder:text-secondary text-dark bg-transparent ${
            showPasswordToggle ? 'pr-12' : ''
          }`}
          disabled={disabled}
        />

        {showPasswordToggle && (
          <button
            type="button"
            className="absolute right-3 mt-1 top-1/2 transform -translate-y-1/2 text-secondary hover:text-primary transition-colors"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEye className="text-secondary text-xl" /> : <FaEyeSlash className="text-secondary text-xl" />}
          </button>
        )}
      </div>
      {errorMessage && <p className="text-danger mt-1 text-sm">{errorMessage}</p>}
      {preview && (
        <p className="text-secondary mt-1 text-sm">
          <span className="text-primary font-semibold">{previewLabel}:</span> {preview}
        </p>
      )}
    </div>
  );
};

export default FormField;
