import React from "react";
import ItemCard from "./Items-card/ItemsCard";
import Navbar from "../Components/Navbar/Navbar";
import { Link } from "react-router-dom";
// import { useParams } from "react-router-dom";
// Reusable ItemCard Component


const ItemsDetail = ({section,itemArr}) => {
  // const section =useParams()
  // const item = {
  //   name: "SteamMOMO",
  //   image: "/images/items/momoom.jpg",
  //   subTags: ["momo", "veggies", "Fast Food"],
  //   rating: "4.7 (99+)",
  //   estimatedTime: "30-45 mins",
  //   veg:true
  // };

  // const item = {
  //   name: "SteamMOMO",
  //   image: "/images/items/momoom.jpg",
  //   subTags: ["momo", "veggies", "Fast Food"],
  //   rating: "4.7 (99+)",
  //   estimatedTime: "30-45 mins",
  //   veg:true
  // };
  // const dataArray = [
  //   {
  //     name: "Spicy Chicken Pizza",
  //     image: "https://example.com/images/spicy-chicken-pizza.jpg",
  //     subTags: ["Pizza", "Spicy", "Non-Veg"],
  //     rating: 4.5,
  //     estimatedTime: "30 mins",
  //     delivery: "Free Delivery",
  //     type: "Food",
  //   },
  //   {
  //     name: "Vanilla Ice Cream",
  //     image: "https://example.com/images/vanilla-ice-cream.jpg",
  //     subTags: ["Dessert", "Sweet", "Veg"],
  //     rating: 4.8,
  //     estimatedTime: "10 mins",
  //     delivery: "Paid Delivery",
  //     type: "Dessert",
  //   },
  //   {
  //     name: "Veggie Burger",
  //     image: "https://example.com/images/veggie-burger.jpg",
  //     subTags: ["Burger", "Healthy", "Veg"],
  //     rating: 4.2,
  //     estimatedTime: "25 mins",
  //     delivery: "Free Delivery",
  //     type: "Food",
  //   },
  //   {
  //     name: "Mocha Coffee",
  //     image: "https://example.com/images/mocha-coffee.jpg",
  //     subTags: ["Coffee", "Beverage", "Hot"],
  //     rating: 4.7,
  //     estimatedTime: "15 mins",
  //     delivery: "Free Delivery",
  //     type: "Beverage",
  //   }
  // ];
  

  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen">
<Navbar/>

      {/* Momo Section */}
      <section className="p-4">
        <h2 className="text-lg font-bold mb-4">{section} Section</h2>


     

      {
        itemArr.map((data,index)=>(
          <div key={index}>
            <Link to={`/Items/Purchase/${data.foodLink}/${data.id}`}>   
          <ItemCard       
         name={data.name}
       image={data.backgroundImage}
       subTags={data.subTags}
       rating={data.rating}
       estimatedTime={data.estimatedTime}
       delivery={data.delivery}
       type={data.type}  />
       </Link>
       </div>    
           ))
      }

</section>

    </div>
  );
};

export default ItemsDetail;

