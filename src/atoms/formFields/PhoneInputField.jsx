import { useState } from 'react';
import PhoneInput from 'react-phone-input-2';

const PhoneInputField = ({ divClassName = '', label, name, value, handlePhoneChange, phoneError, country = 'in', placeholder, disabled, required }) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div className={`${divClassName} bg-transparent `}>
      <label className="block text-sm font-medium text-primary">
        {label} {required && <span className="text-danger text-lg">*</span>}
      </label>
      <PhoneInput
        country={country}
        name={name}
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(value, countryData) => handlePhoneChange(value, countryData)}
        className={`w-full ${isFocused && 'border-secondary'} mt-2 rounded-xl border bg-main ${
          phoneError ? 'border-danger focus:border-danger' : ' border-primary focus:border-secondary'
        } font-normal focus:outline-none focus:ring-0 px-4 py-2.5 focus:border  placeholder:text-gray-400 text-dark bg-transparent`}
        placeholder={placeholder}
        disabled={disabled}
      />
      {phoneError && <p className="text-danger text-sm mt-1">{phoneError}</p>}
    </div>
  );
};

export default PhoneInputField;
