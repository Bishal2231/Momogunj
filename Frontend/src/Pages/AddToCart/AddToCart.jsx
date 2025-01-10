import React from 'react'
import { useState } from 'react';
 import Navbar from '../Components/Navbar/Navbar'
const AddToCart = () =>{
    const [cartItems, setCartItems] = useState([
      {
        id: 1,
        name: 'Steam MOMO: veg',
        description: 'steam, spicy, veg',
        price: 150,
        quantity: 2,
        image: 'https://via.placeholder.com/60',
      },
      {
        id: 2,
        name: 'Chowmein: nonveg',
        description: 'with baked veggies',
        price: 150,
        quantity: 2,
        image: 'https://via.placeholder.com/60',
      },
    ]);
  
    const DELIVERY_FEE = 0;
  
    const updateQuantity = (id, change) => {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(1, item.quantity + change) }
            : item
        )
      );
    };
  
    const removeItem = (id) => {
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    };
  
    const subtotal = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const total = subtotal + DELIVERY_FEE;
  
    return (
        <div>    
            
            <div > <Navbar/></div>
            
             <div className="max-w-lg mx-auto p-5 bg-white shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-5">Cart</h1>
        <div>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between mb-4 border-b pb-2"
            >
              <button
                className="text-red-500 font-bold text-lg absolute top-0 right-0"
                onClick={() => removeItem(item.id)}
              >
                ×
              </button>
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 rounded object-cover"
              />
              <div className="flex-1 ml-3">
                <h4 className="font-bold">{item.name}</h4>
                <p className="text-gray-500 text-sm">{item.description}</p>
                <p className="text-orange-500 font-bold">NRS {item.price}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  className="bg-red-500 text-white w-8 h-8 rounded-full"
                  onClick={() => updateQuantity(item.id, -1)}
                >
                  −
                </button>
                <span className="font-bold">{item.quantity}</span>
                <button
                  className="bg-red-500 text-white w-8 h-8 rounded-full"
                  onClick={() => updateQuantity(item.id, 1)}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="text-lg font-semibold my-2 flex justify-between">
          <span>Subtotal:</span> <span>NRS {subtotal.toFixed(2)}</span>
        </div>
        <div className="text-lg font-semibold my-2 flex justify-between">
          <span>Delivery:</span> <span>NRS {DELIVERY_FEE.toFixed(2)}</span>
        </div>
        <div className="text-lg font-semibold my-2 flex justify-between">
          <span>Total:</span> <span>NRS {total.toFixed(2)}</span>
        </div>
        <button className="w-full bg-red-500 text-white py-3 rounded mt-5">
          Checkout
        </button>
      </div>
      </div> 
    );
  };

export default AddToCart