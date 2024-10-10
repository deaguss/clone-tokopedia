import React from "react";

const PromoCard = () => {
  return (
    <div className="w-[12.4rem] bg-white rounded-lg shadow-sm border p-4 flex-shrink-0">
      <img
        src="https://placehold.co/200x200"
        alt="Set of knives and kitchen tools"
        className="rounded-md mb-4"
      />
      <p className="font-semibold text-gray-800">Rp100</p>
      <p className="text-sm text-gray-500 line-through">Rp224.000</p>
      <p className="text-red-500 font-semibold text-sm">99% OFF</p>
      <div className="mt-2">
        <p className="text-red-500 text-sm font-semibold">Segera Habis</p>
        <div className="h-2 bg-gray-300 rounded-full">
          <div className="h-2 bg-red-500 rounded-full w-full" />
        </div>
      </div>
    </div>
  );
};

export default PromoCard;
