import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate(); // For navigation after successful registration

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => navigate('/login'), 2000); // Redirect to login after 2 seconds
        setFormData({ name: '', email: '', password: '' });
      } else {
        alert(data.message); // Show error message from backend
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Section: Image */}
      <div className="hidden lg:flex w-1/2 items-center justify-center bg-blue-500">
        <img
          src="https://images.unsplash.com/photo-1735370436237-779239d71e8e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMXx8fGVufDB8fHx8fA%3D%3D"
          alt="Education"
          className="object-cover w-full h-[100vh]"
        />
      </div>

      {/* Right Section: Registration Form */}
      <div className="flex items-center justify-center w-full lg:w-1/2 bg-gradient-to-br from-blue-100 to-blue-400">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center text-blue-600">Register for SchedulifyX</h1>
          <p className="mt-2 text-sm text-center text-gray-600">
            Please fill in the details to create your account.
          </p>

          <form onSubmit={handleRegister} className="mt-6 space-y-6">
            {/* Name Field */}
            <div className="relative">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="peer w-full p-3 text-gray-800 bg-gray-100 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder=" "
              />
              <label className="absolute text-sm text-gray-500 transform -translate-y-3 scale-90 top-2 left-3 bg-white px-1 peer-placeholder-shown:translate-y-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400 transition-all">
                Full Name
              </label>
            </div>

            {/* Email Field */}
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="peer w-full p-3 text-gray-800 bg-gray-100 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder=" "
              />
              <label className="absolute text-sm text-gray-500 transform -translate-y-3 scale-90 top-2 left-3 bg-white px-1 peer-placeholder-shown:translate-y-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400 transition-all">
                Email Address
              </label>
            </div>

            {/* Password Field */}
            <div className="relative">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="6"
                className="peer w-full p-3 text-gray-800 bg-gray-100 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder=" "
              />
              <label className="absolute text-sm text-gray-500 transform -translate-y-3 scale-90 top-2 left-3 bg-white px-1 peer-placeholder-shown:translate-y-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400 transition-all">
                Password
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full p-3 text-white font-bold bg-blue-600 rounded-md shadow-md transition-all ${
                loading ? 'bg-blue-400 cursor-not-allowed' : 'hover:bg-blue-700'
              }`}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>

          {success && (
            <div className="mt-4 text-center text-green-600">
              Registration successful! Redirecting to login...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
