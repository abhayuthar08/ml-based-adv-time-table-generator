import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear any user session or authentication tokens (if needed)
    localStorage.removeItem("authToken"); // Example: Clear token from localStorage
    sessionStorage.clear(); // Example: Clear session storage

    // Redirect to Home page
    navigate("/home");
  }, [navigate]);

  return null; // No UI needed, it just redirects
};

export default Logout;
