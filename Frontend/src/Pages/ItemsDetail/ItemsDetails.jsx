import React, { useEffect, useState } from "react";
import ItemCard from "./Items-card/ItemsCard";
import Navbar from "../Components/Navbar/Navbar";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import { userAuthStore } from "../../Store/authStore";

// const ItemsDetail = ({section,itemArr}) => {
const ItemsDetail = ({ section }) => {
  const { fooditem } = useParams()
  const [itemData, setitemData] = useState([]);

  const [error, setError] = useState("");

  const { getMomoData ,getChowmeinData,getSoftDrinkDaTa} = userAuthStore()
  useEffect(() => {

    const fetchData = async () => {

      if(fooditem==="momo"){     
         const response = await getMomoData();
         if (response) {
          setitemData(response.momoArr)
        }
        else {
          setError("Error fetching data")
        }
      } 
      if(fooditem==="chowmein"){
        const response = await getChowmeinData();
        if (response) {
          setitemData(response.chowmeinArr)
        }
        else {
          setError("Error fetching data")
        }
      }
      if(fooditem==="softdrinks"){
     const response=await getSoftDrinkDaTa();
     if (response) {
      setitemData(response.softdrinkArr)
    }
    else {
      setError("Error fetching data")
    }
      }
      // setitemData(responose.momoArr)
    
    }
    fetchData();
  }, [getMomoData])

  console.log("itemData", itemData)

  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen">
      <Navbar />

      {/* Momo Section */}
      <section className="p-4">
        <h2 className="text-lg font-bold mb-4">{fooditem} Section</h2>


        {error ? <div>{error}</div> : ""}

        {
          itemData.map((data, index) => (
            <div key={index}>
              <Link to={`/Items/Purchase/${data.foodLink}/${data._id}`}>
                <ItemCard
                  name={data.name}
                  image={data.backgroundImage}
                  subTags={data.subTags}
                  rating={data.rating}
                  estimatedTime={data.estimatedTime}
                  delivery={data.delivery}
                  type={data.type} />
              </Link>
            </div>
          ))
        }

      </section>

    </div>
  );
};

export default ItemsDetail;

