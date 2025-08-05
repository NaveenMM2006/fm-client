// // src/components/Sidebar.jsx
// import { Link, useNavigate } from "react-router-dom";

// export default function Sidebar() {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   return (
//     <div className="h-screen w-64 bg-blue-800 text-white flex flex-col p-4 fixed">
//       <h2 className="text-2xl font-bold mb-8">Freelancer</h2>

//       <nav className="flex flex-col space-y-4 text-sm">
//         <Link to="/freelancer" className="hover:bg-blue-600 p-2 rounded">Overview</Link>
//         <Link to="/gigs" className="hover:bg-blue-600 p-2 rounded">My Gigs</Link>
//         <Link to="/dashboard" className="hover:bg-blue-600 p-2 rounded">Orders</Link>
//         <Link to="#" className="hover:bg-blue-600 p-2 rounded">Messages</Link>
//         <Link to="#" className="hover:bg-blue-600 p-2 rounded">Reviews</Link>
//         <Link to="#" className="hover:bg-blue-600 p-2 rounded">Earnings</Link>
//         <Link to="#" className="hover:bg-blue-600 p-2 rounded">Settings</Link>
//         <button onClick={handleLogout} className="text-left hover:bg-red-600 p-2 rounded mt-6">Logout</button>
//       </nav>
//     </div>
//   );
// }

// src/components/Sidebar.jsx
// src/components/Sidebar.jsx
import { useNavigate } from "react-router-dom";

export default function Sidebar({ setActiveTab, activeTab }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const links = [
    { label: "Overview", key: "overview" },
    { label: "My Gigs", key: "gigs" },
    { label: "Orders", key: "orders" },
    { label: "Messages", key: "messages" },
    { label: "Reviews", key: "reviews" },
    { label: "Earnings", key: "earnings" },
    { label: "Settings", key: "settings" },
  ];

  return (
    <div className="h-screen w-64 bg-blue-800 text-white flex flex-col p-4 fixed">
      <h2 className="text-2xl font-bold mb-8">Freelancer</h2>
      <nav className="flex flex-col space-y-2 text-sm">
        {links.map((link) => (
          <button
            key={link.key}
            onClick={() => setActiveTab(link.key)}
            className={`text-left p-2 rounded ${
              activeTab === link.key ? "bg-blue-600" : "hover:bg-blue-700"
            }`}
          >
            {link.label}
          </button>
        ))}
        <button
          onClick={handleLogout}
          className="text-left hover:bg-red-600 p-2 rounded mt-6"
        >
          Logout
        </button>
      </nav>
    </div>
  );
}