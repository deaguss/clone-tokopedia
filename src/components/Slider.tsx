"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import { FC } from "react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface SliderProps {}

const Slider: FC<SliderProps> = ({}) => {
  const banner = [
    {
      id: 1,
      alt: "alt",
      img: "hero/img/banner-1.webp",
      href: "#",
    },
    {
      id: 2,
      alt: "alt",
      img: "hero/img/banner-1.webp",
      href: "#",
    },
    {
      id: 3,
      alt: "alt",
      img: "hero/img/banner-1.webp",
      href: "#",
    },
  ];

  return (
    <div className="relative">
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} bg-gray-400 hover:bg-gray-600 z-10"></span>`;
          },
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        modules={[Pagination, Navigation, Autoplay]}
        className="banner_product w-full"
      >
        {banner.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="rounded-xl overflow-hidden group relative">
              <img
                src={item.img}
                alt={item.alt}
                loading="lazy"
                className="w-full h-full object-cover rounded-xl"
              />
              <div className="swiper-button-next absolute top-1/2 right-4 transform -translate-y-1/2 translate-x-full opacity-0 transition-all duration-300 ease-in-out group-hover:translate-x-0 group-hover:opacity-100 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-gray-300 hover:scale-110">
                <ChevronRight />
              </div>
              <div className="swiper-button-prev absolute top-1/2 left-4 transform -translate-y-1/2 -translate-x-full opacity-0 transition-all duration-300 ease-in-out group-hover:translate-x-0 group-hover:opacity-100 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-gray-300 hover:scale-110">
                <ChevronLeft />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="swiper-pagination absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10"></div>
    </div>
  );
};

export default Slider;
