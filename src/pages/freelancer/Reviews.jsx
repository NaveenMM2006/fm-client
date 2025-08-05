// src/pages/freelancer/Reviews.jsx
import { useEffect, useState } from "react";
import API from "../../utils/api";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [myGigs, setMyGigs] = useState([]);
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchGigsAndReviews = async () => {
      try {
        const gigsRes = await API.get("/gigs/my-gigs", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setMyGigs(gigsRes.data);

        const allReviews = [];
        for (const gig of gigsRes.data) {
          const reviewsRes = await API.get(`/reviews/${gig._id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          reviewsRes.data.forEach((rev) => {
            allReviews.push({
              ...rev,
              gigTitle: gig.title,
            });
          });
        }

        setReviews(allReviews);
      } catch (err) {
        console.error("❌ Failed to fetch reviews", err);
      }
    };

    fetchGigsAndReviews();
  }, [token]);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Gig Reviews</h2>

      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews received yet.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review._id} className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-bold text-blue-700">{review.gigTitle}</h3>
              <p className="text-sm text-gray-600 mt-1 mb-2">
                Rating:{" "}
                <span className="font-semibold text-yellow-600">{review.rating} / 5</span>
              </p>
              <p className="text-gray-700 italic">"{review.comment}"</p>
              <p className="text-xs text-gray-400 mt-2">
                - {review.buyerId?.name || "Client"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}