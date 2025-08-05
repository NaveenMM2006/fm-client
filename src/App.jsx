// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Gigs from './pages/Gigs';
// import Dashboard from './pages/Dashboard';
// import Navbar from './components/Navbar';
// import ProtectedRoute from "./utils/ProtectedRoute";
// import CreateGig from './pages/CreateGig';
// import Payment from "./pages/Payment";
// import GigDetail from './pages/GigDetail';

// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/gigs" element={<Gigs />} />
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/create"
//           element={
//             <ProtectedRoute role="seller">
//               <CreateGig />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/payment/:gigId"
//           element={
//             <ProtectedRoute>
//               <Payment />
//             </ProtectedRoute>
//           }
//         />
//         <Route path="/gigs/:id" element={<GigDetail />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Gigs from './pages/Gigs';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import ProtectedRoute from "./utils/ProtectedRoute";
import CreateGig from './pages/CreateGig';
import Payment from "./pages/Payment";
import GigDetail from './pages/GigDetail';
import FreelancerDashboard
 from './pages/FreelancerDashboard';
function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/gigs" element={<Gigs />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/create" element={<ProtectedRoute role="freelancer"><CreateGig /></ProtectedRoute>} />
        <Route path="/payment/:gigId" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
        <Route path="/gigs/:id" element={<GigDetail />} />
        <Route path="/freelancer" element={<ProtectedRoute role="freelancer"><FreelancerDashboard/></ProtectedRoute>} />
        <Route path="/create-gig" element={<CreateGig />} />
<Route path="/edit-gig/:id" element={<CreateGig />} />
      </Routes>
    </Router>
  );
}

export default App;