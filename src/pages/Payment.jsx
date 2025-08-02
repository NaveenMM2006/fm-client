import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../utils/api";

export default function Payment() {
  const { gigId } = useParams();
  const navigate = useNavigate();
  const [gig, setGig] = useState(null);

  useEffect(() => {
    const fetchGig = async () => {
      try {
        const res = await API.get(`/gigs/${gigId}`);
        setGig(res.data);
      } catch (err) {
        console.error("Gig fetch failed:", err);
        alert("Gig not found");
      }
    };
    fetchGig();
  }, [gigId]);

  const handlePayment = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to continue.");
      return;
    }

    try {
      await API.post(
        "/orders",
        {
          gigId,
          sellerId: gig?.seller?._id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Payment successful. Order placed!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Order creation failed:", err.response?.data || err);
      alert(err.response?.data?.message || "Order creation failed");
    }
  };

  if (!gig) return <p className="text-center p-4 text-blue-500">Loading gig...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Pay for:</h2>
      <h3 className="text-xl font-semibold mb-2">{gig.title}</h3>
      <p className="text-gray-600 mb-4">Price: ${gig.price}</p>

      <form onSubmit={handlePayment} className="space-y-4">
        <input
          type="text"
          placeholder="Card Number"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Expiry (MM/YY)"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="CVV"
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Pay & Place Order
        </button>
      </form>
    </div>
  );
}