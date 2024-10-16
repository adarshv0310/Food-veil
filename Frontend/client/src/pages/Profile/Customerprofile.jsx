import React, { useRef, useState }from 'react'
import ProfileHeader from '../../Components/ProfileHeader'
import { useDispatch, useSelector } from 'react-redux';
import { updateUserStart,
  updateUserSuccess,
  updateUserFailure,} from '../../redux/User/authSlice.js';
function Customerprofile() {
  const {currentUser,loading,error} =useSelector((state)=>state.auth);
  const fileRef =useRef();
  const dispatch=useDispatch();
  const [formdata , setFormdata] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const handlechange=(e)=>{
    setFormdata(
      {
        ...formdata ,
      [e.target.id]:e.target.value
      }
    );
  };


  const handlesubmit = async(e)=>{
   e.preventDefault();

   try{
    dispatch(updateUserStart());

    const res= await fetch(`http://localhost:8000/user/update/${currentUser._id}` ,{
      method:'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formdata),
    });

    const data=await res.json();

    if(data.success === false){
        dispatch(updateUserFailure());
        return;
    }

    dispatch(updateUserSuccess(data));
    setUpdateSuccess(true);

   }
   catch(error){
    dispatch(updateUserFailure(error.message));
   }
  };

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
      onSubmit={handlesubmit}
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
{loading ? 'Loading...' : 'Update'}
</button>
</form>
    </div>
    <p className='text-green-700 mt-5'>
    <p className='text-red-700 mt-5'>{error ? error : ''}</p>
        {updateSuccess ? 'User is updated successfully!' : ''}
      </p>
      </div>
     
      
    </div>
  )
}

export default Customerprofile
