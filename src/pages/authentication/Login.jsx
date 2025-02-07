import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormField from '../../atoms/formFields/InputField';
import { showNotification } from '../../utils/showNotification';
import Logo from '../../assets/images/marsCMS-logo.png';
import useGlobalContext from '../../hooks/useGlobalContext';

const Login = () => {
  const navigate = useNavigate();
  const { dispatch, setLoading } = useGlobalContext();
  const [email, setEmail] = useState(import.meta.env.DEV ? 'vishwajeet.patil@dreamsinternational.in' : '');
  const [password, setPassword] = useState(import.meta.env.DEV ? 'Vishu@123' : '');

  const loginAccount = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const { data, error } = await res.json();
      if (res.ok) {
        dispatch({ type: 'SIGNIN', payload: data.token });
        navigate('/dashboard');
      } else showNotification('warn', error);
    } catch (error) {
      showNotification('error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full py-8 px-3 sm:p-8">
      <div className="w-full flex gap-2 items-center">
        <span>
          <img src={Logo} width={160} alt="logo" />
        </span>
      </div>

      <div className="py-10 mt-2 w-full h-full flex justify-center items-center">
        <div className="w-full sm:w-[68%] md:w-[60%] lg:w-[50%] xl:w-[45%] 2xl:w-[27%]">
          <div className="w-full flex flex-col justify-center gap-y-2">
            <h2 className="w-full text-center text-3xl sm:text-4xl font-semibold text-dark mb-0.5">Login</h2>
            <p className="text-primary w-full text-center tracking-wide font-medium">Enter your details to login.</p>
          </div>
          <form className="w-full mt-8" onSubmit={loginAccount}>
            <div className="w-full mt-5">
              <FormField label="Email ID" name="email" id="email" type="email" placeholder="Email ID" onChange={(e) => setEmail(e.target.value)} value={email} required />
            </div>
            <div className="w-full mt-4">
              <FormField
                label="Password"
                name="password"
                id="password"
                type="password"
                placeholder="Password"
                showPasswordToggle
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </div>
            <div className="w-full mt-6 flex justify-center">
              <button type="submit" className={`w-full text-center text-white text-lg py-2 rounded-xl bg-primary hover:bg-primary-hover `}>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
