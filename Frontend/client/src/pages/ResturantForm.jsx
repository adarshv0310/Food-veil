import React, { useState } from 'react'

function ResturantForm() {

    const [formdata , setFormdata]=useState({});

    const handlechange = (e)=>{
        setFormdata({
            ...formdata , 
            [e.trget.id]:e.target.value,
        });
    }
    
    const handlesubmit = (e)=>{
        e.preventDefault();
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
    </div>
  )
}

export default ResturantForm
