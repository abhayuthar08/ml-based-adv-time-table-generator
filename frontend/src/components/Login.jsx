import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // For navigation after successful login

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(''); // Clear error message on input change
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Save token to localStorage or state (optional)
        localStorage.setItem('token', data.token); // Example: storing token for authentication
        alert('Login successful!');
        navigate('/home'); // Redirect to dashboard or home
      } else {
        setError(data.message || 'Invalid email or password');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Section: Image */}
      <div className="hidden lg:flex w-1/2 items-center justify-center bg-blue-500">
        <img
          src="https://images.unsplash.com/photo-1736924862365-9038a7e1be81?q=80&w=1899&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Login"
          className="object-cover w-full h-[100vh]"
        />
      </div>

      {/* Right Section: Login Form */}
      <div className="flex items-center justify-center w-full lg:w-1/2 bg-gradient-to-br from-blue-100 to-blue-400">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center text-blue-600">Login to SchedulifyX</h1>
          <p className="mt-2 text-sm text-center text-gray-600">
            Enter your credentials to access your account.
          </p>

          <form onSubmit={handleLogin} className="mt-6 space-y-6">
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
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Error Message */}
          {error && (
            <div className="mt-4 text-center text-red-600">
              {error}
            </div>
          )}

          <div className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <span
              onClick={() => navigate('/register')}
              className="text-blue-600 cursor-pointer hover:underline"
            >
              Register here
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
