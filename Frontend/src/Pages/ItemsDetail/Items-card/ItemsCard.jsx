import React from 'react'

const ItemCard = ({ name, image, subTags, rating, estimatedTime,delivery,type }) => {
    return (
      <div className="bg-white rounded-lg shadow-md flex overflow-hidden mb-4">
        <img src={image} alt={name} className="w-32 h-36 object-cover" />
        <div className="p-4 flex flex-col justify-between w-3/5">
          <h3 className="text-base mb-2">
            {name}: <span className="text-gray-500 font-normal">{type}</span>
          </h3>
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <p>🚴 {delivery}</p>
            <p>⏱ {estimatedTime}</p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            {subTags.map((tag, index) => (
              <span key={index} className="bg-gray-200 px-2 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
          <div className="text-red-600 text-sm font-bold mt-2">⭐ {rating}</div>
        </div>
      </div>
    );
  };

export default ItemCard