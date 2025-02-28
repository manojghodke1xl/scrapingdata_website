import { useContext } from 'react';
import { ColorContext } from '../contexts/contexts/ColorContext';

const useColorContext = () => {
  return useContext(ColorContext);
};

export default useColorContext;
