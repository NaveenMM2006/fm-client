// src/pages/freelancer/Orders.jsx
import { useEffect, useState } from "react";
import API from "../../utils/api";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/orders/my", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
        console.log("✅ Orders from backend:", res.data);   // debug
      } catch (err) {
        console.error("❌ Failed to fetch orders", err);
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
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o))
      );
    } catch (err) {
      console.error("❌ Failed to update status", err);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Order Tracking</h2>
      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white p-4 rounded shadow">
              <h3 className="font-bold text-blue-700 mb-2">
                Order #{order._id.slice(-6)}
              </h3>
              <p className="text-sm text-gray-600">
                Gig: {order.gigId?.title || "N/A"}
              </p>
              <p className="text-sm text-gray-600">
                Client: {order.buyerId?.name || "N/A"}
              </p>
              <p className="text-sm text-gray-600">
                Price: ₹{order.gigId?.price || "N/A"}
              </p>
              <p className="text-sm text-gray-600">Status: {order.status}</p>

              <select
                className="mt-2 p-1 border rounded"
                value={order.status}
                onChange={(e) =>
                  handleStatusChange(order._id, e.target.value)
                }
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}