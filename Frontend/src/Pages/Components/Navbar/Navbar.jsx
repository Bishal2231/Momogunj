import React, { useState, useEffect, useRef } from 'react';
import { FaUser } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { userAuthStore } from '../../../Store/authStore';
import { GiHamburgerMenu } from "react-icons/gi";
// import BottomBar from '../BottomBar/BottomBar';

const Navbar = () => {
  const [hambuger, setHamburger] = useState(false);
  const hamburgerRef = useRef(null); // Reference for the hamburger menu div

  const handleHamburger = () => {
    setHamburger(!hambuger);
  };

  // Close hamburger menu when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (hamburgerRef.current && !hamburgerRef.current.contains(event.target)) {
        setHamburger(false); // Close hamburger menu if clicked outside
      }
    };

    // Add event listener to document
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('wheel', handleClickOutside);


    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const { user,logout } = userAuthStore();


 const  handleLogout=async()=>{
   await logout()
   setHamburger(!hambuger)
 }
  return (
    <div>    
      <header className="bg-white shadow-md sticky top-0 p-4 text-center">
        <div className="flex justify-between items-center">
          <div className="flex-1 text-center">
            <div className="text-red-600 text-2xl font-bold">MOMO:gunj</div>
          </div>

          <div className="flex items-center gap-[15px]"> 
            {user ? (
              <div className="rounded overflow-hidden">       
                <img 
                  src={user.avatar} 
                  alt="avatar" 
                  className="w-[10vw] h-[10vw] object-cover rounded-full 
                    sm:w-[12vw] sm:h-[12vw] 
                    md:w-[10vw] md:h-[13vh] 
                    lg:w-[8vw] lg:h-[8vh]" 
                />
              </div>
            ) : (
              <div className="flex space-x-2 items-center">
                <div className='text-red-400'> 
                  <Link to="/login"> 
                    <FaUser />
                  </Link>  
                </div>
                <div className="text-red-400">/ <Link to="/signup">Sign up</Link> </div>
              </div>
            )}
            <GiHamburgerMenu onClick={handleHamburger} className='text-[25px] text-red-400' />
          </div>
        </div>

        {/* Hamburger Menu */}
        {hambuger && (
          <div ref={hamburgerRef} className={`fixed top-0 right-0 w-64 p-[20px] mt-[80px] mr-[1px] bg-red-800
           text-white flex flex-col justify-center items-center z-40 rounded 
           transition-transform duration-500 ease-in-out ${hambuger ? 'translate-x-0' : 'translate-x-full'}`}>
            <ul className="space-y-6 text-xl">
              <li>Home</li>
              <li>About</li>
              <li>Service</li>
              <li>Contact</li>
              <li onClick={handleLogout}>Log Out</li>
            </ul>
          </div>
        )}
      </header>

      <div className="flex justify-center mt-2">
        <input
          type="text"
          placeholder="Find Food on MOMO:gunj..."
          className="w-4/5 p-2 border border-gray-300 rounded-full focus:outline-none"
        />
        <button className="text-xl ml-[-30px] focus:outline-none">⚙</button>
      </div>
    </div>
  );
}

export default Navbar;
