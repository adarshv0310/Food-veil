import React from 'react'
import { BrowserRouter, Routes , Route } from 'react-router-dom';
import Home from './pages/Home';
import Signin from './pages/signin';
import Signup from './pages/signup';
import Profile from './pages/profile';
function App() {
  return (
    <div>
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/signin' element={<Signin/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/profile' element={<Profile/>} />
     </Routes>
     </BrowserRouter>
    </div>
  )
}

export default App
