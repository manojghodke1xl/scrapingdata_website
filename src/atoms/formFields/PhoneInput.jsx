import { useState, useRef, useEffect } from 'react';
import phoneData from '../../utils/phoneInput.json';
import { useColor } from '../../contexts/contexts/ColorContext';
import SearchComponent from '../common/SearchComponent';

const PhoneInput = ({ phoneDataState, handlePhoneDataChange, label, id, divClassName, name, errorMessage, required }) => {
  const { isDarkMode } = useColor();
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedCountryData, setSelectedCountryData] = useState(null);

  const flagDivRef = useRef(null);
  const dropdownRef = useRef(null);

  const combinedPhoneData = phoneData.map((phoneCountry) => ({
    ...phoneCountry,
    flag: null
  }));

  const filteredCountries = combinedPhoneData.filter(
    (country) => country.name.toLowerCase().includes(searchTerm.toLowerCase()) || country.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Set the default country based on existing phone data
  useEffect(() => {
    if (!selectedCountryData) {
      let detectedCountry = null;

      if (phoneDataState?.phoneNumber && phoneDataState?.dialingCode) {
        detectedCountry = phoneData.find((country) => country.dialingCode === phoneDataState.dialingCode);
      }

      if (!detectedCountry) {
        detectedCountry = phoneData.find((country) => country.code === 'IN'); // Default to India
      }

      if (detectedCountry) {
        setSelectedCountryData(detectedCountry);
        handlePhoneDataChange({
          phoneNumber: phoneDataState?.phoneNumber || '',
          dialingCode: detectedCountry.dialingCode
        });
      }
    }
  }, [phoneDataState, handlePhoneDataChange, selectedCountryData]);

  const handleDropdownToggle = () => setDropdownOpen(!dropdownOpen);

  const handleCountrySelect = (countryCode, dialingCode) => {
    const selectedCountry = phoneData.find((country) => country.code === countryCode);
    setSelectedCountryData(selectedCountry);
    handlePhoneDataChange({
      phoneNumber: phoneDataState.phoneNumber,
      dialingCode
    });
    setDropdownOpen(false);
  };

  const handleClickOutside = (event) => {
    if (flagDivRef.current && !flagDivRef.current.contains(event.target) && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function convertFormatToRegex(format) {
    if (!format) return ''; // If format is undefined or null, return an empty string.

    const filteredFormat = format.replace(/[^#]/g, ''); // Only replace digits.

    const mapping = {
      '#': '\\d',
      0: '\\d',
      ' ': '\\s?',
      '-': '\\-',
      '(': '\\(',
      ')': '\\)'
    };

    return filteredFormat
      .split('')
      .map((char) => mapping[char] || char)
      .join('');
  }

  return (
    <div className={`${divClassName} w-full`}>
      <label htmlFor={id} className="block text-sm mb-2 font-medium text-primary">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      <div className={`flex relative border border-primary text-dark rounded-xl h-[50px] ${isFocused ? 'border-secondary' : 'border-primary'}`}>
        <div className="border-0 flag-div" onClick={handleDropdownToggle}>
          <span className="absolute start-10 top-3 cursor-pointer"></span>
          <button type="button" className="w-[60px] h-full p-4 bg-transparent flex justify-center items-center cursor-pointer border-0 border-r border-primary">
            {selectedCountryData ? (
              <span>{selectedCountryData.code && <div className={`selected-country-flag flag ${selectedCountryData.code}`} />}</span>
            ) : (
              <div className={`selected-country-flag flag in`} />
            )}
          </button>
          {dropdownOpen && (
            <div
              ref={dropdownRef}
              className={`absolute top-[51px] start-0 end-0 ${
                isDarkMode ? 'bg-[#0c0e12]' : 'bg-white'
              } mt-1 border border-primary px-2 z-30 max-h-[250px] overflow-y-auto shadow-custom custom-scrollbar rounded-xl`}
            >
              <SearchComponent value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} disabled={false} placeholder="Search by country name or code" />
              {/* <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by country name or code"
                className="px-4 py-3 border border-primary rounded-lg mx-4 my-3 w-[92.5%] focus:ring-0 focus:outline-none focus:border-secondary bg-grey"
                onClick={(e) => e.stopPropagation()}
              /> */}
              <ul>
                {filteredCountries.map((country) => (
                  <li
                    key={country.code}
                    onClick={() => handleCountrySelect(country.code, country.dialingCode)}
                    className="flex gap-2 px-2 py-1.5 cursor-pointer items-center hover:bg-hover"
                  >
                    {country.code && <div title={`${country.name} flag`} className={`country-flag flag ${country.code ? country.code : 'in'}`} />}
                    {country.name} ({country.dialingCode})
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="relative w-full">
          <span className="absolute left-2 top-3">+{selectedCountryData?.dialingCode || '91'}</span>
          <input
            id={id}
            name={name}
            type="tel"
            value={phoneDataState?.phoneNumber || ''}
            onChange={(e) => handlePhoneDataChange({ ...phoneDataState, phoneNumber: e.target.value })}
            pattern={`^${selectedCountryData ? convertFormatToRegex(selectedCountryData?.phoneNumberFormat) : '\\d{10}'}$`}
            className="w-full border-0 bg-transparent focus:outline-none focus:ring-0 focus:border-0 ps-12 py-3"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            required={required}
          />
        </div>
      </div>
      {errorMessage && <p className="text-red-500 mt-1 text-sm">{errorMessage}</p>}
    </div>
  );
};

export default PhoneInput;
