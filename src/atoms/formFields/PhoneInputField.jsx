import PhoneInput from 'react-phone-input-2';

const PhoneInputField = ({ divClassName = '', label, name, value, handlePhoneChange, phoneError, country = 'in', placeholder, disabled }) => {
  return (
    <div className={`${divClassName} mb-6`}>
      <label className="block text-sm font-medium text-primary">{label}</label>
      <PhoneInput
        country={country}
        name={name}
        value={value}
        onChange={(value, countryData) => handlePhoneChange(value, countryData)}
        className={`w-full mt-2 rounded-xl border bg-white ${
          phoneError ? 'border-fadered focus:border-fadered' : ' border-primary focus:border-secondary'
        } font-normal focus:outline-none focus:ring-0 px-4 py-2.5 focus:border  placeholder:text-gray-400 text-dark bg-transparent`}
        placeholder={placeholder}
        disabled={disabled}
      />
      {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}
    </div>
  );
};

export default PhoneInputField;
