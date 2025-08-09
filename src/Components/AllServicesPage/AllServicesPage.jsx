/* eslint-disable no-unused-vars */
// @ts-nocheck
import React, { useState, useEffect, useContext } from "react";
import { Link, useLoaderData } from "react-router";
import CountUp from "react-countup";
import { AuthContext } from "../../Context/AuthContext";

const AllServicesPage = () => {
  const { user } = useContext(AuthContext);
  const servicesData = useLoaderData();
  const [services, setServices] = useState(servicesData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [stats, setStats] = useState({ user: 0, reviews: 0, services: 0 });

  useEffect(() => {
    fetch("https://service-review-system-server-nine.vercel.app/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    let filtered = servicesData;

    if (selectedCategory !== "All") {
      filtered = filtered.filter((s) => s.category === selectedCategory);
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter((s) => s.title.toLowerCase().includes(term));
    }

    setServices(filtered);
  }, [searchTerm, selectedCategory, servicesData]);

  const categories = ["All", ...new Set(servicesData.map((s) => s.category))];

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 space-y-12">
      {/* Section Heading */}
      <div className="text-center space-y-2">
        <h2 className="text-4xl font-bold text-teal-700">
          Explore All Services
        </h2>
        <p className="text-gray-600 text-lg">
          Search, filter, and find the right service for you
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        <div className="bg-white p-6 rounded-lg shadow">
          <h4 className="text-lg text-gray-500">Total Users</h4>
          <p className="text-2xl font-bold text-teal-700">
            <CountUp end={stats.user} duration={2} />
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h4 className="text-lg text-gray-500">Total Services</h4>
          <p className="text-2xl font-bold text-teal-700">
            <CountUp end={stats.services} duration={2} />
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h4 className="text-lg text-gray-500">Total Reviews</h4>
          <p className="text-2xl font-bold text-teal-700">
            <CountUp end={stats.reviews} duration={2} />
          </p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <input
          type="text"
          placeholder="Search services by title..."
          className="input input-bordered w-full max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="input input-bordered w-full max-w-xs"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <div
            key={service._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col"
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-52 object-cover"
            />
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-4 flex-grow">
                {service.description.slice(0, 100)}...
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span className="bg-teal-700 text-white px-3 py-1 rounded-full">
                  {service.category}
                </span>
                <span className="font-bold text-gray-800">
                  ${service.price}
                </span>
              </div>
              <Link
                to={`/services/${service._id}`}
                className="inline-block text-center bg-gradient-to-r from-teal-500 to-teal-700 text-white py-2 px-4 rounded-full hover:scale-105 transition-transform duration-300"
              >
                See Details
              </Link>
            </div>
          </div>
        ))}
        {services.length === 0 && (
          <p className="col-span-full text-center text-gray-500">
            No services found. Try adjusting your search or filters.
          </p>
        )}
      </div>
    </div>
  );
};

export default AllServicesPage;
