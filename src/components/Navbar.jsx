// import { Link, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";

// export default function Navbar() {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       try {
//         setUser(JSON.parse(storedUser));
//       } catch {
//         setUser(null);
//       }
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   return (
//     <nav className="bg-blue-700 text-white px-4 py-3 shadow">
//       <div className="max-w-6xl mx-auto flex justify-between items-center">
//         <Link to="/" className="text-xl font-bold">
//           FreelanceX
//         </Link>

//         <div className="space-x-4 text-sm md:text-base">
//           {user ? (
//             <>
//               <Link to="/gigs" className="hover:underline">
//                 Explore Gigs
//               </Link>
//               <Link to="/dashboard" className="hover:underline">
//                 Dashboard
//               </Link>

//               {/* Show Create Gig only for sellers */}
//               {user?.role === "freelancer" && (
//                 <Link to="/create" className="hover:underline">
//                   Create Gig
//                 </Link>
//               )}

//               <button
//                 onClick={handleLogout}
//                 className="bg-white text-blue-700 px-3 py-1 rounded hover:bg-gray-100"
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
//               <Link to="/login" className="hover:underline">
//                 Login
//               </Link>
//               <Link to="/register" className="hover:underline">
//                 Register
//               </Link>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-700 text-white px-4 py-3 shadow">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          FreelanceX
        </Link>

        <div className="space-x-4 text-sm md:text-base">
          {user ? (
            <>
              <Link to="/gigs" className="hover:underline">
                Explore Gigs
              </Link>
              <Link to="/dashboard" className="hover:underline">
                Dashboard
              </Link>
              {user.role === "freelancer" && (
                <Link to="/create" className="hover:underline">
                  Create Gig
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="bg-white text-blue-700 px-3 py-1 rounded hover:bg-gray-100"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/register" className="hover:underline">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
