import React from "react";

const Card = () => {
  return (
    <div className="w-[12.4rem] bg-white rounded-lg shadow-sm border p-2 flex-shrink-0">
      <img
        loading="lazy"
        aria-hidden="true"
        src="https://placehold.co/200x200"
        alt="Dried mango snack from Thailand"
        className="rounded-md mb-4"
      />
      <p className="text-gray-800 font-semibold">
        Manisan Mangga Kering Thailand 500gr
      </p>
      <p className="text-lg font-semibold text-gray-800">Rp115.000</p>
      <p className="text-sm text-gray-500">Tanjung Pinang</p>
      <div className="flex items-center text-sm text-gray-500">
        <span className="text-yellow-400 mr-1">
          <i className="fas fa-star" />
        </span>
        <span>4.9 | 750+ terjual</span>
      </div>
    </div>
  );
};

export default Card;
