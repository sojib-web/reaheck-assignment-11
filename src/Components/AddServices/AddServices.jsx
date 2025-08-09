// @ts-nocheck
import React, { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthContext";

const AddServices = () => {
  const { user } = useContext(AuthContext);

  const AddServiceSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Include logged-in user's email explicitly
    data.email = user?.email;

    fetch(`https://service-review-system-server-nine.vercel.app/services`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("Service added:", result);
        form.reset();
        Swal.fire({
          icon: "success",
          title: "Service Added!",
          text: "Your service has been added successfully.",
          timer: 2000,
          showConfirmButton: false,
        });
      })
      .catch((err) => {
        console.error("Error adding service:", err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong while adding the service.",
        });
      });
  };

  return (
    <div className="max-w-7xl mx-auto  flex items-center justify-center py-12 px-4">
      <section className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-10 ring-1 ring-teal-100">
        <h2 className="text-4xl font-extrabold text-center text-teal-700 mb-10 tracking-wide">
          ➕ Add a New Service
        </h2>

        <form onSubmit={AddServiceSubmit} className="space-y-8">
          {/* Service Image URL */}
          <div>
            <label className="block mb-2 font-semibold text-teal-700">
              Service Image URL
            </label>
            <input
              type="text"
              name="image"
              placeholder="https://example.com/image.jpg"
              className="w-full rounded-lg border border-gray-300 px-5 py-3 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-300 transition"
              required
            />
          </div>

          {/* Service Title */}
          <div>
            <label className="block mb-2 font-semibold text-teal-700">
              Service Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter service title"
              className="w-full rounded-lg border border-gray-300 px-5 py-3 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-300 transition"
              required
            />
          </div>

          {/* Company Name & Website */}
          <div className="flex gap-6">
            <div className="flex-1">
              <label className="block mb-2 font-semibold text-teal-700">
                Company Name
              </label>
              <input
                type="text"
                name="companyName"
                placeholder="Enter company name"
                className="w-full rounded-lg border border-gray-300 px-5 py-3 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-300 transition"
              />
            </div>

            <div className="flex-1">
              <label className="block mb-2 font-semibold text-teal-700">
                Company Website
              </label>
              <input
                type="url"
                name="companyWebsite"
                placeholder="https://company.com"
                className="w-full rounded-lg border border-gray-300 px-5 py-3 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-300 transition"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 font-semibold text-teal-700">
              Description
            </label>
            <textarea
              name="description"
              rows="4"
              placeholder="Write a short description..."
              className="w-full rounded-lg border border-gray-300 px-5 py-3 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-300 transition resize-none"
            ></textarea>
          </div>

          {/* Category & Price */}
          <div className="flex gap-6">
            <div className="flex-1">
              <label className="block mb-2 font-semibold text-teal-700">
                Category
              </label>
              <input
                type="text"
                name="category"
                placeholder="e.g. Cleaning, Plumbing, Delivery"
                className="w-full rounded-lg border border-gray-300 px-5 py-3 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-300 transition"
              />
            </div>

            <div className="flex-1">
              <label className="block mb-2 font-semibold text-teal-700">
                Price ($)
              </label>
              <input
                type="number"
                name="price"
                placeholder="e.g. 49.99"
                className="w-full rounded-lg border border-gray-300 px-5 py-3 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-300 transition"
              />
            </div>
          </div>

          {/* User Email (auto-filled) */}
          <div>
            <label className="block mb-2 font-semibold text-teal-700">
              Your Email
            </label>
            <input
              type="email"
              name="email"
              value={user?.email || ""}
              readOnly
              className="w-full rounded-lg border border-gray-200 bg-gray-100 px-5 py-3 text-gray-600 cursor-not-allowed"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-bold rounded-xl shadow-lg hover:from-cyan-600 hover:to-teal-500 transition transform hover:scale-105"
          >
            Add Service
          </button>
        </form>
      </section>
    </div>
  );
};

export default AddServices;
