// src/pages/FreelancerDashboard.jsx
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Overview from "./freelancer/Overview";
import FGigs from "./freelancer/FGigs";
import Orders from "./freelancer/Orders";
import Messages from "./freelancer/Messages";
import Reviews from "./freelancer/Reviews";
import Earnings from "./freelancer/Earnings";
import Settings from "./freelancer/Settings";

export default function FreelancerDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "gigs": return <FGigs />;
      case "orders": return <Orders />;
      case "messages": return <Messages />;
      case "reviews": return <Reviews />;
      case "earnings": return <Earnings />;
      case "settings": return <Settings />;
      default: return <Overview />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className={`fixed z-50 md:relative md:translate-x-0 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:w-64`}>
        <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} />
      </div>

      {/* Main Content */}
      <div className="pl-0 md:pl-5 flex-1 overflow-y-auto p-8 bg-gray-100">
        {/* Mobile sidebar toggle */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="px-3 py-2 bg-blue-600 text-white rounded"
          >
            {sidebarOpen ? "Close Menu" : "Open Menu"}
          </button>
        </div>

        {renderContent()}
      </div>
    </div>
  );
}