import React, { useRef } from 'react'

function MenuForm() {

    const fileref=useRef();
  return (
    <div className=' container border border-black'>

      <form className='flex flex-col m-5 p-5 gap-3'>
        <h2 className='font-semibold'>Upload image</h2>
        <input
        type='file'
        id='myfile'
        name='myfile'
        accept='image/*'
        ref={fileref}
        hidden
        required
        />
        <img
        src=''
        alt='profile'
        onClick={()=>fileref.current.click()}
        className='rounded-full h-24 w-24 object-cover cursor-pointer  mt-2'
        />
      
      <label className='font-medium mb-1'>Product Name</label>
        <input
        type='text'
        id="name"
        placeholder='Product name'
        className='border border-black p-2 rounded-lg '
        required
        />
      
      <label className='font-medium mb-1'>Product Description</label>
         <input
        type='text'
        id="description"
        className='border p-2 rounded-lg  h-28 border-black'
        required
        />
 
        <div className='flex justify-between mt-2'> 
        <div className=' flex gap-1'>
        <label className='font-medium mb-1'>Product category</label>
         <input
        type='text'
        id="description"
        className='border p-2 rounded-lg border-black'
        required
        />
        </div>
       <div className=' flex gap-1'>
       <label className='font-medium mb-1'>Product price</label>
         <input
        type='number'
        id="description"
        className='border p-2 rounded-lg  border-black'
        required
        />
       </div>
        </div>

        <button  className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80 w-32 mt-3'>Submit</button>
      </form>
    </div>
  )
}

export default MenuForm
