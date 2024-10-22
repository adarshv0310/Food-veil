import React, { useState } from 'react'
import MenuForm from '../../Components/MenuForm';
import { useNavigate } from 'react-router-dom';
function Resturant() {
  const [menubutton , setMenubutton] = useState(false);
const navigate=useNavigate();

    const handlemenu = ()=>{
      setMenubutton((prev)=>!prev);
    }
    const handleresturantdata = ()=>{
          navigate('/returantform');
    }
  return (
    <div className='container flex flex-col'>
       < div className=' flex flex-row'>
          <div className='   flex flex-col container shadow-md bg-white w-1/4 h-screen mt-10 '>
         
         <button className='bg-slate-200  m-9 p-4 border rounded-xl font-bold text-lg'
          onClick={handlemenu}
         >Add items</button>
         <button className='bg-slate-200  m-9  mt-1 p-4 border rounded-xl font-bold text-lg'
        
         >List items</button>
         
         <button className='bg-slate-200  m-9  mt-1 p-4 border rounded-xl font-bold text-lg'
        
         >Orders</button>

          <button className='bg-slate-200  m-9  mt-1 p-4 border rounded-xl font-bold text-lg'
          onClick={handleresturantdata}
        >Create Resturant</button>
        
        </div>

       
        
        

        {
          menubutton && (
            <MenuForm/>
          )
        }
    </div>
    </div>
  )
}

export default Resturant;
