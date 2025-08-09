// @ts-nocheck
import React, { useEffect, useState, useContext } from "react";
import Rating from "react-rating";
import { useParams } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";
import Loading from "../Loading/Loading";

const ServiceDetailsPage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [service, setService] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);

  // Fetch service details
  useEffect(() => {
    fetch(`https://service-review-system-server-nine.vercel.app/services/${id}`)
      .then((res) => res.json())
      .then((data) => setService(data))
      .catch((err) => console.error(err));
  }, [id]);

  // Fetch reviews for this service
  useEffect(() => {
    fetch(
      `https://service-review-system-server-nine.vercel.app/reviews?serviceId=${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setReviews(sorted);
      })
      .catch((err) => console.error(err));
  }, [id]);

  // Add new review
  const handleAddReview = (e) => {
    e.preventDefault();

    if (!user) {
      return Swal.fire("Not Logged In", "Please log in first", "warning");
    }

    if (rating === 0) {
      return Swal.fire("No Rating", "Please select a rating", "warning");
    }

    const newReview = {
      serviceId: id,
      name: user.displayName || user.name || "Anonymous",
      photo: user.photoURL || "https://i.ibb.co/5LwZDYz/user1.jpg",
      rating,
      comment: text,
      createdAt: new Date().toISOString(),
    };

    fetch("https://service-review-system-server-nine.vercel.app/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newReview),
    })
      .then((res) => res.json())
      .then((data) => {
        setReviews([data, ...reviews]);
        setText("");
        setRating(0);
        Swal.fire("Success", "Review submitted", "success");
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error", "Failed to submit review", "error");
      });
  };

  if (!service) return <Loading />;

  return (
    <div className="max-w-4xl mx-auto p-6 rounded-lg shadow-lg mt-20 mb-20">
      <h2 className="text-4xl font-extrabold mb-6 text-teal-700 tracking-wide text-center">
        {service.title}
      </h2>

      <div className="rounded-lg overflow-hidden shadow-xl mb-8">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-72 object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-700">
        <div className="bg-white p-4 rounded-lg shadow-md border border-teal-200">
          <h3 className="font-semibold text-lg mb-2 text-teal-600">Category</h3>
          <p>{service.category}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border border-teal-200">
          <h3 className="font-semibold text-lg mb-2 text-teal-600">Price</h3>
          <p className="text-green-600 font-bold text-xl">{service.price}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border border-teal-200">
          <h3 className="font-semibold text-lg mb-2 text-teal-600">
            Description
          </h3>
          <p className="text-gray-600">{service.description}</p>
        </div>
      </div>

      {/* Review Section */}
      <section className="mb-10">
        <h3 className="text-3xl font-bold text-teal-700 mb-4 tracking-wide">
          Reviews ({reviews.length})
        </h3>

        {reviews.length === 0 ? (
          <p className="text-gray-500">
            No reviews yet. Be the first to review!
          </p>
        ) : (
          <div className="space-y-6">
            {reviews.map((r) => (
              <div
                key={r._id || r.createdAt}
                className="bg-white rounded-lg shadow-md p-5 flex flex-col md:flex-row gap-5 items-start"
              >
                <img
                  src={r.photo}
                  alt={r.name}
                  className="w-14 h-14 rounded-full border-2 border-teal-400"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <p className="font-semibold text-teal-700">{r.name}</p>
                    <p className="text-sm text-gray-400 italic">
                      {new Date(r.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <Rating
                    readonly
                    initialRating={r.rating}
                    emptySymbol={
                      <span className="text-teal-200 text-2xl">☆</span>
                    }
                    fullSymbol={
                      <span className="text-teal-500 text-2xl">★</span>
                    }
                  />
                  <p className="text-gray-700 mt-1">{r.comment}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Add Review */}
      <section>
        <h3 className="text-3xl font-bold text-teal-700 mb-6 tracking-wide">
          Add a Review
        </h3>
        <form
          onSubmit={handleAddReview}
          className="bg-white p-6 rounded-lg shadow-md max-w-xl mx-auto"
        >
          <textarea
            required
            rows="4"
            className="w-full p-3 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
            placeholder="Write your review here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="flex items-center mt-4 gap-3">
            <label className="font-semibold text-teal-700">Rating:</label>
            <Rating
              initialRating={rating}
              onChange={(rate) => setRating(rate)}
              emptySymbol={
                <span className="text-teal-200 text-3xl cursor-pointer">☆</span>
              }
              fullSymbol={
                <span className="text-teal-500 text-3xl cursor-pointer">★</span>
              }
            />
          </div>
          <button
            type="submit"
            className="mt-6 w-full bg-gradient-to-r from-teal-500 to-teal-700 text-white py-2 px-4 rounded-full hover:scale-105 transition-transform duration-300 font-bold"
            disabled={!text.trim() || rating === 0}
          >
            Submit Review
          </button>
        </form>
      </section>
    </div>
  );
};

export default ServiceDetailsPage;
