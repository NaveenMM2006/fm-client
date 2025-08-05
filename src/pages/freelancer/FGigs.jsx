// src/pages/freelancer/FGigs.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../../utils/api";

export default function FGigs() {
  const [gigs, setGigs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/gigs/my-gigs", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setGigs(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch gigs", err);
      }
    };

    fetchGigs();
  }, []);

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-semibold mb-6">My Gigs</h2>

      {gigs.length === 0 ? (
        <p className="text-gray-500">No gigs found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gigs.map((gig) => (
            <motion.div
              key={gig._id}
              className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition duration-200"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-xl font-bold text-blue-700">{gig.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{gig.description}</p>
              <p className="text-sm text-gray-500 mt-1">₹{gig.price}</p>
              <p className="text-xs text-gray-400">Category: {gig.category}</p>
              <button
                onClick={() => navigate(`/edit-gig/${gig._id}`)}
                className="mt-3 inline-block text-sm text-blue-600 hover:underline"
              >
                Edit
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}