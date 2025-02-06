import { useState, useEffect } from 'react';

const TextareaComponent = ({
  divClassName = '',
  label,
  id,
  name,
  value = '',
  placeholder = '',
  maxLength = 500,
  minLength = 10,
  rows = 3,
  cols = 50,
  required = false,
  disabled = false,
  readOnly = false,
  autoFocus = false,
  wrap = 'soft',
  spellCheck = true,
  onChange,
  errorMessage = '',
  hint = '',
  showCharCount = false
}) => {
  const [charCount, setCharCount] = useState(value.length);

  useEffect(() => {
    setCharCount(value.length);
  }, [value]);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setCharCount(newValue.length);
    onChange && onChange(event);
  };

  return (
    <div className={`${divClassName} w-full`}>
      <label htmlFor={id} className="block text-sm font-medium text-primary">
        {label}
      </label>
      <div className="relative">
        <textarea
          id={id}
          name={name}
          value={value}
          rows={rows}
          cols={cols}
          placeholder={placeholder}
          maxLength={showCharCount && maxLength}
          minLength={minLength}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          autoFocus={autoFocus}
          wrap={wrap}
          spellCheck={spellCheck}
          onChange={handleChange}
          className={`w-full mt-2 rounded-xl border ${
            errorMessage ? 'border-fadered focus:border-fadered' : 'border-primary focus:border-blue'
          } font-normal focus:outline-none focus:ring-0 px-4 py-2.5 placeholder:text-gray-400 text-dark bg-transparent`}
        />
      </div>
      <div className="w-full flex flex-col-reverse md:flex-row gap-4 justify-between">
        {showCharCount && (
          <span className="font-normal text-primary">
            {charCount}/{maxLength}
          </span>
        )}
        <p className="mt-1 text-primary text-sm">{hint}</p>
      </div>
      {errorMessage && <p className="text-red-500 mt-1 text-sm">{errorMessage}</p>}
    </div>
  );
};

export default TextareaComponent;
