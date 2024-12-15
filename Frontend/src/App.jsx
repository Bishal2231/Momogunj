import React from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Signup from './Pages/Signup/Signup'
import Login from './Pages/Login/Login'
import ConformationPage from './Pages/ConformationPage/ConformationPage'

const App = () => {
  return (
<BrowserRouter> 
    <Routes>
<Route path="/" element={<Home/>}/>  
<Route path="/signup" element={<Signup />}  />
<Route path="/login" element={<Login/>}/>
<Route path="/conformation-page" element={<ConformationPage/>}/>  
    </Routes>
    </BrowserRouter>
  )
}

export default App