import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userAuthStore } from '../../Store/authStore';
import { Loader } from 'lucide-react';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    avatar: null, // Ensure avatar is initialized as null
  });

  const { signup, error, isLoading } = userAuthStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // Handle file input separately
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'avatar' ? files[0] : value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { name, email, password, avatar } = formData;
  
    const data = new FormData();
    data.append('name', name);
    data.append('email', email);
    data.append('password', password);
    if (avatar) data.append('avatar', avatar);
  
    try {
      await signup(data); // FormData passed directly
      navigate('/verify-email');
    } catch (err) {
      console.error(err);
    }
  };
  

  return (
    <div className="flex justify-center w-screen bg-white items-center h-screen bg-[url('/images/wallpaper/phonesignup.png')] sm:bg-[url('/images/wallpaper/tabsignup.png')] md:bg-[url('/images/wallpaper/pcsignup.png')]">
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
            <span className="text-slate-500 text-md mt-4">Avatar</span>
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={handleChange}
              className="border-2 border-black transition duration-300 ease-in-out hover:border-orange-500 p-1 rounded-md text-xl"
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
            {error && <p className="text-red-500">{error}</p>}
            <button
              type="submit"
              disabled={isLoading}
              className="text-xl text-white rounded-[20px] bg-orange-500 w-full sm:w-[220px] p-3 self-center mt-8"
            >
              {isLoading ? (
                <Loader className="animate-spin mx-auto" />
              ) : (
                'Sign Up'
              )}
            </button>
          </form>
          <p className="text-center">
            Already have an account?{' '}
            <Link to="/login" className="text-orange-500">
              LOGIN
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
