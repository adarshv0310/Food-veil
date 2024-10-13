import React from 'react'
import { Link } from 'react-router-dom'
function signin() {
  return (
    <div>
        <div className='p-3 max-w-lg mx-auto mt-20'>
        <h1 className='text-3xl text-center font-semibold my-7'>Sign in</h1>
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
        <button className='bg-orange-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Sign in</button>
         </form>
         <div className='flex gap-2 mt-5'>
        <p> Dont have an account?</p>
        <Link to={'/signup'}>
          <span className='text-blue-700'>Sign up</span>
        </Link>
      </div>
    </div>
    </div>
  )
}

export default signin
