// src/pages/freelancer/Overview.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import API from "../../utils/api";

export default function Overview() {
  const [orders, setOrders] = useState([]);
  const [gigs, setGigs] = useState([]);
  const user = JSON.parse(localStorage.getItem("user")) || {};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const [ordersRes, gigsRes] = await Promise.all([
          API.get("/orders/my", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          API.get("/gigs/my-gigs", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setOrders(ordersRes.data || []);
        setGigs(gigsRes.data || []);
      } catch (err) {
        console.error("❌ Failed to fetch dashboard data", err);
      }
    };

    fetchData();
  }, []);

  const activeOrders = orders.filter(
    (o) => o.status === "Pending" || o.status === "In Progress"
  ).length;

  const totalEarnings = orders.reduce(
    (sum, o) => sum + (o?.gigId?.price || 0),
    0
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, type: "spring", stiffness: 120 }}
      className="px-4 sm:px-6 lg:px-8 py-6 w-full"
    >
      <h1 className="text-2xl md:text-3xl font-bold mb-2">
        Welcome, {user?.name}
      </h1>
      <p className="text-gray-500 mb-6 text-sm">Role: {user?.role}</p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl shadow-md text-center">
          <h2 className="text-3xl font-extrabold text-blue-600">
            {gigs.length}
          </h2>
          <p className="mt-2 text-sm text-gray-500">Total Gigs</p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-md text-center">
          <h2 className="text-3xl font-extrabold text-blue-600">
            {activeOrders}
          </h2>
          <p className="mt-2 text-sm text-gray-500">Active Orders</p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-md text-center">
          <h2 className="text-3xl font-extrabold text-blue-600">
            ₹{totalEarnings}
          </h2>
          <p className="mt-2 text-sm text-gray-500">Total Earnings</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8 bg-white p-5 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        {orders.length === 0 ? (
          <p className="text-gray-400 text-sm">No recent activity found.</p>
        ) : (
          <ul className="text-sm space-y-2">
            {orders.slice(0, 5).map((order) => (
              <li key={order._id} className="text-gray-700">
                <span className="font-semibold">
                  Order #{order._id.slice(-6)}
                </span>{" "}
                → {order.status}
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}