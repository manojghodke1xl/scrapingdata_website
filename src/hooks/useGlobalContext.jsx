/**
 * useGlobalContext hook - Uses the useContext hook to subscribe to the GlobalContext
 * and get the current state of the context
 * @returns {Object} The current state of the GlobalContext
 */
import { useContext } from 'react';
import { GlobalContext } from '../contexts/contexts/GlobalContext';

const useGlobalContext = () => {
  /**
   * useContext hook is used to subscribe to the GlobalContext
   * and get the current state of the context
   */
  return useContext(GlobalContext);
};

export default useGlobalContext;

