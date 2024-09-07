// context/AuthContext.js
import { createContext, useContext, useState } from "react";

const AuthContext = createContext(); // Create an AuthContext to manage authentication state

export const AuthProvider = ({ children }) => {
  // Initialize state with user data from localStorage if available
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Function to handle user login
  const login = (userData) => {
    setUser(userData); // Set user data in state
    localStorage.setItem("user", JSON.stringify(userData)); // Store user data in localStorage
  };

  // Function to handle user logout
  const logout = () => {
    setUser(null); // Clear user data from state
    localStorage.removeItem("user"); // Remove user data from localStorage
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}{" "}
      {/* Render children components with access to authentication state */}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
