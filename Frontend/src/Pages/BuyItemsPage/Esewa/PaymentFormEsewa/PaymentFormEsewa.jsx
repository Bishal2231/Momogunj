import React from 'react'
import { INITIATE_PAYMENT_URL } from '../../../../Store/authStore'
import { generateUniqueId } from '../../../../Store/authStore'
import axios from 'axios'
import { useState } from 'react'
import { userAuthStore } from '../../../../Store/authStore'
const PaymentFormEsewa = ({amount}) => {
const {EsewaSend}=userAuthStore()
  const handlePayment=async(e)=>{



e.preventDefault();
    await EsewaSend(amount)

    //     try {
    //   const response = await axios.post(
    //     INITIATE_PAYMENT_URL, //server payment route
    //     {
    //       amount,
    //       productId: generateUniqueId(),
    //     }
    //   );

    //   window.location.href = response.data.url;
    // } catch (error) {
    //   console.error("Error initiating payment:", error);
    // }
  }
  return (
    <div>
      <form  onSubmit={handlePayment}>
    <button type="submit" className="bg-green-500 text-white text-2xl p-[15px] rounded"> Pay with Esewa</button>
    </form>
    </div>
  )


}

export default PaymentFormEsewa