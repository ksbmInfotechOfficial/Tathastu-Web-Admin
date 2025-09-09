import React, { useState } from "react";

const PaymentPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      // Step 1: Create Razorpay Order on your server and get order_id
      const response = await fetch('http://localhost:6800/api/puja/create_razorpay_order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 26000, // Amount in INR (500 = ₹500)
          pujaDate: '2025-03-08T10:00:00Z'
        }),
      });

      const data = await response.json();
      
      // if (!data.status) {
      //   throw new Error('Order creation failed');
      // }

      // Step 2: Open Razorpay Checkout
      const options = {
        key: "rzp_test_7FcETDDAqUcnFu", // Your Razorpay key ID
        amount: data.data.amount, // Amount in paise (e.g., 50000 for ₹500)
        currency: "INR",
        name: "KSBM INFOTECH",
        description: "Test Transaction",
        order_id: 'order_Q3T6Dz46TP4ghy', // Razorpay order ID from the backend
        handler: function (response) {
          console.log(response);
          alert("Payment Successful!");
          // Optionally, send the payment details to your backend for verification
        },
        prefill: {
          name: "John Doe",
          email: "john.doe@example.com",
          contact: "6393234384",
        },
        theme: {
          color: "#F37254",
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Payment Page</h1>
      {isLoading && <p>Loading Razorpay...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <button onClick={handlePayment} disabled={isLoading}>
        {isLoading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
};

export default PaymentPage;
