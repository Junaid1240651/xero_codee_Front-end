import React, { useEffect, useState } from "react";
import "../css/hostingSetup.css";
import XeroLogo from "../images/xerologo.png";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const HostingSetup = () => {
  const [placeholderText, setPlaceholderText] = useState("Organization Name");
  const [isInputVisible, setInputVisible] = useState(false);
  const [activeButton, setActiveButton] = useState(""); // Track the active button
  const [isSubmitted, setIsSubmitted] = useState(false); // Track submission status
  const [inputValue, setInputValue] = useState(""); // Track input field value
  const [userDetails, setUserDetails] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
  }); // Track input field value
  const [isAVisible, setIsAVisible] = useState(false); // Track input field value
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user has a valid JWT token stored in localStorage
    const token = localStorage.getItem("token");
    const parsedData = JSON.parse(localStorage.getItem("userDetails"));

    if (token) {
      setUserDetails(parsedData);
      // You should also validate the token on the server-side
      // For simplicity, we assume a token is valid if it exists in localStorage
    } else {
    }
  }, []);

  const handleButtonClick = (text, buttonId) => {
    setPlaceholderText(text);
    setInputVisible(true); // Show the input field when a button is clicked
    setActiveButton(buttonId); // Set the active button
    setIsSubmitted(false); // Reset submission status
    setInputValue(""); // Clear input field value
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    // Check if the input field value is not empty
    if (inputValue.trim() !== "") {
      setIsSubmitted(true);
      setInputVisible(false); // Hide the input field after submission
      setIsAVisible(true);
    }
  };

  const handleSelecyHosting = () => {
    navigate("/");
  };
  return (
    <div className="hostingSetup-container">
      <div className="hostingSetup-content">
        <img src={XeroLogo} />
        <p>
          Welcome{" "}
          {userDetails
            ? userDetails.firstName + " " + userDetails.lastName
            : ""}
        </p>
        <div className="section-heade">
          <div className="divider"></div>
          <p>Choose From the Following</p>
          <div className="divider"></div>
        </div>

        <div
          className={
            isAVisible === true ? "hidden-button-group" : "button-group"
          }
        >
          <button
            onClick={() => handleButtonClick("Developer Name", "developer")}
            className={activeButton === "developer" ? "active" : ""}
          >
            Developer
          </button>
          <button
            onClick={() =>
              handleButtonClick("Organization Name", "organization")
            }
            className={activeButton === "organization" ? "active" : ""}
          >
            Organization
          </button>
          <button
            onClick={() => handleButtonClick("Company Name", "company")}
            className={activeButton === "company" ? "active" : ""}
          >
            Company
          </button>
        </div>
        {isInputVisible ? (
          <motion.div
            animate={{ x: 0, y: 0, scale: 1 }}
            initial={{ scale: 0 }}
            className="input-sectio"
          >
            <input
              placeholder={placeholderText}
              value={inputValue}
              onChange={handleInputChange}
            />
            <button onClick={handleSubmit}>SUBMIT</button>
          </motion.div>
        ) : (
          ""
        )}

        {isSubmitted && inputValue.trim() !== "" && (
          <motion.div
            animate={{ x: 0, y: 0, scale: 1 }}
            initial={{ scale: 0 }}
            className="hostingSetup-options"
          >
            <button onClick={handleSelecyHosting}>Self Hosting</button>
            <button onClick={handleSelecyHosting}>XeroCodee Hosting</button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default HostingSetup;
