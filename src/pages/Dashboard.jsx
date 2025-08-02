import { useEffect, useState } from "react";
import API from "../utils/api";
import MessageBox from "./MessageBox";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [orders, setOrders] = useState([]);
  const [reviewInput, setReviewInput] = useState({});

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/orders/my", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      await API.put(
        `/orders/${orderId}/status`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Status updated!");
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o))
      );
    } catch (err) {
      console.error("Status update error:", err.response?.data || err.message);
      alert("Failed to update status");
    }
  };

  const handleReviewSubmit = async (e, gigId) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const { rating, comment } = reviewInput[gigId];

    try {
      await API.post(
        "/reviews",
        { gigId, rating, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Review submitted!");
      setReviewInput((prev) => ({
        ...prev,
        [gigId]: { rating: "", comment: "" },
      }));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to submit review");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 p-4">
      <h1 className="text-2xl font-bold text-blue-700 mb-4">
        Welcome, {user.name}
      </h1>
      <p className="mb-6 text-gray-600">Role: {user.role}</p>

      <h2 className="text-xl font-semibold mb-2">Your Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders yet</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border rounded p-4 bg-white shadow"
            >
              <p>
                <strong>Gig:</strong> {order.gigId?.title}
              </p>
              <p>
                <strong>Price:</strong> ${order.gigId?.price}
              </p>
              <p>
                <strong>Status:</strong> {order.status}
              </p>
              <p>
                <strong>Buyer:</strong> {order.buyerId?.name}
              </p>
              <p>
                <strong>Seller:</strong> {order.sellerId?.name}
              </p>

              {/* Sellers can update status */}
              {user.id === order.sellerId?._id && (
                <div className="mt-3">
                  <label className="block mb-1 text-sm font-medium text-gray-600">
                    Update Status:
                  </label>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    className="p-2 border rounded w-full max-w-xs"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              )}

              {/* Buyers can review after delivery */}
              {user.id === order.buyerId?._id &&
                (order.status === "Delivered" ||
                  order.status === "Completed") && (
                  <form
                    onSubmit={(e) => handleReviewSubmit(e, order.gigId._id)}
                    className="mt-4 space-y-2"
                  >
                    <label className="block text-sm font-medium">
                      Leave a Review:
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={reviewInput[order.gigId._id]?.rating || ""}
                      onChange={(e) =>
                        setReviewInput((prev) => ({
                          ...prev,
                          [order.gigId._id]: {
                            ...prev[order.gigId._id],
                            rating: Number(e.target.value),
                          },
                        }))
                      }
                      placeholder="Rating (1-5)"
                      className="w-full p-2 border rounded"
                      required
                    />
                    <textarea
                      value={reviewInput[order.gigId._id]?.comment || ""}
                      onChange={(e) =>
                        setReviewInput((prev) => ({
                          ...prev,
                          [order.gigId._id]: {
                            ...prev[order.gigId._id],
                            comment: e.target.value,
                          },
                        }))
                      }
                      placeholder="Write your review..."
                      className="w-full p-2 border rounded"
                      required
                    />
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                      Submit Review
                    </button>
                  </form>
                )}

              {/* 💬 Messaging for both buyer and seller */}
              <MessageBox orderId={order._id} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}