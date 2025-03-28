/**
 * useLayout hook - Uses the useContext hook to subscribe to the LayoutContext
 * and get the current state of the context
 * @returns {Object} The current state of the LayoutContext
 */
import { useContext } from 'react';
import { LayoutContext } from '../contexts/contexts/LayoutContext';

const useLayout = () => {
  return useContext(LayoutContext);
};

export default useLayout;

