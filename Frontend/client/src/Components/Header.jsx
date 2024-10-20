import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { FaBasketShopping } from 'react-icons/fa6';
import { MdMenu } from "react-icons/md";
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Customerprofile from '../pages/Profile/Customerprofile';

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
   const {currentUser} = useSelector((state)=>state.auth);
   const navigate=useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleDashboardNavigation = () => {
    if (currentUser?.role === 'admin') {
      navigate('/adminp');
    } else if (currentUser?.role === 'customer') {
      navigate('/customerp');
    } else if (currentUser?.role === 'restaurant_owner') {
    
        navigate('/restaurantp');
    } else if (currentUser?.role === 'delivery') {
        navigate('/deliveryp');
    } else {
        navigate('/'); // Fallback if role is not recognized
    }
};

  return (
    <header className='container shadow-md bg-white max-w-full'>
      <div className='mx-auto p-3 flex justify-between items-center max-w-6xl'>
        <h1 className='text-3xl font-bold text-orange-500'>Tumtum.</h1>
        <div className='hidden sm:flex gap-4'>
          <ul className='flex gap-4'>
          <Link to='/'>
           <li className='text-slate-700 hover:underline'>Home</li>
           </Link>
            <li className='text-slate-700 hover:underline'>Menu</li>
            <li className='text-slate-700 hover:underline'>Contact us</li>
          </ul>
        </div>
        <form className='flex items-center'>
          <input
            type='text'
            placeholder='Search...'
            className='bg-transparent focus:outline-none w-24 sm:w-52 border-b-2 border-slate-300'
          />
          <button type='submit' className='ml-2'>
            <FaSearch className='text-slate-700 text-2xl' />
          </button>
        </form>
        <button className='ml-4'>
          <FaBasketShopping className='text-slate-950 font-semibold text-3xl' />
        </button>
        <div onClick={currentUser ? handleDashboardNavigation : undefined} className="cursor-pointer ">
                    {currentUser ? (
                        <img
                            className='rounded-full h-7 w-7 object-cover hidden sm:block '
                            src={currentUser.avatar}
                            alt='profile'
                        />
                    ) : (
                        <Link to='/signin'>
                            <li className='text-slate-700 hover:underline'>Sign in</li>
                        </Link>
                    )}
                </div>
        <button onClick={toggleMobileMenu} className='sm:hidden text-slate-700'>
        <MdMenu  className='text-3xl font-bold text-slate-950'/>
        </button>
      </div>
      
      {isMobileMenuOpen && (
        <div className='sm:hidden flex flex-col items-start p-2 left-0'>
          <ul className='flex flex-col gap-2'>
           <Link to='/'>
           <li className='text-slate-700 hover:underline'>Home</li>
           </Link>
            <li className='text-slate-700 hover:underline'>Menu</li>
            <li className='text-slate-700 hover:underline'>Contact us</li>
            <div onClick={currentUser ? handleDashboardNavigation : undefined} className="cursor-pointer">
                    {currentUser ? (
                        <img
                            className='rounded-full h-7 w-7 object-cover'
                            src={currentUser.avatar}
                            alt='profile'
                        />
                    ) : (
                        <Link to='/signin'>
                            <li className='text-slate-700 hover:underline'>Sign in</li>
                        </Link>
                    )}
                </div>
          </ul>
        </div>
      )}
    </header>
  );
}

export default Header;




