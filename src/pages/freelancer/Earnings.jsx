import { useEffect, useState } from "react";
import API from "../../utils/api";

export default function Earnings() {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/orders/my", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch orders", err);
      }
    };
    fetchOrders();
  }, []);

  const totalEarnings = orders
    .filter((order) => order.sellerId?.id === user._id || order.sellerId === user._id)
    .filter((order) => order.status === "Delivered")
    .reduce((sum, order) => sum + (order.gigId?.price || 0), 0);

  const pendingPayout = orders
    .filter((order) => order.sellerId?.id === user._id || order.sellerId === user.id)
    .filter((order) => order.status !== "Delivered")
    .reduce((sum, order) => sum + (order.gigId?.price || 0), 0);

  return (
    <div className="bg-white shadow p-6 rounded space-y-4 max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center">Your Earnings</h2>

      <div className="flex justify-between">
        <div>
          <p className="text-gray-500">Total Earnings</p>
          <p className="text-xl font-bold text-green-600">₹{totalEarnings}</p>
        </div>
        <div>
          <p className="text-gray-500">Pending Payout</p>
          <p className="text-xl font-bold text-yellow-600">₹{pendingPayout}</p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold mb-2">Earning Breakdown</h3>
        {orders.filter((o) => o.sellerId?._id === user.id || o.sellerId === user.id).length === 0 ? (
          <p className="text-gray-500">No delivered orders yet.</p>
        ) : (
          <ul className="space-y-2">
            {orders
              .filter((o) => o.sellerId?.id === user.id || o.sellerId === user.id)
              .map((order) => (
                <li
                  key={order._id}
                  className="flex justify-between border-b pb-2 text-sm"
                >
                  <span>{order.gigId?.title}</span>
                  <span
                    className={
                      order.status === "Delivered"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }
                  >
                    ₹{order.gigId?.price} ({order.status})
                  </span>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}