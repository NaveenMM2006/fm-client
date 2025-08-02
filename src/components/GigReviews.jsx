import { useEffect, useState } from "react";
import API from "../utils/api";

export default function GigReviews({ gigId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await API.get(`/reviews/${gigId}`);
        setReviews(res.data);
      } catch (err) {
        console.error("Failed to load reviews:", err);
      }
    };

    fetchReviews();
  }, [gigId]);

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        ).toFixed(1)
      : null;

  return (
    <div className="mt-4">
      {averageRating && (
        <p className="text-sm text-yellow-600 font-semibold">
          ★ {averageRating} average rating from {reviews.length} review
          {reviews.length > 1 ? "s" : ""}
        </p>
      )}

      {reviews.map((r) => (
        <div
          key={r._id}
          className="mt-2 p-2 bg-gray-100 border rounded text-sm"
        >
          <p className="font-medium">⭐ {r.rating} - {r.buyerId?.name}</p>
          <p>{r.comment}</p>
        </div>
      ))}
    </div>
  );
}