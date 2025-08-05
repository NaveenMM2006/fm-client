// src/pages/freelancer/Messages.jsx
import { useEffect, useState } from "react";
import API from "../../utils/api";

export default function Messages() {
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  
  // ✅ safest way to get user
  let user = {};
  try {
    user = JSON.parse(localStorage.getItem("user")) || {};
  } catch {
    user = {};
  }

  // Fetch freelancer's orders
 useEffect(() => {
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/orders/my", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("✅ Orders fetched:", res.data);  // 👈 ADD THIS
      console.log("👤 Current user ID:", user._id); // 👈 ADD THIS

      const sellerOrders = res.data.filter(
        (order) =>
          order.sellerId?._id === user.id || order.sellerId === user.id
      );

      console.log("🎯 Filtered orders:", sellerOrders); // 👈 ADD THIS

      setOrders(sellerOrders);
    } catch (err) {
      console.error("❌ Failed to fetch orders", err);
    }
  };
  fetchOrders();
}, [user._id]);

  // Fetch messages when order is selected
  useEffect(() => {
    if (!selectedOrderId) return;

    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get(`/messages/${selectedOrderId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessages(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch messages", err);
      }
    };

    fetchMessages();
  }, [selectedOrderId]);

  const sendMessage = async () => {
    if (!newMsg.trim()) return;

    try {
      const token = localStorage.getItem("token");
      const res = await API.post(
        "/messages",
        {
          orderId: selectedOrderId,
          content: newMsg,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessages((prev) => [...prev, res.data]);
      setNewMsg("");
    } catch (err) {
      console.error("❌ Failed to send message", err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Orders List */}
      <div className="md:w-1/3">
        <h2 className="text-lg font-semibold mb-4">Your Orders</h2>
        {orders.length === 0 ? (
          <p className="text-gray-500">No orders found.</p>
        ) : (
          <ul className="space-y-2">
            {orders.map((order) => (
              <li
                key={order._id}
                className={`p-3 border rounded cursor-pointer ${
                  selectedOrderId === order._id
                    ? "bg-blue-100 border-blue-400"
                    : "bg-white"
                }`}
                onClick={() => setSelectedOrderId(order._id)}
              >
                <p className="font-semibold">
                  {order.gigId?.title || "Unnamed Gig"}
                </p>
                <p className="text-sm text-gray-500">
                  Order #{order._id.slice(-6)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Messages */}
      <div className="md:w-2/3">
        <h2 className="text-lg font-semibold mb-4">Messages</h2>
        {selectedOrderId ? (
          <div className="flex flex-col h-[400px] border rounded p-4 bg-white">
            <div className="flex-1 overflow-y-auto mb-4 space-y-2">
              {messages.length === 0 ? (
                <p className="text-gray-500">No messages yet.</p>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg._id}
                    className={`p-2 rounded w-fit max-w-[80%] ${
                      msg.sender === user._id
                        ? "bg-blue-500 text-white ml-auto"
                        : "bg-gray-200 text-black"
                    }`}
                  >
                    {msg.content}
                  </div>
                ))
              )}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newMsg}
                onChange={(e) => setNewMsg(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 border rounded px-3 py-1"
              />
              <button
                onClick={sendMessage}
                className="bg-blue-600 text-white px-4 rounded"
              >
                Send
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Select an order to view messages.</p>
        )}
      </div>
    </div>
  );
}