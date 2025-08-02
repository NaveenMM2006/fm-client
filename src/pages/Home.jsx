// import { Link } from "react-router-dom";

// export default function Home() {
//   return (
//     <div>
//       {/* Hero Section */}
//       <section className="bg-blue-600 text-white text-center py-20 px-4">
//         <h1 className="text-4xl font-bold mb-4">Find & Hire Top Freelancers</h1>
//         <p className="text-lg mb-6">Your one-stop marketplace for quality gigs at affordable prices.</p>
//         <div className="space-x-4">
//           <Link to="/register">
//             <button className="bg-white text-blue-600 px-6 py-2 rounded font-semibold hover:bg-gray-100">
//               Get Started
//             </button>
//           </Link>
//           <Link to="/gigs">
//             <button className="bg-transparent border border-white px-6 py-2 rounded font-semibold hover:bg-white hover:text-blue-600">
//               Explore Gigs
//             </button>
//           </Link>
//         </div>
//       </section>

//       {/* Features */}
//       <section className="py-16 px-6 bg-gray-100 text-center">
//         <h2 className="text-2xl font-bold mb-10 text-gray-800">Why Choose Us?</h2>
//         <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
//           {[
//             ["Affordable Pricing", "Get top-notch work at budget-friendly rates."],
//             ["Verified Freelancers", "Every freelancer is screened & rated."],
//             ["Secure Payments", "Your money is safe until work is delivered."],
//           ].map(([title, desc]) => (
//             <div key={title} className="bg-white p-6 rounded shadow">
//               <h3 className="font-semibold text-lg mb-2 text-blue-700">{title}</h3>
//               <p className="text-gray-600 text-sm">{desc}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Categories */}
//       <section className="py-16 px-6">
//         <h2 className="text-2xl font-bold text-center text-gray-800 mb-10">Popular Categories</h2>
//         <div className="flex flex-wrap justify-center gap-4">
//           {["Design", "Writing", "Programming", "Marketing", "Video Editing", "Business"].map(
//             (cat) => (
//               <span
//                 key={cat}
//                 className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium"
//               >
//                 {cat}
//               </span>
//             )
//           )}
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-800 text-white py-6 text-center text-sm">
//         Made with ❤ by Naveen © {new Date().getFullYear()}
//       </footer>
//     </div>
//   );
// }
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-blue-600 text-white text-center py-20 px-4">
        <motion.h1
          className="text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Find & Hire Top Freelancers
        </motion.h1>
        <motion.p
          className="text-lg mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Your one-stop marketplace for quality gigs at affordable prices.
        </motion.p>
        <motion.div
          className="space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Link to="/register">
            <button className="bg-white text-blue-600 px-6 py-2 rounded font-semibold hover:bg-gray-100">
              Get Started
            </button>
          </Link>
          <Link to="/gigs">
            <button className="bg-transparent border border-white px-6 py-2 rounded font-semibold hover:bg-white hover:text-blue-600">
              Explore Gigs
            </button>
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-gray-100 text-center">
        <motion.h2
          className="text-2xl font-bold mb-10 text-gray-800"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Why Choose Us?
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto ">
          {[
            ["Affordable Pricing", "Get top-notch work at budget-friendly rates."],
            ["Verified Freelancers ", "Every freelancer is screened & rated."],
            ["Secure Payments", "Your money is safe until work is delivered."],
          ].map(([title, desc], idx) => (
            <motion.div
              key={title}
              className="bg-white p-6 rounded shadow"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="font-semibold text-lg mb-2 text-blue-700">{title}</h3>
              <p className="text-gray-600 text-sm">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-6">
        <motion.h2
          className="text-2xl font-bold text-center text-gray-800 mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Popular Categories
        </motion.h2>
        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {[
            "Design",
            "Writing",
            "Programming",
            "Marketing",
            "Video Editing",
            "Business",
          ].map((cat, i) => (
            <motion.span
              key={cat}
              className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {cat}
            </motion.span>
          ))}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 text-center text-sm">
        Made with ❤ by Naveen © {new Date().getFullYear()}
      </footer>
    </div>
  );
}