// @ts-nocheck
/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const FeaturedServices = ({ servicesData }) => {
  const navigate = useNavigate();

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-4xl font-extrabold mb-10 text-center text-teal-700 relative inline-block">
        🔥 Featured Plumbing Services
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {servicesData.map((service, index) => (
          <motion.div
            key={service._id}
            className="bg-white rounded-xl shadow-lg hover:shadow-blue-400/40 hover:-translate-y-2 transform transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: index * 0.15 }}
            onClick={() => navigate(`/services/${service._id}`)}
            title={`See details for ${service.title}`}
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-52 object-cover rounded-t-xl"
              loading="lazy"
            />
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-2xl font-semibold mb-3 relative after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:rounded-full">
                {service.title}
              </h3>
              <p className="text-gray-600 flex-grow mb-6">
                {service.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="inline-block bg-gradient-to-r text-white from-teal-500 to-teal-700 font-semibold px-4 py-2 rounded-full shadow-sm text-lg">
                  ${service.price}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation(); // prevent card click event
                    navigate(`/services/${service._id}`);
                  }}
                  className="bg-gradient-to-r from-teal-500 to-teal-700 text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-700 transition duration-300"
                >
                  See Details
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedServices;
