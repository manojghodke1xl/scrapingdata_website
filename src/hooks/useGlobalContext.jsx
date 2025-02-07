import { useContext } from 'react';
import { GlobalContext } from '../contexts/contexts/GlobalContext';

const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export default useGlobalContext;
