import React, { useEffect, useRef, useState }from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
deleteUserFailure,
deleteUserSuccess,
signOutUserStart,
signOutUserFailure,
signOutUserSuccess,
setError,setLoading} from '../redux/User/authSlice.js'
import { useNavigate } from 'react-router-dom';
import ProfileHeader from './ProfileHeader.jsx';
function UpdateProfile() {
    const {currentUser,loading,error} =useSelector((state)=>state.auth);
    const token=localStorage.getItem('token');
    const fileRef =useRef();
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [formdata , setFormdata] = useState({});
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [selectedfile , setSelectedfile]=useState(null);
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
        const formData = new FormData(); // Initialize FormData

        // Append avatar if file is selected
        
      dispatch(updateUserStart());
  
      const res= await fetch(`http://localhost:8000/user/update/${currentUser._id}` ,{
        method:'PUT',
        credentials: 'include',
       headers:{
        'Content-Type': 'application/json',
       },
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
  
    const handledelete = async()=>{
      try{
  
       dispatch(deleteUserStart());
       const res  =  await fetch(`http://localhost:8000/user/delete/${currentUser._id}`,{
        method:'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer${token}`,
        },
       });
      
  
       const data = await res.json();
       if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
      setTimeout(() => {
        navigate('/signup');
      }, 2000);
  
    }
      
      catch(error){
        dispatch(deleteUserFailure(error.message));
      }
    };


    const handlesignout = async()=>{
        try{
     dispatch(signOutUserStart());

     const res =  await fetch(`http://localhost:8000/auth/signout/${currentUser._id}`,
        {
            method:'POST',
            credentials:'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer${token}`,
              },

              
        }
     );

         const data= await res.json();
         if(data.success===false){
            dispatch(signOutUserFailure(error.message))
         }
         dispatch(signOutUserSuccess(data));

         setTimeout(()=>{
            navigate('/signin');
         } , 2000);
        }
        catch(error){
   dispatch(signOutUserFailure(error.message));
        }
    }






    // To manage effecct of error 

    useEffect(()=>{
        if(error){
            // settimeout return id of timer
            const timer=setTimeout(()=>{
                dispatch(setError(null));
            } , 3000);
    
            return ()=> clearTimeout(timer);
          }
    } , [error])

    useEffect(()=>{
        if(updateSuccess){
            // settimeout return id of timer
            const timer=setTimeout(()=>{
                setUpdateSuccess(false);
            } , 3000);
    
            return ()=> clearTimeout(timer);
          }
    } , [updateSuccess])

    return (
        <div className='container flex flex-col'>
          <ProfileHeader/>
          <div className=' flex flex-row'>
          <div className='   flex flex-col container shadow-md bg-white w-1/4 h-screen mt-10 '>
         
         <button className='bg-slate-200  m-9 p-4 border rounded-xl font-bold text-lg'>Dashboard</button>
         <button className='bg-slate-200  m-9  mt-1 p-4 border rounded-xl font-bold text-lg'
         onClick={handlesignout}
         >Signout</button>
         
         <button className='bg-slate-200  m-9  mt-1 p-4 border rounded-xl font-bold text-lg'
         onClick={handledelete}
         >Delete Account</button>
        
        </div>
    
        <div className='container mx-auto max-w-lg'>
        <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
        <form
          className='flex flex-col gap-4'
          onSubmit={handlesubmit}
          >
          
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
       
        {error && <p className='text-red-500 mt-5'>{error}</p>}
        <p className='text-green-700 mt-5'>
            {updateSuccess ? 'User is updated successfully!' : ''}
          </p>
        </div>
       
          </div>
         
          
        </div>
      )
}

export default UpdateProfile




