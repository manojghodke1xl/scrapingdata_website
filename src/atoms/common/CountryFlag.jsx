import { useEffect, useState } from 'react';
import phoneData from '../../utils/phoneInput.json';

const CountryFlag = ({ dialingCode }) => {
  const [countryCode, setCountryCode] = useState(null);

  useEffect(() => {
    if (dialingCode) {
      const country = phoneData.find((country) => country.dialingCode === dialingCode);
      if (country) {
        setCountryCode(country.code.toLowerCase());
      }
    }
  }, [dialingCode]);

  return (
    <div className="flex items-center justify-center">{countryCode ? <div className={`country-flag flag  ${countryCode}`} /> : <div className="text-primary text-sm pr-2">-</div>}</div>
  );
};

export default CountryFlag;
