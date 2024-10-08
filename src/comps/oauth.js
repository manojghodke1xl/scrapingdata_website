import { useCallback, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../GlobalContext';

export default function OAuth() {
  const navigate = useNavigate();

  const googleButton = useRef(null);

  const { alert, setLoading, dispatch } = useContext(GlobalContext);

  const googleLogin = useCallback(
    async (response) => {
      setLoading(true);
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/google`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(response),
        });
        const { data, error } = await res.json();
        if (res.ok) {
          dispatch({ type: 'SIGNIN', payload: data });
          navigate('/form');
        } else {
          throw new Error(error);
        }
      } catch (error) {
        alert({ type: 'warning', title: 'Warning !', text: error.message });
      } finally {
        setLoading(false);
      }
    },
    [dispatch, navigate, alert, setLoading]
  );

  useEffect(() => {
    const gsiScript = window.document.createElement('script');
    gsiScript.src = 'https://accounts.google.com/gsi/client';
    gsiScript.onload = () => {
      window.google?.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: googleLogin,
      });
      window.google?.accounts.id.renderButton(googleButton.current, { theme: 'outline', size: 'large' });
    };
    gsiScript.onerror = () => alert({ type: 'warning', title: 'Warning !', text: 'Unable to Login with Google.' });
    window.document.body.appendChild(gsiScript);
    return () => {
      gsiScript.remove();
      delete window.google;
    };
  }, [alert, googleLogin]);

  useEffect(() => {
    const fbsScript = window.document.createElement('script');
    fbsScript.src = 'https://connect.facebook.net/en_US/sdk.js';
    fbsScript.onload = () => {
      window.FB?.init({
        appId: process.env.REACT_APP_FACEBOOK_APP_ID,
        version: 'v15.0',
      });
    };
    fbsScript.onerror = () => alert({ type: 'warning', title: 'Warning !', text: 'Unable to Login with Facebook.' });
    window.document.body.appendChild(fbsScript);
    return () => {
      fbsScript.remove();
      delete window.FB;
    };
  }, [alert]);

  const facebookLogin = async (response) => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/facebook`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(response),
      });
      const { data, error } = await res.json();
      if (res.ok) {
        dispatch({ type: 'SIGNIN', payload: data });
        navigate('/form');
      } else {
        throw new Error(error);
      }
    } catch (error) {
      alert({ type: 'warning', title: 'Warning !', text: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card-body">
      <div className="row">
        <div ref={googleButton} className="col" />
        <div className="col">
          <button
            className="btn w-100"
            onClick={() =>
              window.FB?.login(
                (response) => {
                  if (response.status === 'connected') {
                    facebookLogin(response.authResponse);
                  } else {
                    alert({ type: 'warning', title: 'Warning !', text: 'Unable to Login with Facebook.' });
                  }
                },
                { scope: 'public_profile,email' }
              )
            }>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon text-facebook"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
            </svg>
            Login with Facebook
          </button>
        </div>
      </div>
    </div>
  );
}
