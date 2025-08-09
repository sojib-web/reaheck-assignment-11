/* eslint-disable no-unused-vars */
// @ts-nocheck
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/pagination";

import sideImage1 from "../assets/a3.jpg";
import sideImage2 from "../assets/a2.png";
import sideImage3 from "../assets/a1.jpg";

const BannerSlider = () => {
  const slides = [
    {
      image: sideImage1,
      title: "Find Trusted Experts",
      subtitle: "Browse verified services reviewed by real people near you.",
      btnColor: "from-purple-500 to-purple-700",
    },
    {
      image: sideImage2,
      title: "Reviews That Matter",
      subtitle: "Make informed decisions with honest customer feedback.",
      btnColor: "from-teal-500 to-teal-700",
    },
    {
      image: sideImage3,
      title: "Boost Your Reach",
      subtitle: "List your service, build credibility, and grow your audience.",
      btnColor: "from-rose-500 to-rose-700",
    },
  ];

  return (
    <div className="w-full">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true }}
        loop={true}
        className="rounded-xl overflow-hidden max-w-7xl mx-auto"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative flex flex-col md:flex-row items-center min-h-[400px] md:h-[500px] bg-white overflow-hidden rounded-xl">
              {/* Animated gradient shapes */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-tr from-teal-300 to-white opacity-30 rounded-full animate-pulse blur-2xl"></div>
              <div className="absolute -bottom-10 -right-10 w-52 h-52 bg-gradient-to-br from-purple-300 to-white opacity-20 rounded-full animate-pulse blur-2xl"></div>

              {/* Gradient overlay for text side */}
              <div className="absolute inset-0 md:w-1/2 bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-md z-10"></div>

              {/* Text Section */}
              <motion.div
                initial={{ x: -80, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1 }}
                className="z-20 w-full md:w-1/2 h-full flex flex-col justify-center items-start px-6 md:px-12 space-y-4"
              >
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight drop-shadow-lg">
                  {slide.title}
                </h2>
                <p className="text-lg md:text-xl text-gray-600 font-light">
                  {slide.subtitle}
                </p>
                <button
                  className={`bg-gradient-to-r ${slide.btnColor} text-white py-2 px-6 rounded-full shadow-md hover:scale-105 transition-transform duration-300`}
                >
                  Explore Now
                </button>
              </motion.div>

              {/* Image Section */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1 }}
                className="z-20 w-full md:w-1/2 h-full"
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-contain md:object-cover  transition-transform duration-500 hover:scale-105"
                />
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerSlider;
