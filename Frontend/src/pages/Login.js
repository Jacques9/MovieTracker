import React, { useEffect, useState } from 'react';

// Router
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import ResetPassword from '../components/ResetPassword';
import Manager from "../ApiManager";
import { useNavigate } from "react-router-dom";
import UserProfile from '../UserProfile';
const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [shouldRedirect, setRedirect] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === '' || password === '') {
      setError('Empty fields');
      return;
    }

    Manager.loginUser(email, password).then(result=>{
      if(result.response.ok){
        UserProfile.setName(email);
        setRedirect(true);
      }else{
        setError(result.response.statusText +":"+ result.data);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  }, [error]);
  if(shouldRedirect){
    navigate("/");
  }
  return (
    <section className='flex flex-col items-center justify-center sectionHeight bg-amber-200'>
      <div className='flex flex-col items-center justify-center px-16 py-8 bg-white rounded-md shadow-md max-w-[600px] w-[90%]'>
        <h1 className='py-2 text-4xl font-bold tracking-wider text-yellow-400 transition-all duration-300 border-b-4 border-black hover:tracking-widest hover:text-yellow-300'>
          Login
        </h1>
        <p className='mt-2 text-sm italic text-gray-500'>
          Log in to comment and add movie reviews
        </p>
        <form
          className='flex flex-col items-center justify-center w-full gap-2 mt-8'
          onSubmit={handleLogin}
        >
          <input
            type='email'
            value={email || ''}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={'E-mail'}
            autoComplete='true'
            className='w-full p-4 italic text-white rounded-md shadow-sm outline-none bg-zinc-800'
          />
          <input
            type='password'
            value={password || ''}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={'Password'}
            autoComplete='true'
            className='w-full p-4 italic text-white rounded-md shadow-sm outline-none bg-zinc-800'
          />
          {!loading && (
            <input
              type='submit'
              value='Log in'
              className='w-full p-4 font-bold text-white transition-all duration-300 bg-yellow-400 rounded-md shadow-sm cursor-pointer hover:bg-yellow-300 hover:tracking-wider'
            />
          )}

          {loading && (
            <div className='flex items-center justify-center w-full'>
              <Loading size={'30px'} />
            </div>
          )}

          {error && <p className='error'>{error}</p>}
        </form>
        <div className='flex flex-col w-full gap-2 mt-4'>
          <p className='italic text-gray-500 '>
            Forgot your password? <ResetPassword userEmail={email} />
          </p>
          <p className='italic text-gray-500 '>
            New here?{' '}
            <Link
              to='/register'
              className='pb-1 font-bold text-yellow-400 transition-all duration-150 hover:tracking-wider hover:text-yellow-300'
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;