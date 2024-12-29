import { useContext } from 'react';
import { GlobalContext } from '../contexts/contexts/GlobalContext';

// Custom hook to access global context
const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export default useGlobalContext;
