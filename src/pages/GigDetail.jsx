import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../utils/api";

export default function GigDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [gig, setGig] = useState(null);

  useEffect(() => {
    const fetchGig = async () => {
      try {
        const res = await API.get(`/gigs/${id}`);
        setGig(res.data);
      } catch (err) {
        alert("Gig not found");
      }
    };
    fetchGig();
  }, [id]);

  if (!gig) return <p className="p-4">Loading gig details...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 mt-8 bg-white shadow rounded">
      <h1 className="text-3xl font-bold text-blue-700 mb-2">{gig.title}</h1>
      <p className="text-gray-600 mb-2">{gig.description}</p>
      <p className="text-sm text-gray-500">Category: {gig.category}</p>
      <p className="text-sm text-gray-500 mb-4">Delivery: {gig.deliveryTime} days</p>
      <p className="text-xl font-semibold text-green-600 mb-4">${gig.price}</p>
      <p className="text-xs text-gray-400 mb-6">By: {gig?.seller?.name}</p>

      <button
        onClick={() => navigate(`/payment/${gig._id}`)}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Continue to Payment
      </button>
    </div>
  );
}