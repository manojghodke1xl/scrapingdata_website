import { useEffect, useState } from 'react';
import phoneData from '../../utils/phoneInput.json';

const CountryFlag = ({ divClassName, dialingCode, showName }) => {
  const [countryCode, setCountryCode] = useState(null);
  const [countryName, setCountryName] = useState('');

  useEffect(() => {
    if (dialingCode) {
      const country = phoneData.find((country) => country.dialingCode === dialingCode);
      if (country) {
        setCountryCode(country.code.toLowerCase());
        setCountryName(country.name);
      }
    }
  }, [dialingCode]);

  return (
    <div className={`${divClassName} flex items-center justify-start`}>
      {countryCode ? (
        <div className="flex items-center justify-normal">
          <div className={`country-flag flag  ${countryCode}`} />
          {showName && <span className="text-primary font-semibold">{countryName}</span>}
        </div>
      ) : (
        <div className="text-primary text-sm pr-2">-</div>
      )}
    </div>
  );
};

export default CountryFlag;
