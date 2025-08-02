import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../utils/api";
import GigReviews from "../components/GigReviews";

export default function Gigs() {
  const [gigs, setGigs] = useState([]);
  const [selectedGig, setSelectedGig] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        const res = await API.get("/gigs");
        setGigs(res.data);
      } catch (err) {
        alert("Failed to load gigs");
      }
    };
    fetchGigs();
  }, []);

  const handleBuyClick = (gigId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to buy gigs.");
      navigate("/login");
      return;
    }
    setSelectedGig(gigId);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Explore Gigs</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gigs.map((gig) => (
          <div key={gig._id} className="border p-4 rounded shadow-sm bg-white">
            <h3 className="text-xl font-semibold text-blue-600">{gig.title}</h3>
            <p className="text-sm text-gray-600 mb-2">
              {gig.description.slice(0, 80)}...
            </p>
            <p className="text-sm text-gray-500">Category: {gig.category}</p>
            <p className="text-sm text-gray-500">Delivery: {gig.deliveryTime} days</p>
            <p className="text-lg font-bold mt-2 text-green-600">${gig.price}</p>
            <p className="text-xs mt-2 text-gray-400">
              By: {gig?.seller?.name} ({gig?.seller?.role})
            </p>

            {selectedGig === gig._id ? (
              <Link to={`/gigs/${gig._id}`}>
                <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">
                  Continue to Payment
                </button>
              </Link>
            ) : (
              <button
                onClick={() => handleBuyClick(gig._id)}
                className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
              >
                Buy Now
              </button>
            )}

            <GigReviews gigId={gig._id} />
          </div>
        ))}
      </div>
    </div>
  );
}