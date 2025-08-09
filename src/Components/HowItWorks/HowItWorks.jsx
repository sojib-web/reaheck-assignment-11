/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    name: "Jawad Hossain",
    img: "https://i.ibb.co/27PJwBsj/image.png",
    quote:
      "Amazing platform! I always check reviews before booking and this site is the best!",
  },
  {
    name: "Sarah Khan",
    img: "https://i.ibb.co/hRshv7xD/image.png",
    quote: "Easy to use and reviews are genuine. Helped me avoid bad services.",
  },
  {
    name: "Raihan Ahmed",
    img: "https://i.ibb.co/27PJwBsj/image.png",
    quote:
      "Highly recommend this to my friends. Found great cleaners through this platform!",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-14 ">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-teal-700  mb-10">
          💬 What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((user, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
            >
              <FaQuoteLeft className="text-3xl text-blue-400 absolute top-4 left-4 opacity-20" />
              <img
                src={user.img}
                alt={user.name}
                className="w-16 h-16 rounded-full mx-auto mb-4 border-4 border-blue-100 shadow-md"
              />
              <p className="text-gray-700 italic text-sm md:text-base leading-relaxed">
                “{user.quote}”
              </p>
              <h4 className="mt-4 text-lg font-semibold text-teal-700 text-center">
                — {user.name}
              </h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
