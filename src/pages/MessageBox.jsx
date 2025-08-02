import { useEffect, useState } from "react";
import API from "../utils/api";

export default function MessageBox({ orderId }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await API.get(`/messages/${orderId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessages(res.data);
      } catch (err) {
        console.error("Failed to load messages");
      }
    };
    fetchMessages();
  }, [orderId, token]);

 const sendMessage = async (e) => {
  e.preventDefault();
  if (!text.trim()) return;

  try {
    const res = await API.post(
      "/messages",
      { orderId, content: text },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const user = JSON.parse(localStorage.getItem("user"));
    setMessages((prev) => [
      ...prev,
      { ...res.data, sender: { name: user.name, role: user.role } },
    ]);
    setText("");
  } catch (err) {
    console.error("Failed to send message:", err.response?.data || err.message);
    alert("Failed to send message");
  }
};

  return (
    <div className="mt-4 border rounded p-3 bg-gray-50">
      <h4 className="font-semibold text-gray-700 mb-2">Messages</h4>
      <div className="max-h-48 overflow-y-auto text-sm space-y-1">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`p-2 rounded ${
              msg.sender.role === "seller"
                ? "bg-blue-100 text-left"
                : "bg-green-100 text-right"
            }`}
          >
            <strong>{msg.sender.name}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="flex mt-2 gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </form>
    </div>
  );
}