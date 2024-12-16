import React from 'react'
import { useState } from 'react'

const ForgotPass = () => {

const [email,Setemail]=useState('')


const emailUpdate=(e)=>{

  Setemail(e.target.value)

}
  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log('email submitted',email)
  }
  return (
<div className="flex flex-col justify-center items-center h-screen w-screen  bg-[url('/images/phonesignup.png')] sm:bg-[url('/images/tabsignup.png')] md:bg-[url('/images/pcsignup.png')]">
<div className='flex flex-col backdrop-blur-sm border-4 border-orange-500 p-[30px] rounded-[10px] m-[30px]  '> 
        <div className="font-bold text-4xl  flex justify-center items-center mt-[20px]" >Reset Password </div>
        <p className='text-center mt-[20px] text-slate-500'>Please enter your email address to request a password reset</p>
        <form action="" onSubmit={handleSubmit} className="flex flex-col items-center gap-4 mt-[20px]">
            <input type="email" name="email"
             className="text-lg  border-2  rounded-md transition ease-in-out duration-300 w-[80%] p-[9px] mt-[20px] hover:border-orange-500 " 
             id="" value={email} onChange={emailUpdate} placeholder='*****gmail.com' />
            <button className="bg-orange-500 p-[10px] rounded-[20px] text-white text-sm mt-[20px]" >SEND NEW PASSWORD </button>
        </form>
    </div>


    </div>
  )
}

export default ForgotPass