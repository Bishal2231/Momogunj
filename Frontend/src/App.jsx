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
import Success from './Pages/BuyItemsPage/Esewa/Success/Success'
import Failure from './Pages/BuyItemsPage/Esewa/Failure/Failure'
import ForgotPassMessage from './Pages/ForgotPass/ForgotPassMessage/ForgotPassMessage'

import AddToCart from './Pages/AddToCart/AddToCart'
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
  backgroundImage: "/images/items/chowmin.jpg",
  subTags: ["chowmin", "veggies", "Fast Food"],
  rating: "4 (99+)",
  estimatedTime: "30-45 mins",
  type:"veg",
  id:1,
  foodLink:"chowmein",
  price:120

},{
  name: " chicken chowmin",
  backgroundImage: "/images/items/nonvegChowmin.jpg",
  subTags: ["chowmin3", "veggies", "Fast Food"],
  rating: "5 (99+)",
  estimatedTime: "30-45 mins",
  type:"non-veg",
  id:2,
  foodLink:"chowmein",
  price:160


}]
const momoArr=[{
  name: " Steam Momo",
  backgroundImage: "/images/items/momoom.jpg",
  subTags: ["steam", "veggies", "Fast Food"],
  rating: "5 (99+)",
  estimatedTime: "30-45 mins",
  type:"veg",
  id:"1",
  price:300,
  foodLink:"momo"
  
},{
  name: "Fried momo",
  backgroundImage: "/images/items/FriedMomo.jpg",
  subTags: ["fried", "crispy", "Fast Food"],
  rating: "5 (99+)",
  estimatedTime: "30-45 mins",
  type:"veg",
  id:"2",
  price:300,
  foodLink:"momo",
  



}]
const SoftDrinkArr = [
  {
    name: "Pepsi",
    backgroundImage: "/images/items/pepsi.jpg",
    subTags: ["cool", "sweet"],
    rating: "5 (99+)",
    estimatedTime: "15-20 mins",
    type: "cold drink",
    id: 1,
    foodLink: "softdrink",
    price:100,
    drink:true

  },
  {
    name: "Coca Cola",
    backgroundImage: "/images/items/cocacola.jpg",
    subTags: ["dew", "daring", "cool"],
    rating: "5 (99+)",
    estimatedTime: "15-20 mins",
    type: "cold drink",
    id: 2,
    foodLink: "softdrink",
    price:100,
    drink:true

  }
];

// const MomoData={
//   name:"MoMo",
//   rating:"5",
//   price:300,
//   description:"very tasty MoMo to enjoy your day",
//   backgroundImage:"/images/items/momoom.jpg",
//   altImg:"momo IMG",
//   type:"non-veg",
//   drink:false
// }
// const ChowmeinData={
//   name:"Chowmien",
//   rating:"5",
//   price:300,
//   description:"very tasty Chowmien to enjoy your day ,try it with some extra sauce",
//   backgroundImage:"/images/items/chowmin.jpg",
//   type:"veg",
//   drink:false,
//   altImg:"Chowmien IMG",

// }
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
  <Route path="/forgot-password" element={

<ForgotPass />

}/>
<Route path='/forgot-password/:message' element={<ForgotPassMessage  />}/>
<Route path="/ItemsDetail/:fooditem" element={<ItemsDetail  />}/>
{/* <Route path="/ItemsDetail/chowmein-list" element={<ItemsDetail  section={"Chowmein"} itemArr={chowminArr} />}/>
<Route path="/ItemsDetail/softdrinks-list" element={<ItemsDetail section={"Soft drink"} itemArr={SoftDrinkArr}/>}/> */}

{/* <Route path="/Items/Purchase/momo/:id" element={<BuyItemsPage itemDetails={momoArr} />}/>
<Route path="/Items/Purchase/chowmein/:id" element={<BuyItemsPage itemDetails={chowminArr} />}/>
<Route path="/Items/Purchase/softdrinks/:id" element={<BuyItemsPage itemDetails={SoftDrinkArr} />}/> */}

<Route path="/Items/Purchase/:foodLink/:id" element={<BuyItemsPage itemDetails={SoftDrinkArr} />}/> 


<Route path='/payment-success'element={<Success/>}/>
<Route path='/payment-failure' element={<Failure/>}/>


<Route path='/user-cart' element ={<AddToCart/>}/>
    </Routes>
    <Toaster/>
    </>
  )
}

export default App