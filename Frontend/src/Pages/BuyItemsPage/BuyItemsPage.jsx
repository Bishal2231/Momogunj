import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import { CiCircleCheck } from "react-icons/ci";
import FinalDes from './FinalDes.jsx/FinalDes';
import { userAuthStore } from '../../Store/authStore';



const BuyItemsPage = () => {
  const {id,foodLink}=useParams()
const [itemDetail,SetitemDetail]=useState({})
const {getitemDetails} = userAuthStore()
const [addToCart,SetaddToCart]=useState({})
useEffect(()=>{
  const data =async()=> { 
    const response=await getitemDetails(id,foodLink)
    console.log("response",response.data)
    SetitemDetail(response.data)
  }
  data();
},[getitemDetails])



  const [totalPrice,setTotalPrice]=useState(0)
  const [Price,setPrice]=useState()

  const [noItems,SetnoItems]=useState(1)
  const [soup,Setsoup]=useState(false)
  const [chutni,Setchutni]=useState(false)
  const [finalDesPage,SetFinalDesPage]=useState(false)
const soupPrice=20;
const chutniPrice=20;
  const increseNoItems=()=>{
    SetnoItems(noItems+1)
  }
  const decreaseNoItems=()=>{
    noItems>1?
    SetnoItems(noItems-1):null
  }
  const extraSoup=()=>{
    Setsoup(!soup)
    console.log(id)//remove aafter use
  }
  const extraChutney=()=>{
    Setchutni(!chutni)
  }
 const onClose=()=>{
  SetFinalDesPage(!finalDesPage)
 }

  //   useEffect(()=>{
  //  const   TOTALPRICE=itemDetail.price* noItems+soup*soupPrice+chutni*chutniPrice
  //  console.log(TOTALPRICE)
  //   })
  useEffect(() => {
    
    const TOTALPRICE =
      itemDetail.price * noItems +
      (soup ? soupPrice : 0) +
      (chutni ? chutniPrice : 0);
    setTotalPrice(TOTALPRICE);
    console.log("Calculated Total Price:", TOTALPRICE); // Use this for debugging
  }, [itemDetail.price, noItems, soup, chutni]);
  
  const handleAddToCart = () => {
    // Add item to cart
    SetaddToCart({
      id: itemDetail._id,
      name: itemDetail.name,
      price:  totalPrice,
      quantity: noItems,
      soup: soup,
      chutni: chutni,
totalPrice:totalPrice    });

  }
  console.log("Added to cart:", addToCart); // Use this for debugging

  return (
    <div className="p-5 relative ">
     { finalDesPage && <FinalDes className="absolute " itemDetail=
{itemDetail} onClose={onClose} noItems={noItems} totalPrice={totalPrice}   soup={soup} chutni={chutni}/>   } 
      <div className="relative rounded-lg overflow-hidden mb-5">
        <img
          src={itemDetail.backgroundImage}
          alt={itemDetail.backgroundImage}
          className="w-full h-40 object-cover rounded-lg shadow-lg"
        />
        <div className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 cursor-pointer">
          <i className="fas fa-heart"></i>
        </div>
      </div>
      <div className="text-left mb-5">
        <h2 className="text-xl font-semibold text-gray-800">{itemDetail.name}:<span>{itemDetail.type} </span> </h2>
        <div className="flex items-center text-yellow-500 text-sm my-2">
          <i className="fas fa-star mr-1"></i>
          <span className='flex items-center gap-[3px]'><FaStar/>{itemDetail.rating}</span>
        </div>
        <div className="text-lg text-red-600 font-bold">  { ( itemDetail.price)}</div>
      </div>

      <div className="flex items-center space-x-4 mb-5">
        <button onClick={decreaseNoItems} className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg">-</button>
        <span className="text-lg text-gray-800">{noItems}</span>
        <button onClick={increseNoItems} className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg">+</button>
      </div>

      <div className="text-sm text-gray-600 mb-5 leading-6">
{itemDetail.description}      </div>

      <div className={itemDetail.drink ? " hidden " : "mt-5"} >
        <h3 className="text-lg font-medium text-gray-800 mb-3">Choice of Add On </h3>
        <div className="flex items-center justify-between mb-3">
          <img
            src="/images/items/top-view-delicious-noodles-concept.jpg"
            alt="Soup"
            className="w-10 h-10 rounded-lg mr-3"
          />
          <span className="flex-grow text-gray-800">SOUP</span>
          <div className='flex gap-4'> 
           
          <p className="flex items-center
          
          " >
  Extra:
  <CiCircleCheck
    onClick={extraSoup}
    className={`text-2xl ${
      soup ? "bg-red-500 text-white rounded-full" : ""
    }`}
  />
</p>                 </div>
         

        </div>
        <div className="flex items-center justify-between">
          <img
            src="/images/items/noodles-with-beef-vegetables-black-table.jpg"
            alt="Chutni"
            className="w-10 h-10 rounded-lg mr-3"
          />
          <span className="flex-grow text-gray-800">chutni</span>
          <div className='flex gap-4'> 
           
          <p className="flex items-center
          
          " >
  Extra:
  <CiCircleCheck
    onClick={extraChutney}
    className={`text-2xl ${
      chutni ? "bg-red-500 text-white rounded-full" : ""
    }`}
  />
</p>
                 </div>
        </div>
        {/* <h1>Total:</h1> */}
      </div>

      <div className="flex justify-between mt-8 space-x-4">
        <button onClick={()=>handleAddToCart()}  className="flex-1 py-2 bg-yellow-500 text-white text-lg font-bold rounded-lg">Add to Cart</button>
        <button onClick={onClose} className="flex-1 py-2 bg-red-600 text-white text-lg font-bold rounded-lg">Place Order</button>
      </div>
    </div>
  );
};

export default BuyItemsPage;
