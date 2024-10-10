import MainRegister from "@/components/admin/MainRegister";
import { Button } from "@/components/ui/button";
import React from "react";

const page = () => {
  return (
    <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
      {/* Left section: Image and title */}
      <div className="flex flex-col items-center text-center lg:w-1/2 mt-20">
        <h1 className="text-2xl lg:text-3xl font-bold mb-4">
          Mulai berjualan di Tokopedia!
        </h1>
        <img
          src="hero/img/myshop.png"
          alt="A floating island with a truck full of packages and the Tokopedia owl mascot"
          className="w-[300px] lg:w-[500px]"
        />
      </div>
      {/* Right section: Store selection */}
      <div className="lg:w-1/2 px-4 mt-10 lg:mt-0 flex flex-col justify-center">
        <h2 className="text-xl lg:text-2xl font-semibold mb-6">
          Jenis toko apa yang ingin kamu buat?
        </h2>
        <MainRegister />
      </div>
    </div>
  );
};

export default page;
