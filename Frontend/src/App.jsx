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
import ItemsDetail from './Pages/ItemsDetail/ItemsDetails'
import BuyItemsPage from './Pages/BuyItemsPage/BuyItemsPage'



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

const chowminArr=[{
  name: "  chowmin",
  image: "/images/items/chowmin.jpg",
  subTags: ["chowmin", "veggies", "Fast Food"],
  rating: "5 (99+)",
  estimatedTime: "30-45 mins",
  type:"veg"
},{
  name: " chicken chowmin",
  image: "/images/items/nonvegChowmin.jpg",
  subTags: ["chowmin3", "veggies", "Fast Food"],
  rating: "5 (99+)",
  estimatedTime: "30-45 mins",
  type:"non-veg"
}]
const momoArr=[{
  name: " Steam Momo",
  image: "/images/items/momoom.jpg",
  subTags: ["steam", "veggies", "Fast Food"],
  rating: "5 (99+)",
  estimatedTime: "30-45 mins",
  type:"veg",
  id:"123"
},{
  name: "Fried momo",
  image: "/images/items/FriedMomo.jpg",
  subTags: ["fried", "crispy", "Fast Food"],
  rating: "5 (99+)",
  estimatedTime: "30-45 mins",
  type:"veg",
  id:"234"

}]
const SoftDrinkArr=[{
  name: "pepsi",
  image: "/images/items/pepsi.jpg",
  subTags: ["cool", "sweet"],
  rating: "5 (99+)",
  estimatedTime: "15-20 mins",
type:"cold drink"},{
  name: "coca cola ",
  image: "/images/items/cocacola.jpg",
  subTags: ["dew", "daring", "coool"],
  rating: "5 (99+)",
  estimatedTime: "15-20 mins",
  type:"cold drink"
}
]

const MomoData={
  name:"MoMo",
  rating:"5",
  price:300,
  description:"very tasty MoMo to enjoy your day",
  backgroundImage:"/images/items/momoom.jpg",
  altImg:"momo IMG",
  type:"non-veg",
  drink:false
}
const ChowmeinData={
  name:"Chowmien",
  rating:"5",
  price:300,
  description:"very tasty Chowmien to enjoy your day ,try it with some extra sauce",
  backgroundImage:"/images/items/chowmin.jpg",
  type:"veg",
  drink:false,
  altImg:"Chowmien IMG",

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
<Route path="/ItemsDetail/Momo" element={<ItemsDetail section={"Momo"}
itemArr={momoArr} />}/>
<Route path="/ItemsDetail/Chowmein" element={<ItemsDetail 
section={"Chowmein"} 
itemArr={chowminArr} />}/>
<Route path="/ItemsDetail/SoftDrinks" 
element={<ItemsDetail section={"Soft drink"} itemArr={SoftDrinkArr}/>}/>

<Route path="/Items/Purchase/Momo" element={<BuyItemsPage itemDetail={MomoData} />}/>
<Route path="/Items/Purchase/Chowmein" element={<BuyItemsPage itemDetail={ChowmeinData} />}/>

<Route path="/forget-password" element={<ForgotPass/>}/>
    </Routes>
    <Toaster/>
    </>
  )
}

export default App