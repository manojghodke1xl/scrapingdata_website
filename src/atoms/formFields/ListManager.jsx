import { useState } from 'react';
import FormField from './InputField';
import { MdDeleteForever } from 'react-icons/md';

const ListManager = ({ label, state, setState, keyName, errorKey, errors, setErrors, placeholder, type = 'text' }) => {
  const [inputValue, setInputValue] = useState('');

  console.log(state);

  const removeItemAtIndex = (indexToRemove) => {
    setState((prev) => ({ ...prev, [keyName]: prev[keyName].filter((_, index) => index !== indexToRemove) }));
  };

  const validateAndAddInput = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setState((prev) => ({ ...prev, [keyName]: [...(prev[keyName] || []), inputValue.trim()] }));
      setInputValue('');
      setErrors((prev) => ({ ...prev, [errorKey]: '' }));
    } else setErrors((prev) => ({ ...prev, [errorKey]: `Please enter a valid ${label.toLowerCase()}.` }));
  };

  return (
    <div>
      <FormField
        label={label}
        type={type}
        id={keyName}
        name={keyName}
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => {
          if (errors[errorKey]) setErrors((prev) => ({ ...prev, [errorKey]: '' }));
          setInputValue(e.target.value);
        }}
        errorMessage={errors[errorKey]}
      />

      <button type="button" className="px-4 py-2 text-white font-medium bg-primary hover:bg-primary-hover rounded-xl whitespace-nowrap mt-5" onClick={validateAndAddInput}>
        Add {label}
      </button>

      {state[keyName]?.length > 0 && (
        <ul className="space-y-2 my-5">
          {state[keyName].map((item, index) => (
            <li key={index} className="flex justify-between items-center p-2 bg-inherit border border-primary text-primary shadow rounded-xl">
              {item}
              <MdDeleteForever size={20} className="text-failed cursor-pointer" onClick={() => removeItemAtIndex(index)} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListManager;
