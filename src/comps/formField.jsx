const FormField = ({
  label,
  value,
  onChange,
  isInvalid = false,
  errorMessage = "",
  type = "text",
  placeholder = "",
  isDisabled = false,
}) => {
  return (
    <div className="mb-3">
      <label className="form-label required">{label}</label>
      {type === "textarea" ? (
        <textarea
          className={`form-control ${isInvalid ? "is-invalid" : ""}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      ) : (
        <input
          type={type}
          className={`form-control ${isInvalid ? "is-invalid" : ""}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={isDisabled}
        />
      )}
      {isInvalid && errorMessage && (
        <div className="invalid-feedback mt-2">{errorMessage}</div>
      )}
    </div>
  );
};

export default FormField;
