import { useState, useRef, useEffect } from 'react';
import phoneData from '../../utils/phoneInput.json';
import { useColor } from '../../contexts/contexts/ColorContext';
import SearchComponent from '../common/SearchComponent';

const PhoneInput = ({ phoneDataState, handlePhoneDataChange, label, divClassName, errorMessage, required }) => {
  const { isDarkMode } = useColor();
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedCountryData, setSelectedCountryData] = useState(null);
  const [countryCode, setCountryCode] = useState('');

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
      const defaultCountry = phoneData.find((country) => country.code === 'in');
      setSelectedCountryData(defaultCountry);
      setCountryCode(defaultCountry.dialingCode);
      handlePhoneDataChange({
        phoneNumber: phoneDataState?.phoneNumber || '',
        dialingCode: defaultCountry.dialingCode
      });
    }
  }, [phoneDataState, handlePhoneDataChange, selectedCountryData]);

  const handleDropdownToggle = () => setDropdownOpen(!dropdownOpen);

  const handleCountrySelect = (countryCode, dialingCode) => {
    const selectedCountry = phoneData.find((country) => country.code === countryCode);
    setSelectedCountryData(selectedCountry);
    setCountryCode(dialingCode);
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

  const handleCountryCodeChange = (e) => {
    let inputCode = e.target.value;
    inputCode = inputCode.replace(/[^0-9\+\-\(\)\s]/g, '');
    setCountryCode(inputCode);
    const matchedCountry = phoneData.find((country) => country.dialingCode === inputCode);
    if (matchedCountry) {
      setSelectedCountryData(matchedCountry);
      handlePhoneDataChange({
        phoneNumber: phoneDataState.phoneNumber,
        dialingCode: inputCode
      });
    }
  };

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

  const getPhoneNumberLengthMessage = (format) => {
    if (Array.isArray(format)) {
      const lengths = format.map((range) => range?.match(/#/g)?.length);
      return [`Please enter a valid phone number with length(s): ${lengths.join(', ')}}`, lengths];
    } else {
      const length = format?.match(/#/g)?.length;
      return [`Please enter a valid ${length || 10}-digit phone number`, length];
    }
  };

  const handleInputChange = (e) => {
    let value = e.target.value;
    value = value.replace(/[^0-9\+\-\(\)\s]/g, '');
    handlePhoneDataChange({ ...phoneDataState, phoneNumber: value });
  };

  return (
    <div className={`${divClassName} w-full`}>
      <label htmlFor="phoneNumber" className="block text-sm mb-2 font-medium text-primary">
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
            <div ref={dropdownRef} className={`absolute top-[51px] start-0 end-0 ${isDarkMode ? 'bg-[#0c0e12]' : 'bg-white'} mt-1 border border-primary px-2 z-30  rounded-xl`}>
              <ul className="max-h-[250px] overflow-y-auto shadow-custom custom-scrollbar">
                <SearchComponent
                  divClassName={'sticky top-0'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  disabled={false}
                  placeholder="Search by country name or code"
                />

                <li className="flex gap-2 px-2 py-1.5 cursor-pointer items-center text-white bg-primary-hover sticky top-11">
                  <div title={`${selectedCountryData?.name} flag`} className={`country-flag flag ${selectedCountryData?.code ? selectedCountryData.code : 'in'}`} />
                  {selectedCountryData?.name} ({selectedCountryData?.dialingCode})
                </li>
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
          <span className="absolute left-2 top-3">+</span>
          <input
            type="tel"
            value={countryCode}
            maxLength={3}
            onChange={handleCountryCodeChange}
            className="absolute left-5  w-10 bg-transparent py-3 border-r border-primary focus:outline-none"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            inputMode="numeric"
          />
          <input
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            placeholder="Enter your phone number"
            maxLength={
              Array.isArray(getPhoneNumberLengthMessage(selectedCountryData?.phoneNumberFormat)[1])
                ? Math.max(...getPhoneNumberLengthMessage(selectedCountryData?.phoneNumberFormat)[1])
                : getPhoneNumberLengthMessage(selectedCountryData?.phoneNumberFormat)[1]
            }
            value={phoneDataState?.phoneNumber || ''}
            // onChange={(e) => handlePhoneDataChange({ ...phoneDataState, phoneNumber: e.target.value })}
            onChange={handleInputChange}
            pattern={`^${selectedCountryData ? convertFormatToRegex(selectedCountryData?.phoneNumberFormat) : '\\d{10}'}$`}
            className="w-full border-0 bg-transparent placeholder:font-normal placeholder:text-sm focus:outline-none focus:ring-0 ml-1 focus:border-0 ps-16 py-3"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            title={getPhoneNumberLengthMessage(selectedCountryData?.phoneNumberFormat)[0]}
            required={required}
            inputMode="numeric"
          />
        </div>
      </div>
      {errorMessage && <p className="text-red-500 mt-1 text-sm">{errorMessage}</p>}
    </div>
  );
};

export default PhoneInput;
