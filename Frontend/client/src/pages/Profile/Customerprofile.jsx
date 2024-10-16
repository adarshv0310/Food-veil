import React, { useRef, useState }from 'react'
import ProfileHeader from '../../Components/ProfileHeader'
import { useSelector } from 'react-redux';
function Customerprofile() {
  const {currentUser} =useSelector((state)=>state.auth);
  const fileRef =useRef();
  const [formdata , setFormdata] = useState({});

  const handlechange=(e)=>{
    setFormdata(
      {
        ...formdata ,
      [e.id.value]:e.target.value
      }
    );
  };


  const handlesubmit = async(e)=>{
   e.preventDefault();
  }

  return (
    <div className='container flex flex-col'>
      <ProfileHeader/>
      <div className=' flex flex-row'>
      <div className='   flex flex-col container shadow-md bg-white w-1/4 h-screen mt-10 '>
     
     <button className='bg-slate-200  m-9 p-4 border rounded-xl font-bold text-lg'>Dashboard</button>
     <button className='bg-slate-200  m-9  mt-1 p-4 border rounded-xl font-bold text-lg'>Signout</button>
     <button className='bg-slate-200  m-9  mt-1 p-4 border rounded-xl font-bold text-lg'>Notification</button>
     <button className='bg-slate-200  m-9  mt-1 p-4 border rounded-xl font-bold text-lg'>Delete Account</button>
    
    </div>

    <div className='container mx-auto max-w-lg'>
    <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
    <form
      className='flex flex-col gap-4'
      >
       <input 
        type='file'
        ref={fileRef}
        accept='image/*'
        hidden
        />
        <img
        src={currentUser.avatar}
        onClick={()=>fileRef.current.click()}
        alt='profile'
        
        className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
        />
          <input
          type='text'
       
          placeholder='name'
          defaultValue={currentUser.name}
          id='name'
          className='border p-3 rounded-lg'
          onChange={handlechange}
        />
        <input
          type='email'
          placeholder='email'
          id='email'
          defaultValue={currentUser.email}
          className='border p-3 rounded-lg'
          onChange={handlechange}
          
        />
        <input
          type='password'
          placeholder='password'
          onChange={handlechange}
          id='password'
          className='border p-3 rounded-lg'
          
        />

<button
className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'
>
  Update
</button>
</form>
    </div>
      </div>
    </div>
  )
}

export default Customerprofile
