import React from 'react'
import { Link } from 'react-router-dom'
function signup() {
  return (
   <div className=''>
     <div className='p-3 max-w-lg mx-auto mt-20'>
    <h1 className='text-3xl text-center font-semibold my-7'>Sign up</h1>
     <form className='flex flex-col gap-4'>
        <input
        type='email'
        placeholder='abc@gmail.com'
        id='eamil'
        className='border p-3 rounded-lg border-black'
        />
    <input
      type='password'
      placeholder='password'
      className='border p-3 rounded-lg border-black'
      id='password'
     
    />
    <button className='bg-orange-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Sign up</button>
     </form>
     <div className='flex gap-2 mt-5'>
    <p> Already have account</p>
    <Link to={'/signin'}>
      <span className='text-blue-700'>Sign in</span>
    </Link>
  </div>
</div>
   </div>
  )
}

export default signup
