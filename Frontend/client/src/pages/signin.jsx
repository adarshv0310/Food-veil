import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signinsuccess } from '../redux/User/authSlice';
import { useDispatch, useSelector } from 'react-redux';
export default function Signin() {
  //const {loading , error ,currentUser} = useSelector((state)=>state.auth);
    const [loading , setLoading]=useState(false);
    const [error ,setError] = useState(null);
    const [successmessage ,setSuccessmessage]=useState(null);
    const [formdata , setFormdata]= useState({});
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const handlechange = (e)=>{
        setFormdata({
            ...formdata,
            [e.target.id]: e.target.value,
          });
    }

    const handlesubmit = async (e)=>{
        e.preventDefault();
        try{
        setLoading(true);

        const res =  await fetch('http://localhost:8000/auth/signin' , {
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formdata),
        });

        const data = await res.json();
        //console.log(data);
        if(data.success === false){
            setLoading(false);
            setError(data.message);
            return ;
        }
        setLoading(false);
        setError(null);
        localStorage.setItem('token', data.token);
        dispatch(signinsuccess(data));
        setSuccessmessage('Signin successful! Redirecting to home...');
        

        setTimeout(() => {
            navigate('/');
          }, 2000);

        }
        catch(error){
            setLoading(false);
            setError(error.message);
        }
    }

    // To mange effect of error
   useEffect(()=>{
      if(error){
        const timer=setTimeout(()=>{
            setError(null);
        } , 3000);

        return ()=> clearTimeout(timer);
      }
   },[error])
  return (
    <div>
        <div className='p-3 max-w-lg mx-auto mt-20'>
        <h1 className='text-3xl text-center font-semibold my-7'>Sign in</h1>
         <form className='flex flex-col gap-4'
         onSubmit={handlesubmit}
         >
            <input
            type='email'
            placeholder='abc@gmail.com'
            id='email'
            className='border p-3 rounded-lg border-black'
            onChange={handlechange}
            />
        <input
          type='password'
          placeholder='password'
          className='border p-3 rounded-lg border-black'
          id='password'
          onChange={handlechange}
         
        />
        <button className='bg-orange-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        disabled={loading}>
        
        {loading ? 'Loading...' : 'Sign In'}
        </button>
         </form>
         <div className='flex gap-2 mt-5'>
        <p> Dont have an account?</p>
        <Link to={'/signup'}>
          <span className='text-blue-700'>Sign up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
      {successmessage && <p className='text-green-500 mt-5'>{successmessage}</p>}
    </div>
    </div>
  )
}


