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
function App() {
  return (
    <div>
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/signin' element={<Signin/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route element={<PrivateRoute/>}>
      <Route path='/adminp' element={<Adminprofile/>}/>
      <Route path='/resturantp' element={<ResturantProfile/>}/>
      <Route path='/deliveryp' element={<Deliveyperson/>}/>
      <Route path='/customerp' element={<Customerprofile/>}/>
      </Route>
     </Routes>
     </BrowserRouter>
    </div>
  )
}

export default App
