

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error when user types
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/");
      } else {
        setError(data.message || "Invalid email or password.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex max-h-screen">
      {/* Left Section (Image & Animation) */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0, transition: { duration: 0.8 } }}
        className="hidden lg:flex w-1/2 items-center justify-center bg-blue-600"
      >
        <img
       src="https://images.unsplash.com/photo-1736924862365-9038a7e1be81?q=80&w=1899&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="object-cover w-full h-full opacity-80"
        />
      </motion.div>

      {/* Right Section (Login Form) */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0, transition: { duration: 0.8 } }}
        className="flex items-center justify-center w-full lg:w-1/2 bg-gradient-to-br from-blue-200 to-blue-500"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1, transition: { duration: 0.5 } }}
          className="w-full max-w-md p-8 bg-white rounded-lg shadow-2xl"
        >
          <h1 className="text-3xl font-bold text-center text-blue-600">Welcome to SchedulifyX</h1>
          <p className="mt-2 text-sm text-center text-gray-600">Log in to access your schedule.</p>

          {/* Form */}
          <form onSubmit={handleLogin} className="mt-6 space-y-6">
            {/* Email Input */}
            <motion.div whileFocus={{ scale: 1.05 }}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 text-gray-800 bg-gray-100 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Email Address"
              />
            </motion.div>

            {/* Password Input */}
            <motion.div whileFocus={{ scale: 1.05 }}>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full p-3 text-gray-800 bg-gray-100 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Password"
              />
            </motion.div>

            {/* Login Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 10px rgba(0, 0, 255, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              disabled={loading}
              className={`w-full p-3 text-white font-bold bg-blue-600 rounded-md shadow-md transition-all ${
                loading ? "bg-blue-400 cursor-not-allowed" : "hover:bg-blue-700"
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </motion.button>
          </form>

          {/* Animated Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.4 } }}
              className="mt-4 text-center text-red-600"
            >
              {error}
            </motion.div>
          )}

          {/* Register Link */}
          <div className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <motion.span
              whileHover={{ scale: 1.1, color: "#1e3a8a" }}
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => navigate("/register")}
            >
              Register here
            </motion.span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
