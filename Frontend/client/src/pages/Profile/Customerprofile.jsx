import React from 'react'
import ProfileHeader from '../../Components/ProfileHeader'
function Customerprofile() {
  return (
    <div className='container flex flex-col'>
      <ProfileHeader/>
      <div className='   flex flex-col container shadow-md bg-white w-1/4 h-screen mt-10 '>
     
     <button className='bg-slate-200  m-9 p-4 border rounded-xl font-bold text-lg'>Dashboard</button>
     <button className='bg-slate-200  m-9  mt-1 p-4 border rounded-xl font-bold text-lg'>Signout</button>
     <button className='bg-slate-200  m-9  mt-1 p-4 border rounded-xl font-bold text-lg'>Notification</button>
     <button className='bg-slate-200  m-9  mt-1 p-4 border rounded-xl font-bold text-lg'>Delete Account</button>
    
    </div>
    </div>
  )
}

export default Customerprofile
