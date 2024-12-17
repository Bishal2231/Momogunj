import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Signup from './Pages/Signup/Signup'
import Login from './Pages/Login/Login'
import VerifyOTP from './Pages/Verify-OTP/Verify-OTP'
import ForgotPass from './Pages/ForgotPass/ForgotPass'
import {Toaster} from "react-hot-toast"
import { userAuthStore  } from './Store/authStore'
import { useNavigate } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import LoadingSpinner from './Pages/Components/LoadingSpinner'



//redirect routes to require autentication
const ProtectedRoute=({children})=>{
  const {isAuthenticated ,user}=userAuthStore();
  if(!isAuthenticated){
    return <Navigate to='/login' replace />
  }
 if(!user.isVerified){
  return <Navigate to='/verify-email' replace />
 }
 return children

}


// redirect authenticed user to route page
const RedirectAutheticatedUser=({children})=>{
  const {isAuthenticated,user}=userAuthStore()
console.log(user)
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

  if(isCheckingAuth){
    return <LoadingSpinner/>
  }
  return (
<> 
    <Routes>
<Route path="/" element={<Home  />}/>  
<Route path="/signup" element={
  
  <RedirectAutheticatedUser>
  <Signup />
  </RedirectAutheticatedUser>
  
  
  }  />


<Route path="/login" element=

{  

  <RedirectAutheticatedUser>
<Login/>
  </RedirectAutheticatedUser>


}/>
<Route path="/verify-email" element={
   <RedirectAutheticatedUser>  
    <VerifyOTP/>
    </RedirectAutheticatedUser>

  
  }/>  
<Route path="/forget-password" element={<ForgotPass/>}/>
    </Routes>
    <Toaster/>
    </>
  )
}

export default App