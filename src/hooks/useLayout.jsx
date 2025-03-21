import { useContext } from 'react';
import { LayoutContext } from '../contexts/contexts/LayoutContext';

const useLayout = () => {
  return useContext(LayoutContext);
};

export default useLayout;
