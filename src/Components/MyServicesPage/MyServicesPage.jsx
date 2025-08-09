/* eslint-disable no-unused-vars */
// @ts-nocheck
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useLoaderData } from "react-router";
import "animate.css";

const MyServicesPage = () => {
  const serviceData = useLoaderData();
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    setServices(serviceData);
  }, [serviceData]);

  const handleEdit = (service) => {
    setSelectedService(service);

    Swal.fire({
      title: "✏️ Update Service",
      html: `
        <input id="swal-title" class="swal2-input" placeholder="Title" value="${service.title}">
        <input id="swal-category" class="swal2-input" placeholder="Category" value="${service.category}">
        <input id="swal-price" class="swal2-input" type="number" placeholder="Price" value="${service.price}">
        <textarea id="swal-description" class="swal2-textarea" placeholder="Description">${service.description}</textarea>
      `,
      showCancelButton: true,
      confirmButtonText: "💾 Save",
      cancelButtonText: "Cancel",
      focusConfirm: false,

      color: "#065f46",
      confirmButtonColor: "#22c55e",
      cancelButtonColor: "#94a3b8",
      customClass: {
        popup: "rounded-xl shadow-lg",
        confirmButton: "px-6 py-2 text-white rounded-lg font-bold",
        cancelButton: "px-6 py-2 text-white rounded-lg",
      },
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
      preConfirm: () => {
        const title = document.getElementById("swal-title").value;
        const category = document.getElementById("swal-category").value;
        const price = Number(document.getElementById("swal-price").value);
        const description = document.getElementById("swal-description").value;

        if (!title || !category || !price) {
          Swal.showValidationMessage("⚠️ Please fill in all required fields");
          return;
        }

        return { title, category, price, description };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedService = result.value;

        fetch(
          `https://service-review-system-server-nine.vercel.app/services/${service._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedService),
          }
        )
          .then((res) => res.json())
          .then(() => {
            setServices((prev) =>
              prev.map((s) =>
                s._id === service._id ? { ...s, ...updatedService } : s
              )
            );
            Swal.fire({
              title: "✅ Updated!",
              text: "Service has been updated.",
              icon: "success",
              background: "#ecfdf5",
              color: "#065f46",
              confirmButtonColor: "#22c55e",
            });
          })
          .catch(() => {
            Swal.fire("Error", "Failed to update service", "error");
          });
      }
    });
  };

  const handleDelete = (service) => {
    setSelectedService(service);

    Swal.fire({
      title: `🗑️ Delete "${service.title}"?`,
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#9ca3af",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",

      color: "#7c2d12",
      customClass: {
        popup: "rounded-xl shadow-md",
        confirmButton: "px-5 py-2 text-white font-semibold rounded-md",
        cancelButton: "px-5 py-2 text-white rounded-md",
      },
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://service-review-system-server-nine.vercel.app/services/${service._id}`,
          {
            method: "DELETE",
          }
        )
          .then((res) => {
            if (res.ok) {
              setServices((prev) => prev.filter((s) => s._id !== service._id));
              Swal.fire({
                title: "🗑️ Deleted!",
                text: "Service has been deleted.",
                icon: "success",
                background: "#fef2f2",
                color: "#7f1d1d",
                confirmButtonColor: "#dc2626",
              });
            }
          })
          .catch(() => {
            Swal.fire("Error", "Failed to delete service", "error");
          });
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto ">
      <h2 className="text-4xl font-bold text-center text-teal-600 mb-10">
        My Services
      </h2>
      <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white">
              <th className="p-4 font-semibold">Title</th>
              <th className="p-4 font-semibold">Category</th>
              <th className="p-4 font-semibold">Price ($)</th>
              <th className="p-4 font-semibold text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, index) => (
              <tr
                key={service._id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-teal-50 transition`}
              >
                <td className="p-4">{service.title}</td>
                <td className="p-4">{service.category}</td>
                <td className="p-4">${service.price}</td>
                <td className="p-4 text-center space-x-2">
                  <button
                    onClick={() => handleEdit(service)}
                    className="bg-gradient-to-r from-teal-500 to-teal-700 text-white  px-4 py-1 rounded-full hover:scale-105 transition-transform duration-300 hover:bg-teal-500 "
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(service)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-full transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {services.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center p-6 text-gray-500">
                  No services added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyServicesPage;
