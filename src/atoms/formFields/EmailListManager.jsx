import { useState } from 'react';
import FormField from './InputField';
import { MdDeleteForever } from 'react-icons/md';

const EmailListManager = ({ label, state, setState, keyName, errorKey, errors, setErrors }) => {
  const [emailInput, setEmailInput] = useState('');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const removeItemAtIndex = (indexToRemove) => {
    setState((prev) => ({ ...prev, [keyName]: prev[keyName].filter((_, index) => index !== indexToRemove) }));
  };

  const validateAndAddInput = (e) => {
    e.preventDefault();
    if (emailInput && emailRegex.test(emailInput)) {
      setState((prev) => ({ ...prev, [keyName]: [...(prev[keyName] || []), emailInput] }));
      setEmailInput('');
      setErrors((prev) => ({ ...prev, [errorKey]: '' }));
    } else {
      setErrors((prev) => ({ ...prev, [errorKey]: 'Please enter a valid email address.' }));
    }
  };

  return (
    <div>
      <FormField
        label={label}
        type="email"
        id={keyName}
        name={keyName}
        placeholder="Email ID"
        value={emailInput}
        onChange={(e) => {
          if (errors[errorKey]) setErrors((prev) => ({ ...prev, [errorKey]: '' }));
          setEmailInput(e.target.value);
        }}
        errorMessage={errors[errorKey]}
      />

      <button type="button" className="px-4 py-2 text-white font-medium bg-primary hover:bg-primary-hover rounded-xl whitespace-nowrap mt-5" onClick={validateAndAddInput}>
        Add Email
      </button>

      <ul className="space-y-2 my-5">
        {state[keyName]?.map((email, index) => (
          <li key={index} className="flex justify-between items-center p-2 bg-inherit border border-primary text-primary shadow rounded-xl">
            {email}
            <MdDeleteForever  size={20} className="text-failed cursor-pointer" onClick={() => removeItemAtIndex(index)} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmailListManager;
