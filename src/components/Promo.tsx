"use client";

import React from "react";
import PromoCard from "./PromoCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

const BannerPromo = () => {
  return (
    <div className="absolute bg-blue-100 p-5 w-72 h-96 flex flex-col justify-center items-center pr-24">
      <img
        src="hero/img/promo_banner.webp"
        alt="Promotional graphic for new users' first shopping discount"
        className="mb-4 w-32 h-auto object-cover rounded-md"
      />
    </div>
  );
};

const Promo = () => {
  return (
    <div className="container mx-auto p-8">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Traktiran Pengguna Baru
        </h1>
        <div className="flex items-center">
          <span className="text-gray-500 mr-2">Berakhir dalam</span>
          {/* Countdown Timer */}
          <div className="flex space-x-1">
            <div className="bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
              13
            </div>
            <span className="text-lg font-semibold">:</span>
            <div className="bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
              00
            </div>
            <span className="text-lg font-semibold">:</span>
            <div className="bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
              29
            </div>
          </div>
          <a href="#" className="text-green-600 text-sm font-semibold ml-4">
            Lihat Semua
          </a>
        </div>
      </div>
      {/* Main Content Section */}
      <div className="flex">
        <Swiper
          slidesPerView={5}
          spaceBetween={10}
          grabCursor={true}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="swiper_promo"
        >
          <SwiperSlide className="relative">
            <BannerPromo />
          </SwiperSlide>
          <SwiperSlide>
            <PromoCard />
          </SwiperSlide>
          <SwiperSlide>
            <PromoCard />
          </SwiperSlide>
          <SwiperSlide>
            <PromoCard />
          </SwiperSlide>
          <SwiperSlide>
            <PromoCard />
          </SwiperSlide>
          <SwiperSlide>
            <PromoCard />
          </SwiperSlide>
          <SwiperSlide>
            <PromoCard />
          </SwiperSlide>
          <SwiperSlide>
            <PromoCard />
          </SwiperSlide>
          <SwiperSlide>
            <PromoCard />
          </SwiperSlide>
          <SwiperSlide>
            <PromoCard />
          </SwiperSlide>
          <SwiperSlide>
            <PromoCard />
          </SwiperSlide>
          <SwiperSlide>
            <PromoCard />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Promo;
