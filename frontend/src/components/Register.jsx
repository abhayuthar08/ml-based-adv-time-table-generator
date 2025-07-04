import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      setMessage({ text: "All fields are required!", type: "error" });
      return;
    }

    if (!strongPasswordRegex.test(formData.password)) {
      setMessage({
        text: "Password must be 8+ characters, including uppercase, lowercase, number, and special character.",
        type: "error",
      });
      return;
    }

    setLoading(true);
    setMessage({ text: "" });

    try {
      const BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ text: "🎉 Registration successful! Redirecting...", type: "success" });
        setTimeout(() => navigate("/login"), 2000);
        setFormData({ name: "", email: "", password: "" });
      } else {
        setMessage({ text: data.message || "Registration failed!", type: "error" });
      }
    } catch (error) {
      console.error("Registration error:", error);
      setMessage({ text: "Something went wrong. Please try again.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex max-h-screen">
      {/* Left Section */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0, transition: { duration: 0.8 } }}
        className="hidden lg:flex w-1/2 items-center justify-center bg-blue-600"
      >
        <img
          src="https://images.unsplash.com/photo-1735370436237-779239d71e8e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMXx8fGVufDB8fHx8fA%3D%3D"
          alt="Education"
          className="object-cover w-full h-full opacity-90"
        />
      </motion.div>

      {/* Right Section */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0, transition: { duration: 0.8 } }}
        className="flex items-center justify-center w-full lg:w-1/2 bg-gradient-to-br from-blue-200 to-blue-500 p-6"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1, transition: { duration: 0.5 } }}
          className="w-full max-w-md p-8 bg-white rounded-lg shadow-2xl"
        >
          <h1 className="text-3xl font-bold text-center text-blue-600">Create Your Account</h1>
          <p className="mt-2 text-sm text-center text-gray-600">
            Join SchedulifyX and manage your schedules efficiently.
          </p>

          {message.text && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.4 } }}
              className={`mt-4 text-center p-2 rounded ${
                message.type === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message.text}
            </motion.div>
          )}

          <form onSubmit={handleRegister} className="mt-6 space-y-6">
            <motion.div whileFocus={{ scale: 1.05 }}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 text-gray-800 bg-gray-100 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Full Name"
              />
            </motion.div>

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

            <motion.div whileFocus={{ scale: 1.05 }}>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="8"
                className="w-full p-3 text-gray-800 bg-gray-100 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Password"
              />
              <p className="mt-1 text-sm text-gray-600">
                Must be 8+ characters, 1 uppercase, 1 lowercase, 1 number, 1 special character.
              </p>
            </motion.div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 10px rgba(0, 0, 255, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              disabled={loading}
              className={`w-full p-3 text-white font-bold bg-blue-600 rounded-md shadow-md transition-all ${
                loading ? "bg-blue-400 cursor-not-allowed" : "hover:bg-blue-700"
              }`}
            >
              {loading ? "Registering..." : "Register"}
            </motion.button>
          </form>

          <div className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <motion.span
              whileHover={{ scale: 1.1, color: "#1e3a8a" }}
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => navigate("/login")}
            >
              Login here
            </motion.span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Register;
