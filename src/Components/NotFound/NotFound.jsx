// @ts-nocheck
import React from "react";
import { Link } from "react-router";
import image from "../../assets/404.png";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center  px-4 text-center">
      <img
        src={image}
        alt="404 Not Found"
        className="w-72 md:w-[400px] rounded-3xl lg:w-[450px] mb-6 animate__animated animate__fadeInDown"
      />
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 animate__animated animate__fadeInUp">
        🚫 Oops! Page Not Found
      </h2>
      <p className="text-gray-500 mt-3 mb-6 max-w-md animate__animated animate__fadeInUp animate__delay-1s">
        The page you’re looking for doesn’t exist or has been moved.
      </p>

      <Link
        to="/"
        className="inline-block bg-gradient-to-r from-teal-500 to-teal-700 text-white py-2 px-6 rounded-full font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
      >
        ⬅️ Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
