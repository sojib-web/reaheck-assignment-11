// @ts-nocheck
import React, { useEffect, useState } from "react";

const WhyChooseUs = () => {
  const [topServices, setTopServices] = useState([]);

  useEffect(() => {
    const fetchTopServices = async () => {
      try {
        const res = await fetch(
          "https://service-review-system-server-nine.vercel.app/top-rated-services"
        );
        const data = await res.json();
        setTopServices(data);
      } catch (error) {
        console.error("Failed to load top services:", error);
      }
    };

    fetchTopServices();
  }, []);

  return (
    <section className="py-10 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-teal-700 mb-6">
        🌟 Top Rated Services
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        {topServices.map((service) => {
          return (
            <div
              key={service._id}
              className="bg-white rounded-xl shadow-md p-4"
            >
              <img
                src={service.image}
                alt={service.title}
                className="rounded-md mb-3 h-48 w-full object-cover"
              />
              <h3 className="text-xl font-semibold">{service.title}</h3>
              <p className="text-sm text-gray-600">
                {service.description?.slice(0, 60)}...
              </p>
              <p className="mt-2 text-teal-700 font-bold">
                ⭐ {service.rating ? service.rating.toFixed(1) : 0} (
                {service.totalReviews || 0} reviews)
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default WhyChooseUs;
