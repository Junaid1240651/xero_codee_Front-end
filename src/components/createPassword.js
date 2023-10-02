import React, { useState } from "react";

const SetPassword = ({ onPasswordSet }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password === confirmPassword) {
      onPasswordSet(password); // Pass the password to the parent component
    } else {
      // Handle password mismatch error
      alert("Password And Confirm-Password do not match");
    }
  };

  return (
    <form onSubmit={handlePasswordSubmit}>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <button className="Complete-SignUp-button" type="submit">
        Complete SignUp Process
      </button>
    </form>
  );
};

export default SetPassword;
