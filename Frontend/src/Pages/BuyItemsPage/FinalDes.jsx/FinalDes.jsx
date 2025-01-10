import React from 'react';
import PaymentFormEsewa from '../Esewa/PaymentFormEsewa/PaymentFormEsewa';
import { userAuthStore } from '../../../Store/authStore';
import {v4 as uuidv4} from 'uuid'
const FinalDes = ({
  itemDetail,
  noItems,
  totalPrice,

  soup,
  chutni,
  onClose, // Function to close the popup
}) => {
const {khaltiSend} = userAuthStore()

  const onKhaltiPay=async()=>{
    console.log('working');
    const itemId =uuidv4();
   
    await khaltiSend(itemId,totalPrice)
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      {/* Popup Container */}
      <div className="bg-white w-[90%] md:w-[60%] p-0 flex rounded-lg shadow-lg relative overflow-hidden">
        {/* Background Image */}
        <div
          className="hidden md:block w-1/3 bg-cover bg-center"
          style={{
            backgroundImage: `url(${itemDetail.backgroundImage})`,
          }}
        ></div>

        {/* Content Section */}
        <div className="w-full md:w-2/3 p-6 relative">
          {/* Close Button */}
          <button
            className="absolute top-2 right-2 text-red-500 text-2xl font-bold"
            onClick={onClose}
          >
            &times;
          </button>

          {/* Payment Summary */}
          <div className="text-gray-800">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Payment Summary
            </h2>

            {/* Item Details */}
            <div className="flex items-center mb-4">
              {/* Item Image */}
              <img 
                src={itemDetail.backgroundImage}
                alt={itemDetail.name}
                className="w-16 h-16 rounded-full mr-4  md:hidden"
              />
              {/* Item Name and Quantity */}
              <div>
                <p className="text-lg">Name: {itemDetail.name}</p>
                <p className="text-lg">Quantity: {noItems}</p>
                {!itemDetail.drink && (
                  <div>
                    {chutni && <p className="text-lg">Extra Chutney: Yes</p>}
                    {soup && <p className="text-lg">Extra Soup: Yes</p>}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Total Price */}
          <div className="text-gray-800 text-3xl text-center mt-4">
            Total: RS {totalPrice}
          </div>

          {/* Payment Buttons */}
          <div className="flex justify-evenly mt-6 gap-[2rem]">
           
            <button
              className="text-lg bg-purple-600 text-white px-6 py-3 rounded hover:bg-purple-700"
              onClick={onKhaltiPay}
            >
              Pay with Khalti
            </button>
            {/* <button
              className="text-lg bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
              onClick={onEsewaPay}
            >
              Pay with Esewa
            </button> */}
            <PaymentFormEsewa amount={totalPrice}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalDes;
