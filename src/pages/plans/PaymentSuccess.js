import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle, FaArrowRight } from 'react-icons/fa';

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay (for example, fetching confirmation from your backend)
    const { state } = location;

    if (state && state.status === 'success') {
      setPaymentDetails({
        status: 'success',
        orderId: state.orderId,
        paymentId: state.paymentId,
        amount: state.amount, // Pass this in your payment response or state
        planId: state.planId, // Pass this too
        duration: state.duration, // Pass this too (e.g., monthly, yearly)
      });
      setLoading(false);
    } else {
      setPaymentDetails({
        status: 'failed',
        error: 'Payment could not be completed. Please try again.',
      });
      setLoading(false);
    }
  }, [location]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7FBFF] flex items-center justify-center">
        <div className="text-center text-lg text-blue-800">Processing payment...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7FBFF] flex items-center justify-center py-6 px-4 sm:px-0">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full sm:w-96 max-w-lg">
        {paymentDetails.status === 'success' ? (
          <div className="text-center space-y-4">
            <FaCheckCircle className="text-green-500 text-5xl mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful</h1>
            <p className="text-sm text-gray-700">Thank you for your purchase! Your transaction has been completed successfully.</p>

            {/* Transaction Details */}
            <div className="text-left text-sm space-y-2 mb-6">
              <p className="text-gray-500">Order ID: <span className="font-medium text-gray-800">{paymentDetails.orderId}</span></p>
              <p className="text-gray-500">Payment ID: <span className="font-medium text-gray-800">{paymentDetails.paymentId}</span></p>
              <p className="text-gray-500">Amount Paid: <span className="font-medium text-gray-800">₹{paymentDetails.amount}</span></p>
              <p className="text-gray-500">Plan: <span className="font-medium text-gray-800">{paymentDetails.planId}</span></p>
              <p className="text-gray-500">Duration: <span className="font-medium text-gray-800">{paymentDetails.duration}</span></p>
            </div>

            {/* Thank You Message */}
            <div className="mb-6">
              <p className="text-lg font-semibold text-gray-900 mb-2">Thank you for choosing our service!</p>
            </div>

            <button
              onClick={() => navigate('/')} 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md mb-4 font-medium"
            >
              Go to Dashboard <FaArrowRight className="inline ml-2" />
            </button>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <FaTimesCircle className="text-red-500 text-5xl mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Failed</h1>
            <p className="text-sm text-gray-700">Oops! Something went wrong with your payment. Please try again later or contact support.</p>

            {/* Error details */}
            {paymentDetails.error && (
              <p className="text-sm text-red-600 font-medium">{paymentDetails.error}</p>
            )}

            <button
              onClick={() => navigate('/plans')} // Redirect to retry payment page
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md mb-4 font-medium"
            >
              Retry Payment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;
