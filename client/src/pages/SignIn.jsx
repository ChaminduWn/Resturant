import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../components/OAuth.jsx';
import gymImage from '../assets/emplogin.jpg';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill all the fields'));
    }
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (

    <>
    <div className='min-h-screen mt-20 bg-gray-100'>
      <div className='flex flex-col max-w-3xl gap-10 p-3 mx-auto md:flex-row md:items-center'>
        
        {/* left */}
        <div className='flex-col hidden w-full mr-10 md:w-8/12 lg:w-6/12 md:flex'>
          <img src={gymImage} alt="Gym" className='object-cover w-full h-full' />
        </div>

        {/* right */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <h4 className='text-xl font-bold' style={{ color: 'black' }}>Sign in</h4>
            <p className='mt-5 text-sm text-center' style={{ color: '#707070' }}>
              Welcome back! to Food and Resturants
            </p>
            <div> 
              <Label value='Email' style={{ color: 'black' }} />
              <TextInput
                type='email'
                placeholder='Enter your email'
                id='email'
                onChange={handleChange}
                style={{ color: 'black' }}
              />
            </div>
            <div>
              <Label value='Password' style={{ color: 'black' }} />
              <TextInput
                type='password'
                placeholder='**********'
                id='password'
                onChange={handleChange}
                style={{ color: 'black' }}
              />
            </div>
            <button
              type="submit"
              className={`flex items-center justify-center text-white bg-red-900 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : (
                'Sign In'
              )}
            </button>
            <OAuth />
          </form>
          <div className='flex gap-2 mt-5 text-sm'>
            <span>Don't have an account?</span>
            <Link to='/signup' style={{ color: 'black' }}>
              Sign Up
            </Link>
          </div>
          {errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
    </>
  );
}
