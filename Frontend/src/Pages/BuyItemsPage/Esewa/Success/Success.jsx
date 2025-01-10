import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Success = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Extract token from query parameters
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("data");
  const decoded = base64Decode(token);

  const verifyPaymentAndUpdateStatus = async () => {
    try {
      const response = await axios.post("http://localhost:3000/payment-status", {
        product_id: decoded.transaction_uuid,
      });
      if (response.status === 200) {
        setIsLoading(false);
        setIsSuccess(true);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error initiating payment:", error);
    }
  };

  useEffect(() => {
    verifyPaymentAndUpdateStatus();
  }, []);

  if (isLoading && !isSuccess) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <h1 className="text-2xl font-bold text-gray-600">Loading...</h1>
      </div>
    );
  }

  if (!isLoading && !isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-3xl font-bold text-red-600">
          Oops!.. Error occurred on confirming payment
        </h1>
        <h2 className="text-xl text-gray-700 mt-4">We will resolve it soon.</h2>
        <button
          onClick={() => navigate("/")}
          className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Go to Homepage
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-green-600 bg-green-100 px-10 py-5 rounded-lg">
        Payment Successful!
      </h1>
      <p className="text-xl text-gray-700 mt-4 bg-red-100 px-8 py-4 rounded-lg">
        Thank you for your payment. Your transaction was successful.
      </p>
      <button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        Go to Homepage
      </button>
    </div>
  );
};

export default Success;

// Utility function to decode Base64
function base64Decode(base64) {
  const standardBase64 = base64.replace(/-/g, "+").replace(/_/g, "/");
  const decoded = atob(standardBase64);
  return JSON.parse(decoded);
}
