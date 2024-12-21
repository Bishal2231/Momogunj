

import React from "react";
import { userAuthStore } from '../../Store/authStore';
import { Link } from 'react-router-dom';
import Navbar from "../Components/Navbar/Navbar";

const Home = () => {

   const {user}=userAuthStore()

  return (
    <div>
 <Navbar/>

      <section className="p-4 mb-3">
        <h2 className="text-lg font-semibold">Popular Items</h2>
        <div className="flex gap-4 overflow-x-auto mt-2">
          <Link to="/Items/Purchase/chowmein/1">
          <div className="bg-white rounded-lg shadow-md min-w-[200px] overflow-hidden">
            <img
              src="images/items/bowl-noodles-with-bell-peppers-chopstick-wooden-desk.jpg"
              alt="Chow Mein Veg"
              className="w-full h-[120px] object-cover"
            />
            <div className="p-3">
              <p className="text-red-600 font-bold">NRS 150</p>
              <p className="text-sm text-gray-500">⭐ 4.5 (25+)</p>
              <h3 className="text-md mt-1">Chow Mein Veg</h3>
              <p className="text-sm text-gray-400">Veggies with soup</p>
            </div>
          </div>
          </Link>
          <Link to="/Items/Purchase/momo/1">

          <div className="bg-white rounded-lg shadow-md min-w-[200px] overflow-hidden">
            <img
              src="images/items/dmplings.jpg"
              alt="Fried MOMO"
              className="w-full h-[120px] object-cover"
            />
            <div className="p-3">
              <p className="text-red-600 font-bold">NRS 150</p>
              <p className="text-sm text-gray-500">⭐ 4.5 (25+)</p>
              <h3 className="text-md mt-1">Fried MOMO: Chi</h3>
              <p className="text-sm text-gray-400">Crispy fried chicken MOMO</p>
            </div>
          </div>
          </Link>
        </div>
      </section>

      <section className="p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">FEATURED ITEMS</h2>
          <a href="#" className="text-red-600 text-sm">
            View All &gt;
          </a>
        </div>
        <div className="flex flex-wrap gap-4 mt-3">
          <Link to="/ItemsDetail/momo-list">
          <div className="relative overflow-hidden rounded-lg bg-white flex-1 flex-grow">
            <img
              src="images/items/dumplings-plastic-container-sauce.jpg"
              alt="MOMO"
              className="w-full h-[150px] object-cover"
            />
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white p-2 rounded-md">
              MOMO:
            </div>
          </div>
          </Link>
          <Link to="/ItemsDetail/chowmein-list">   
          <div className="relative overflow-hidden rounded-lg bg-white flex-1 flex-grow">
            <img
              src="images/items/bowl-noodles-with-bell-peppers-chopstick-wooden-desk.jpg"
              alt="Chowmein"
              className="w-full h-[150px] object-cover"
            />
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white p-2 rounded-md">
              Chowmein
            </div>
          </div>
          </Link>
          <Link to="/ItemsDetail/softdrinks-list">
          <div className="relative overflow-hidden rounded-lg bg-white flex-1 flex-grow">
            <img
              src="images/items/istockphoto-472699172-612x612.jpg"
              alt="Soft Drinks"
              className="w-full h-[150px] object-cover"
            />
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white p-2 rounded-md">
              Soft Drinks
            </div>
          </div>
          </Link>
        </div>
        
      </section>

      //     <h1>hello {user?user.name:"world"}  </h1>

     <h1> working home route </h1>     <br></br>
   <br></br>
     <br></br><br></br><br></br>
   <Link to="/signup">signup</Link><br></br>
    <br></br>
     <br></br>
   <br></br>
   <Link to="/login">


   LOGIN</Link><br></br>
   <br></br>
   <br></br>
   <br></br>
   <Link to="/verify-OTP">verify OTP</Link><br></br> <br></br><br></br>

   <Link to="/forget-password">    forget-password
</Link><br></br>
    </div>
  );
};

export default Home;
