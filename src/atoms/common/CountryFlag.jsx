import { useEffect, useState } from 'react';
import phoneData from '../../utils/phoneInput.json';

/**
 * CountryFlag component displays a country's flag and optionally its name based on dialing code
 * @param {Object} props Component props
 * @param {string} props.divClassName - Additional CSS classes for the container div
 * @param {string} props.dialingCode - The country dialing code to lookup the flag
 * @param {boolean} props.showName - Whether to display the country name alongside the flag
 */
const CountryFlag = ({ divClassName, dialingCode, showName }) => {
  // State to store the country code (used for flag display) and country name
  const [countryCode, setCountryCode] = useState(null);
  const [countryName, setCountryName] = useState('');

  // Effect to update country information when dialing code changes
  useEffect(() => {
    if (dialingCode) {
      // Find the country data matching the dialing code
      const country = phoneData.find((country) => country.dialingCode === dialingCode);
      if (country) {
        // Convert country code to lowercase for CSS class compatibility
        setCountryCode(country.code.toLowerCase());
        setCountryName(country.name);
      }
    }
  }, [dialingCode]);

  return (
    <div className={`${divClassName} flex items-center justify-start`}>
      {countryCode ? (
        // Display flag and optional country name if country code is found
        <div className="flex items-center justify-normal">
          <div className={`country-flag flag  ${countryCode}`} />
          {showName && <span className="text-placeholder font-normal">{countryName}</span>}
        </div>
      ) : (
        // Display fallback dash if no country code is found
        <div className="text-primary text-sm pr-2">-</div>
      )}
    </div>
  );
};

export default CountryFlag;
