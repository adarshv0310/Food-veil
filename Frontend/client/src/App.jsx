import React from 'react'
import { BrowserRouter, Routes , Route } from 'react-router-dom';
import Home from './pages/Home';
import Signin from './pages/signin';
import Signup from './pages/signup';

import Adminprofile from './pages/Profile/Adminprofile';
import PrivateRoute from './Components/PrivateRoute';
import Customerprofile from './pages/Profile/Customerprofile';
import Deliveyperson from './pages/Profile/Deliveyperson';
import ResturantProfile from './pages/Profile/ResturantProfile';
import PrivateRouted from './Components/PrivateRouted';
import ResturantForm from './pages/ResturantForm';
function App() {
  return (
    <div>
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/signin' element={<Signin/>} />
      <Route path='/signup' element={<Signup/>} />
      
      <Route path='/adminp' element={<PrivateRoute/>}/>
      <Route path='/restaurantp' element={<PrivateRoute/>}/>
      <Route path='/deliveryp' element={<PrivateRoute/>}/>
      <Route path='/customerp' element={<PrivateRoute/>}/>

      <Route path='/admind' element={<PrivateRouted/>}/>
      <Route path='/restaurantd' element={<PrivateRouted/>}/>
      <Route path='/deliveryd' element={<PrivateRouted/>}/>
      <Route path='/customerd' element={<PrivateRouted/>}/>
      <Route path='/returantform' element={<ResturantForm/>} />
     </Routes>
     </BrowserRouter>
    </div>
  )
}

export default App
