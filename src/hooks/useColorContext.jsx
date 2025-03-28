/**
 * This hook is used to access the ColorContext
 * 
 * @returns {Object} The current state of the ColorContext
 */
import { useContext } from 'react';
import { ColorContext } from '../contexts/contexts/ColorContext';

const useColorContext = () => {
  /**
   * useContext hook is used to subscribe to the ColorContext
   * and get the current state of the context
   */
  return useContext(ColorContext);
};

export default useColorContext;

