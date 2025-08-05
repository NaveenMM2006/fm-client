// src/pages/freelancer/Settings.jsx
import { useState } from "react";
import API from "../../utils/api";

export default function Settings() {
  const [password, setPassword] = useState("");
  const [newName, setNewName] = useState("");
  const token = localStorage.getItem("token");

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      await API.post(
        "/auth/change-password",
        { password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Password updated successfully");
      setPassword("");
    } catch (err) {
      alert("Failed to update password");
    }
  };

  const handleUpdateName = async (e) => {
    e.preventDefault();
    try {
      await API.put(
        "/auth/update-name",
        { name: newName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Name updated successfully");
      localStorage.setItem(
        "user",
        JSON.stringify({ ...JSON.parse(localStorage.getItem("user")), name: newName })
      );
      setNewName("");
    } catch (err) {
      alert("Failed to update name");
    }
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold text-gray-700">Settings</h2>

      <form onSubmit={handleChangePassword} className="space-y-2">
        <label className="block text-sm font-medium">Change Password</label>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
        >
          Update Password
        </button>
      </form>

      <form onSubmit={handleUpdateName} className="space-y-2">
        <label className="block text-sm font-medium">Update Display Name</label>
        <input
          type="text"
          placeholder="New Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
        >
          Update Name
        </button>
      </form>
    </div>
  );
}