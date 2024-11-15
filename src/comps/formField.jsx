const FormField = ({ label, value, onChange, type = "text" }) => {
  const labelClass = "form-label required";

  return (
    <div className="mb-3">
      <label className={labelClass}>{label}</label>
      {type === "textarea" ? (
        <textarea
          className="form-control"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          type={type}
          className="form-control"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
};

export default FormField;
