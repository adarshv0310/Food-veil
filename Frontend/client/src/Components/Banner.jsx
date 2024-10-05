/*import React from 'react'
import img from '../assets/frontend_assets/header_img.png'
function Banner() {
  return (
    <div className='flex max-auto items-center container'>
       <img
       className='max-w-6xl p-4 m-4' 
       src={img}
       alt='image'
       />
    </div>
  )
}

export default Banner*/

import React from 'react';
import img from '../assets/frontend_assets/header_img.png';

function Banner() {
  return (
    <div className="relative h-96 md:h-screen bg-cover bg-center m-10 box-border border rounded-lg " style={{ backgroundImage: `url(${img})` }}>
      {/* Optional overlay for better text visibility */}
      <div className="absolute inset-0 bg-black opacity-30"></div>
      
      {/* Content inside the banner */}
      <div className="relative flex  flex-col items-start h-full  text-white gap-9">
        <h1 className="text-3xl md:text-7xl font-semibold ml-10 md:mt-36 mt-3">Order your <br/> favourite food here</h1>
        <p className='ml-10  md:text-lg text-xs'>Choose from a diverse menu featuring a delectable array of dishes grafted with the finest <br/> ingredients and culinary expertise
        . Our mission is to satisfying your carving and elevate<br/> your dining experiences , One delicious meal at a time
        </p>

        <button className='ml-10 bg-white border rounded-3xl text-black p-2  md:px-5 px-2 text-center'>View menu</button>
      </div>
    </div>
  );
}

export default Banner;

