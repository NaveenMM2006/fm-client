
// import { Link, useNavigate } from "react-router-dom";

// export default function Navbar() {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const navigate = useNavigate();

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
//               {user.role === "freelancer" && (
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
    <nav className="bg-blue-700 text-white px-4 py-3 shadow  w-full z-50 top-0">
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

              {/* 👇 Main fix: conditional dashboard link */}
              {user.role === "freelancer" ? (
                <Link to="/freelancer" className="hover:underline">
                  Dashboard
                </Link>
              ) : (
                <Link to="/dashboard" className="hover:underline">
                  Dashboard
                </Link>
              )}

              {/* 👇 Only freelancer sees Create Gig */}
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