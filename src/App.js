import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import HostingSetup from "./components/hostingSetup";
import LoginAndSignup from "./components/loginAndSignup";
import Home from "./pages/home";
import Navbar from "./components/navbar";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  const handleAuthentication = () => {
    setIsAuthenticated(true);
   
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token"); // Remove the token from local storage on logout
  };

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "token" && e.newValue === null) {
        handleLogout();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    // Function to check if the token is valid
    const checkTokenValidity = async () => {
      if (isAuthenticated) {
        try {
          const response = await fetch(
            "https://xero-codee-backend.onrender.com/api/verify-token",
            {
              method: "GET",
              headers: {
                Authorization: localStorage.getItem("token"),
              },
            }
          );

          if (response.status === 200) {
            // Token is valid
            console.log("Token is valid");
          } else {
            // Token is not valid, perform logout
            console.log("Token is not valid");
            handleLogout();
          }
        } catch (error) {
          console.error("Error checking token validity:", error);
        }
      }
    };

    checkTokenValidity(); // Check token validity when the component mounts
  }, [isAuthenticated]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Home onAuthentication={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/signup"
          element={
            isAuthenticated ? (
              <Navigate to="/choose" replace={true} />
            ) : (
              <LoginAndSignup onAuthentication={handleAuthentication} />
            )
          }
        />
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/choose" replace={true} />
            ) : (
              <LoginAndSignup onAuthentication={handleAuthentication} />
            )
          }
        />
        <Route
          path="/choose"
          element={
            isAuthenticated ? <HostingSetup /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
