import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { userAuthStore } from '../../Store/authStore';
import { Mail, Lock, Loader } from "lucide-react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const {login,isLoading,error}=userAuthStore();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
// const {isLoading}=false;
  const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle login logic here, such as sending the data to the backend
    console.log(formData);
    await login(formData.email,formData.password)
  };

  return (
    <div className="flex justify-center w-screen bg-white items-center h-screen bg-[url('/images/wallpaper
    /phonesignup.png')] sm:bg-[url('/images/wallpaper/tabsignup.png')] md:bg-[url('/images/wallpaper/pcsignup.png')]">
      <div className="mainContainer flex flex-col w-[90vw] m-[10px] backdrop-blur-sm border-4 border-orange-500 p-[20px] rounded-[15px] md:w-[80vw] md:p-[50px]">
        <h2 className="text-black font-bold text-4xl">Login</h2>
        <div>
          <form onSubmit={handleSubmit} className="flex flex-col py-8 w-full">
            <span className="text-slate-600 text-md mt-4">E-mail</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border-2 border-black transition duration-300 ease-in-out hover:border-orange-500 p-1 rounded-md text-xl"
              placeholder="****@gmail.com"
              required
            />
            <span className="text-slate-600 text-md mt-4">Password</span>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border-2 border-black transition duration-300 ease-in-out hover:border-orange-500 p-1 rounded-md text-xl"
              placeholder="*****"
              required
            />
            <Link to="/forget-password" className="text-center text-orange-500 mt-[18px] text-nowrap">Forgot password?</Link>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <button
              type="submit"
              className="text-xl text-white rounded-[20px] bg-orange-500 w-full sm:w-[220px] p-3 self-center mt-2"
           disabled={isLoading} > {isLoading ? <Loader className='w-6 h-6 animate-spin  mx-auto' /> : "Login"}
              
            </button>
          </form>
          <p className="text-center">
            Don't have an account?{' '}
            <Link to="/signup" className="text-orange-500">Sign Up
            </Link>
          
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
