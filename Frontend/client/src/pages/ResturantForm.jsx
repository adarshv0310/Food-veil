import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addResturant} from '../redux/Resturant/ResturantSlice';
import { setError , setLoading } from '../redux/User/authSlice';
function ResturantForm() {
    const {currentUser,loading,error} = useSelector((state)=>state.auth);
    const [formdata , setFormdata]=useState({});
    const dispatch = useDispatch();
    const handlechange = (e)=>{
        setFormdata({
            ...formdata , 
            [e.target.id]:e.target.value,
        });
    }
    
    const handlesubmit = async(e)=>{
        e.preventDefault();
        try{
            setLoading(true);
         const res=await fetch('http://localhost:8000/resturant/createresturant',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                ...formdata,
                ownerId:currentUser.id,
            }),
         });


        const data=await res.json();
        if(data.success===false){
            setLoading(false);
            setError(data.message);
            
           return;
        }
        setLoading(false);
        setError(null);
        dispatch(addResturant(formdata));
        }
        catch(error){
            setLoading(false);
            setError(error.message);
        }
    }

  return (
    <div className='mt-5'>
         <h1 className='font-semibold text-center text-4xl '>Resturant</h1>
      <form className='flex flex-col m-5 p-5 gap-3'
      onSubmit={handlesubmit}
      >
      
      
      <label className='font-medium mb-1'>Resturant Name</label>
        <input
        type='text'
        id="name"
        placeholder='Resturant name'
        className='border border-black p-2 rounded-lg '
        required
        onChange={handlechange}
        />
      
      <label className='font-medium mb-1'>Resturant location</label>
         <input
        type='text'
        id="location"
        className='border p-2 rounded-lg  h-28 border-black'
        required
        onChange={handlechange}
        />
 
        

        <button  className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80 w-32 mt-3'>Submit</button>
      </form>

      {error && <p className='text-red-600 text-center'>{error}</p>}
    </div>
  )
}

export default ResturantForm
