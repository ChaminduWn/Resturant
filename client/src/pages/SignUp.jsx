import React, { useState } from 'react';
import { Alert, Label, Spinner, TextInput } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth.jsx';
import gymImage from '../assets/signup.jpg';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please fill out all fields.');
    }

    if (formData.username.length < 4 || formData.username.length > 20) {
      return setErrorMessage('Username must be between 4 and 20 characters.');
    }

    if (formData.username.includes(' ')) {
      return setErrorMessage('Username cannot contain spaces.');
    }

    if (formData.username !== formData.username.toLowerCase()) {
      return setErrorMessage('Username must be lowercase.');
    }

    if (!formData.username.match(/^[a-zA-Z0-9]+$/)) {
      return setErrorMessage('Username can only contain letters and numbers.');
    }

    // Email validation
    if (formData.email.length < 6 || !formData.email.includes('@gmail.com')) {
      return setErrorMessage('Email must be at least 6 characters long and end with @gmail.com.');
    }

    // Password validation
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordRegex.test(formData.password)) {
      return setErrorMessage('Password must be at least 6 characters long and contain both letters and numbers.');
    }

    try {
      setLoading(true);
      setErrorMessage(null);

      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to sign up');
      }

      setLoading(false);
      navigate('/signin');
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message || 'An error occurred');
    }
  };

  return (
    <>
          
    <div className='min-h-screen mt-20 bg-gray-100'> {/* Added background color */}
      <div className="flex flex-col max-w-3xl gap-10 p-3 mx-auto md:flex-row md:items-center">
        {/* left */}
        <div className='flex-col hidden w-full mr-10 md:w-8/12 lg:w-6/12 md:flex'>
          <img src={gymImage} alt="Gym" className='object-cover w-full h-full' />
        </div>

        {/* right */}
        <div className="flex-1">
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <h4 className='text-xl font-bold' style={{ color: 'black' }}>Sign Up</h4>
            <p className='mt-5 text-sm text-center' style={{ color: '#707070' }}>
            Welcome to Food and Resturants

            </p>
            <div>
              <Label value='Username' style={{ color: 'black' }} />
              <TextInput
                type='text'
                placeholder='Username'
                id='username'
                onChange={handleChange}
                style={{ color: 'black' }} // Ensure text color is black
              />
            </div>
            <div>
              <Label value='Email' style={{ color: 'black' }} />
              <TextInput
                type='email'
                placeholder='name@yourmail.com'
                id='email'
                onChange={handleChange}
                style={{ color: 'black' }} // Ensure text color is black
              />
            </div>
            <div>
              <Label value='Password' style={{ color: 'black' }} />
              <TextInput
                type='password'
                placeholder='Password'
                id='password'
                onChange={handleChange}
                style={{ color: 'black' }} // Ensure text color is black
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
                'Sign Up'
              )}
            </button>
            <OAuth />
          </form>
          <div className='flex gap-2 mt-5 text-sm'>
            <span>Already have an account?</span>
            <Link to='/signin' style={{ color: 'black' }}>
              Sign in
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
