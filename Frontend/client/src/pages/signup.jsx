
import { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';


export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sucessmeessage , setSucessmessage] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('http://localhost:8000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      setSucessmessage('Signup successful! Redirecting to sign in...');
   
      setTimeout(() => {
        navigate('/signin');
      }, 2000);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 3000); // Error will clear after 3 seconds

      return () => clearTimeout(timer); // Cleanup the timer on unmount or when error changes
    }
  }, [error]);
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='text'
          placeholder='name'
          className='border p-3 rounded-lg'
          id='name'
          onChange={handleChange}
        />
        <input
          type='email'
          placeholder='email'
          className='border p-3 rounded-lg'
          id='email'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='password'
          className='border p-3 rounded-lg'
          id='password'
          onChange={handleChange}
        />
        <select 
        className='border p-3 rounded-lg'
        id='role'
        onChange={handleChange}
        >
         
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
          <option value="restaurant_owner">Restaurant Owner</option>
          <option value="delivery_person">Delivery person</option>
        </select>

        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
        
      </form>
      <div className='flex gap-2 mt-5'>
        <p> Already have an account?</p>
        <Link to={'/signin'}>
          <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
      {sucessmeessage && <p className='text-green-500 mt-5'>{sucessmeessage}</p>}
    </div>
  );
}







