// @ts-nocheck
import React, { useState, useEffect, useContext } from "react";
import Rating from "react-rating";
import Swal from "sweetalert2";
import "animate.css";
import { useLoaderData } from "react-router";
import { AuthContext } from "../../Context/AuthContext";

const MyReviews = () => {
  const reviewsData = useLoaderData();
  const [reviews, setReviews] = useState(reviewsData || []);
  const [services, setServices] = useState([]);
  const { user } = useContext(AuthContext);
  const userEmail = user?.email;

  // Fetch reviews for logged-in user
  const fetchReviews = () => {
    if (!userEmail) return;
    fetch(
      `https://service-review-system-server-nine.vercel.app/reviews?userEmail=${encodeURIComponent(
        userEmail
      )}`
    )
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch(() => Swal.fire("Error", "Failed to fetch reviews", "error"));
  };

  // Fetch all services once for service titles
  useEffect(() => {
    fetch(
      `https://service-review-system-server-nine.vercel.app/reviews?userEmail=${encodeURIComponent(
        userEmail
      )}`
    )
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch(() => Swal.fire("Error", "Failed to fetch services", "error"));
  }, []);

  // Fetch reviews whenever userEmail changes (user logs in/out)
  useEffect(() => {
    fetchReviews();
  }, [userEmail]);

  // Helper to get service title from ID
  const getServiceTitle = (id) => {
    const match = services.find((s) => s._id === id);
    return match?.title || "Unknown Service";
  };

  // Delete a review with confirmation
  const handleDelete = (id) => {
    const reviewToDelete = reviews.find((r) => r._id === id);
    Swal.fire({
      title: `🗑️ Delete review for "${getServiceTitle(
        reviewToDelete.serviceId
      )}"?`,
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
      showClass: { popup: "animate__animated animate__fadeInDown" },
      hideClass: { popup: "animate__animated animate__fadeOutUp" },
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://service-review-system-server-nine.vercel.app/reviews/${id}`,
          { method: "DELETE" }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount === 1) {
              fetchReviews();
              Swal.fire({
                title: "🗑️ Deleted!",
                text: "Review has been deleted.",
                icon: "success",
                background: "#fef2f2",
                color: "#7f1d1d",
                confirmButtonColor: "#dc2626",
              });
            }
          })
          .catch(() => Swal.fire("Error", "Failed to delete review", "error"));
      }
    });
  };

  // Update a review with a modal form (service title read-only)
  const handleUpdate = (id) => {
    const reviewToUpdate = reviews.find((r) => r._id === id);
    Swal.fire({
      title: "✏️ Update Review",
      html: `
        <p><strong>Service:</strong> ${getServiceTitle(
          reviewToUpdate.serviceId
        )}</p>
        <textarea id="swal-review" class="swal2-textarea" placeholder="Write your review">${
          reviewToUpdate.text || reviewToUpdate.comment || ""
        }</textarea>
        <input id="swal-rating" type="number" min="1" max="5" class="swal2-input" placeholder="Rating (1-5)" value="${
          reviewToUpdate.rating || 1
        }">
      `,
      showCancelButton: true,
      confirmButtonText: "💾 Save",
      cancelButtonText: "Cancel",
      preConfirm: () => {
        const text = document.getElementById("swal-review").value.trim();
        const rating = Number(document.getElementById("swal-rating").value);
        if (!text || rating < 1 || rating > 5) {
          Swal.showValidationMessage(
            "⚠️ Please enter valid review text and rating (1-5)"
          );
          return false;
        }
        return { text, rating };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://service-review-system-server-nine.vercel.app/reviews/${id}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(result.value),
          }
        )
          .then((res) => res.json())
          .then(() => {
            fetchReviews();
            Swal.fire({
              title: "✅ Updated!",
              text: "Review has been updated.",
              icon: "success",
              background: "#ecfdf5",
              color: "#065f46",
              confirmButtonColor: "#22c55e",
            });
          })
          .catch(() => Swal.fire("Error", "Failed to update review", "error"));
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-extrabold text-teal-700">📦 My Reviews</h2>

        <p className="text-gray-500">
          Total Reviews: <span className="font-semibold">{reviews.length}</span>
        </p>
      </div>

      {reviews.length === 0 ? (
        <p className="text-center text-gray-500">You have no reviews yet.</p>
      ) : (
        reviews.map((review) => (
          <div
            key={review._id}
            className="rounded-lg p-5 mb-6 bg-white shadow-lg transition duration-300"
          >
            <p className="mb-2">
              <strong>Service Title:</strong>{" "}
              {getServiceTitle(review.serviceId)}
            </p>
            <p className="mb-2">
              <strong>Review:</strong> {review.text || review.comment}
            </p>
            <p className="flex items-center gap-2">
              <strong>Rating:</strong>
              <Rating
                initialRating={review.rating}
                readonly
                emptySymbol={<span className="text-gray-300 text-lg">☆</span>}
                fullSymbol={<span className="text-yellow-400 text-lg">★</span>}
              />
            </p>
            <div className="mt-4 space-x-3">
              <button
                onClick={() => handleUpdate(review._id)}
                className="bg-gradient-to-r from-teal-500 to-teal-700 text-white px-4 py-1 rounded-full hover:shadow-lg hover:shadow-teal-400/40 transition-transform duration-300 transform hover:scale-105"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(review._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-full transition-transform duration-300 transform hover:scale-105"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyReviews;
