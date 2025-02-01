import { useLocation, useNavigate } from 'react-router-dom';
import useGlobalContext from '../../hooks/useGlobalContext';
import { useState } from 'react';

const SMSIntegration = () => {
  const navigate = useNavigate();
  const { setLoading, isLoading } = useGlobalContext();
  const { state } = useLocation();

  const [errors, setErrors] = useState({});
  const [smsDetails, setSmsDetails] = useState({});

  return <div>SMS Integration</div>;
};

export default SMSIntegration;
