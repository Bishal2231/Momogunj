import React, { useState, useRef } from "react";

const ConformationPage = () => {
  const [code, setCode] = useState(["", "", "", ""]); // Stores individual digits of the code
  const [isCodeSent, setIsCodeSent] = useState(false); // State to track if the code is sent

  // Refs for each input field to manage focus
  const inputRefs = useRef([]);

  // Handle input change for each field
  const handleChange = (e, index) => {
    const value = e.target.value;

    // Check if the value is a number and update the state
    if (/[^0-9]/.test(value)) return; // Reject non-digit input

    const newCode = [...code];
    newCode[index] = value.slice(0, 1); // Only allow one digit per input
    setCode(newCode);

    // Move focus to the next input field if the current one is filled
    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle Send Code button click
  const handleSendCode = () => {
    // You can perform the logic to send the code here
    setIsCodeSent(true); // Mark the code as sent
    alert("Code sent successfully!"); // For example, show an alert
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold text-center mb-6">Enter Verification Code</h2>

        <div className="flex justify-between mb-4">
          {code.map((digit, index) => (
            <input
              key={index}
              type="text"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              maxLength={1}
              className="w-12 h-12 text-center border-2 border-gray-300 rounded-lg text-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              inputMode="numeric" // Helps mobile devices show numeric keypad
              ref={(el) => (inputRefs.current[index] = el)} // Assign ref to each input field
            />
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={handleSendCode}
            className="w-full py-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            {isCodeSent ? "Code Sent" : "Send Code"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConformationPage;
