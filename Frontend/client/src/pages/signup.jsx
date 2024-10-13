import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
function Signup() {
    const navigate = useNavigate();
const [formdata , setFormdata] = useState({});
const [loading , setLoading] = useState(false);
const [error ,setError] = useState(null);

const handlesubmit =  async(e)=>{
    e.preventDefault();
    try{
      setLoading(true);
      const res= await fetch('http://localhost:8000/auth/signup',{
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formdata),
      });

       const data = await res.json();
       if(data.success === false){
        setLoading(false);
        setError(data.message);
       }
       setLoading(false);
       setError(null);
       setTimeout(()=>{
         navigate('/signin');
       } , 2000);
    }
    catch(error){
        setLoading(false);
      setError(error.message);
    }
}
 const handlechange = (e) =>{
  setFormdata({
    ...formdata,
    [e.target.id]:e.target.value,
  });
 }

  return (
    <div className=''>
    <div className='p-3 max-w-lg mx-auto mt-20'>
   <h1 className='text-3xl text-center font-semibold my-7'>Sign up</h1>
    <form className='flex flex-col gap-4'
    onSubmit={handlesubmit}
    >
        <input
       type='text'
       placeholder='name'
       id='eamil'
       className='border p-3 rounded-lg border-black'
       onChange={handlechange}
       />
       <input
       type='email'
       placeholder='abc@gmail.com'
       id='eamil'
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
   <button className='bg-orange-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading  ? 'Loading ...' : 'Signup'}</button>
    </form>
    <div className='flex gap-2 mt-5'>
   <p> Already have account ?</p>
   <Link to={'/signin'}>
     <span className='text-blue-700'>Signin</span>
   </Link>
 </div>
 {error && <p className='text-red-500 mt-5'>{error}</p>}
</div>
  </div>
  );
}

export default Signup




