
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import mnnitlogo2 from "./assets/mnnitlogo2.jpg";

const LandingPage = () => {
  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center text-white overflow-hidden"
      style={{ backgroundImage: `url('/path/to/your/landing-bg.jpg')` }}
    >
      {/* Navbar */}
      <motion.nav
        className="bg-gradient-to-b from-blue-800 to-blue-600 py-4 px-6 flex justify-between items-center shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center">
          <img
            src={mnnitlogo2}
            alt="MNNIT GameZone Logo"
            className="h-12 w-auto rounded-full  shadow-md mr-4"
          />
          <h1 className="text-2xl font-bold text-white">MNNIT GameZone</h1>
        </div>
        <div className="space-x-4">
          <Link
            to="/login"
            className="text-gray-200 hover:text-white font-medium"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 rounded-md font-medium text-gray-900"
          >
            Sign Up
          </Link>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-center text-center space-y-12 p-6 bg-gradient-to-t from-gray-900 to-gray-800">
        {/* Headline and CTA */}
        <motion.div
          className="max-w-3xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h1 className="text-5xl font-extrabold text-yellow-400">
            Join the MNNIT Gaming Challenge
          </h1>
          <p className="text-xl text-gray-300 mt-4 max-w-2xl mx-auto">
            Embark on unique challenges inspired by MNNIT’s legacy. Connect,
            compete, and experience college life in a new way through gaming.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <Link to="/register">
              <button className="px-8 py-4 rounded-md bg-yellow-500 hover:bg-yellow-400 font-semibold text-lg text-gray-900 transition transform hover:scale-105">
                Get Started
              </button>
            </Link>
            <Link to="/login">
              <button className="px-8 py-4 rounded-md bg-gray-800 hover:bg-gray-700 font-semibold text-lg transition transform hover:scale-105">
                Log In
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Testimonials */}
        <div className="text-gray-200 max-w-3xl">
          <h2 className="text-3xl font-bold mb-2">What Students Are Saying</h2>
          <blockquote className="italic text-lg">
            “MNNIT GameZone connects us in a whole new way! The tasks make me
            feel closer to my college community and campus.”
          </blockquote>
          <p className="text-right">- Shivangi Verma, Computer Science</p>
        </div>

        {/* Newsletter Signup */}
        <div className="max-w-3xl w-full text-center">
          <h2 className="text-3xl font-bold text-yellow-400 mb-4">
            Stay Updated
          </h2>
          <form className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <input
              type="email"
              placeholder="Your Email"
              className="w-full sm:w-auto flex-grow px-4 py-3 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-yellow-500"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-md bg-yellow-500 text-gray-900 font-semibold hover:bg-yellow-400 transition"
            >
              Subscribe for Updates
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 p-6 text-center text-gray-400">
        <p>&copy; 2024 MNNIT GameZone. All rights reserved.</p>
        <div className="space-x-4 mt-4">
          <Link to="/privacy" className="hover:text-white">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:text-white">
            Terms of Service
          </Link>
          <Link to="/contact" className="hover:text-white">
            Contact Us
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
