import React, { useState } from 'react';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log(formData);
  };

  return (
    <div className="flex justify-center w-screen bg-white items-center h-screen bg-[url('/images/phonesignup.png')] sm:bg-[url('/images/tabsignup.png')] md:bg-[url('/images/pcsignup.png')]">
      <div className="mainContainer flex flex-col w-[90vw] m-[10px] backdrop-blur-sm border-4 border-orange-500 p-[20px] rounded-[15px] md:w-[80vw] md:p-[50px]">
        <h2 className="text-black font-bold text-4xl">Sign Up</h2>
        <div>
          <form onSubmit={handleSubmit} className="flex flex-col py-8 w-full">
            <span className="text-slate-500 text-md mt-2">Full name</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border-2 border-black transition duration-300 ease-in-out hover:border-orange-500 p-1 rounded-md text-xl"
              placeholder="Suranjan / Ram etc"
              required
            />
            <span className="text-slate-500 text-md mt-4">E-mail</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border-2 border-black transition duration-300 ease-in-out hover:border-orange-500 p-1 rounded-md text-xl"
              placeholder="****@gmail.com"
              required
            />
            <span className="text-slate-500 text-md mt-4">Password</span>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border-2 border-black transition duration-300 ease-in-out hover:border-orange-500 p-1 rounded-md text-xl"
              placeholder="*****"
              required
            />
            <button
              type="submit"
              className="text-xl text-white rounded-[20px] bg-orange-500 w-full sm:w-[220px] p-3 self-center mt-8"
            >
              Sign Up
            </button>
          </form>
          <p className="text-center">
            Already have an account?{' '}
            <a href="/login" className="text-orange-500">
              LOGIN
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
