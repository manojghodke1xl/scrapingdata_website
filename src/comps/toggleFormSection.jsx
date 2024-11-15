const ToggleFormSection = ({ label, toggleState, onToggle, children }) => {
  return (
    <div className="mb-3">
      <label className="row">
        <span className="col form-label">{label}</span>
        <span className="col-auto">
          <label className="form-check form-check-single form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              checked={toggleState}
              onChange={onToggle}
            />
          </label>
        </span>
      </label>
      {toggleState && <>{children}</>}
    </div>
  );
};

export default ToggleFormSection;
