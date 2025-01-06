const RadioField = ({ id, name, value, checked, onChange, label }) => {
  return (
    <div className="flex items-center space-x-2">
      <input type="radio" id={id} name={name} value={value} checked={checked} onChange={onChange} className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
      {label && (
        <label htmlFor={id} className="text-secondary font-normal">
          {label}
        </label>
      )}
    </div>
  );
};

export default RadioField;
