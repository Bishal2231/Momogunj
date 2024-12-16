import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Signup from './Pages/Signup/Signup'
import Login from './Pages/Login/Login'
import VerifyOTP from './Pages/Verify-OTP/Verify-OTP'
import ForgotPass from './Pages/ForgotPass/ForgotPass'
import {Toaster} from "react-hot-toast"
import { userAuthStore  } from './Store/authStore'



// redirect
const RedirectAutheticatedUser=({children})=>{
  const {isAuthenticated,user}=userAuthStore()

  if(isAuthenticated&& user.isVerified){
    return <Navigate to="/" replace/>
  }
  return children
}


const App = () => {
  
  
  const {isCheckingAuth,checkAuth,isAuthenticated,user}=userAuthStore()

  useEffect(()=>{
    checkAuth()
  },[checkAuth])
  console.log("authentice",isAuthenticated)
  console.log("user",user)
  return (
<> 
    <Routes>
<Route path="/" element={<Home user={user} />}/>  
<Route path="/signup" element={<Signup />}  />
<Route path="/login" element={<Login/>}/>
<Route path="/verify-email" element={<VerifyOTP/>}/>  
<Route path="/forget-password" element={<ForgotPass/>}/>
    </Routes>
    <Toaster/>
    </>
  )
}

export default App