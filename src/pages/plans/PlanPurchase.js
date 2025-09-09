// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaCheckCircle } from 'react-icons/fa';

// const PlanPurchase = () => {
//   const navigate = useNavigate();

//   const plans = [
//     {
//       id: 'starter',
//       name: 'Starter Plan',
//       price: 999,
//       badge: 'Basic',
//       highlight: false,
//       features: [
//         '1 Doctor Profile',
//         'Basic Calendar & Slot Booking',
//         'Chatbot Integration',
//         'Patient Details Management',
//       ],
//     },
//     {
//       id: 'clinic',
//       name: 'Clinic Plan',
//       price: 2999,
//       badge: 'Most Popular',
//       highlight: true,
//       features: [
//         'Multiple Doctor Profiles',
//         'Team Management',
//         'Advanced Slot Controls',
//         'Priority Support',
//       ],
//     },
//   ];

//   const handlePayment = (planId, price, duration) => {
//     console.log(`Paying ₹${price} for ${planId} (${duration})`);
//     // navigate(`/payment?plan=${planId}&price=${price}&duration=${duration}`);
//   };

//   return (
//     <div className="p-6 bg-[#F7FBFF] min-h-screen">
//       <h2 className="text-3xl font-bold text-blue-900 text-center mb-10">Select Your Subscription</h2>

//       <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
//         {plans.map((plan) => (
//           <div
//             key={plan.id}
//             className={`bg-white rounded-xl shadow-lg border-2 ${
//               plan.highlight ? 'border-blue-800' : 'border-blue-100'
//             } p-6 relative transition-transform hover:-translate-y-1`}
//           >
//             {/* Badge */}
//             <span className={`absolute top-4 right-4 px-3 py-1 text-sm rounded-full font-semibold ${
//               plan.highlight ? 'bg-blue-800 text-white' : 'bg-blue-100 text-blue-800'
//             }`}>
//               {plan.badge}
//             </span>

//             <h3 className="text-2xl font-bold text-blue-900 mb-2">{plan.name}</h3>
//             <p className="text-3xl text-blue-800 font-bold mb-4">₹{plan.price} <span className="text-sm text-gray-600">/month</span></p>

//             {/* Features */}
//             <ul className="mb-6 space-y-2 text-gray-700">
//               {plan.features.map((feature, i) => (
//                 <li key={i} className="flex items-center">
//                   <FaCheckCircle className="text-green-600 mr-2" /> {feature}
//                 </li>
//               ))}
//             </ul>

//             {/* Plan Options */}
//             <div className="space-y-2">
//               <button
//                 onClick={() => handlePayment(plan.id, Math.round(plan.price * 0.65), 'yearly')}
//                 className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 font-medium"
//               >
//                 Yearly – ₹{Math.round(plan.price * 0.65)} <span className="text-sm">(35% OFF)</span>
//               </button>
//               <button
//                 onClick={() => handlePayment(plan.id, Math.round(plan.price * 0.85), 'half-yearly')}
//                 className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 font-medium"
//               >
//                 Half-Yearly – ₹{Math.round(plan.price * 0.85)} <span className="text-sm">(15% OFF)</span>
//               </button>
//               <button
//                 onClick={() => handlePayment(plan.id, plan.price, 'monthly')}
//                 className="w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-800 font-semibold"
//               >
//                 Monthly – ₹{plan.price}
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PlanPurchase;





// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FaCheckCircle } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';

// const PlanPurchase = () => {
//   const navigate = useNavigate();
//   const [plans, setPlans] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch plans from the API
//   const fetchPlans = async () => {
//     try {
//       const res = await axios.get('http://194.238.17.230:8001/api/admin/get_plans');
//       setPlans(res.data.plans);
//       setLoading(false);
//     } catch (err) {
//       setError('Error fetching plans. Please try again later.');
//       setLoading(false);
//       console.error('Error fetching plans:', err.message);
//     }
//   };

//   // Fetch plans on component mount
//   useEffect(() => {
//     fetchPlans();
//   }, []);

//   const handlePayment = (planId, price, duration) => {
//     console.log(`Paying ₹${price} for ${planId} (${duration})`);
//     navigate(`/payment?plan=${planId}&price=${price}&duration=${duration}`);
//   };

//   return (
//     <div className="p-6 bg-[#F7FBFF] min-h-screen">
//       <h2 className="text-3xl font-bold text-blue-900 text-center mb-10">Select Your Subscription</h2>

//       {/* Error message */}
//       {error && <div className="text-center text-red-600 mb-6">{error}</div>}

//       <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
//         {loading ? (
//           <div className="text-center text-lg text-blue-800">Loading plans...</div>
//         ) : (
//           plans.map((plan) => (
//             <div
//               key={plan.id}
//               className={`bg-white rounded-xl shadow-lg border-2 ${
//                 plan.highlight ? 'border-blue-800' : 'border-blue-100'
//               } p-6 relative transition-transform hover:-translate-y-1`}
//             >
//               {/* Badge */}
//               <span
//                 className={`absolute top-4 right-4 px-3 py-1 text-sm rounded-full font-semibold ${
//                 plan.name === 'Clinic Plan'? 'bg-blue-800 text-white' : 'bg-blue-100 text-blue-800'
//                 }`}
//               >
//                 {plan.name == 'Clinic Plan' ? 'Popoular' : 'Basic'}
//               </span>

//               <h3 className="text-2xl font-bold text-blue-900 mb-2">{plan.name}</h3>
//               <p className="text-3xl text-blue-800 font-bold mb-4">
//                 ₹{plan.price} <span className="text-sm text-gray-600">/month</span>
//               </p>

//               {/* Features */}
//               <ul className="mb-6 space-y-2 text-gray-700">
//                 {plan.features.map((feature, i) => (
//                   <li key={i} className="flex items-center">
//                     <FaCheckCircle className="text-green-600 mr-2" /> {feature}
//                   </li>
//                 ))}
//               </ul>

//               {/* Plan Options */}
//               <div className="space-y-2">
//                 <button
//                   onClick={() => handlePayment(plan.id, Math.round(plan.price * 0.65), 'yearly')}
//                   className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 font-medium"
//                 >
//                   Yearly – ₹{Math.round(plan.price * 0.65)} <span className="text-sm">(35% OFF)</span>
//                 </button>
//                 <button
//                   onClick={() => handlePayment(plan.id, Math.round(plan.price * 0.85), 'half-yearly')}
//                   className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 font-medium"
//                 >
//                   Half-Yearly – ₹{Math.round(plan.price * 0.85)} <span className="text-sm">(15% OFF)</span>
//                 </button>
//                 <button
//                   onClick={() => handlePayment(plan.id, plan.price, 'monthly')}
//                   className="w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-800 font-semibold"
//                 >
//                   Monthly – ₹{plan.price}
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default PlanPurchase;





// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FaCheckCircle } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';

// const PlanPurchase = () => {
//   const navigate = useNavigate();
//   const [plans, setPlans] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch plans from the API
//   const fetchPlans = async () => {
//     try {
//       const res = await axios.get('http://194.238.17.230:8001/api/admin/get_plans');
//       setPlans(res.data.plans);
//       setLoading(false);
//     } catch (err) {
//       setError('Error fetching plans. Please try again later.');
//       setLoading(false);
//       console.error('Error fetching plans:', err.message);
//     }
//   };

//   // Fetch plans on component mount
//   useEffect(() => {
//     fetchPlans();
//   }, []);

//   const handlePayment = async (planId, price, duration) => {
//     console.log(`Paying ₹${price} for ${planId} (${duration})`);

//     try {
//       // Create Razorpay Order
//       const res = await axios.post('http://194.238.17.230:8001/api/doctor/create_razorpay_order', {
//         amount: price, // Pass the amount here (in INR)
//       });

//       if (res.data.success) {
//         const { orderId, currency } = res.data.data;

//         // Razorpay options to initiate the payment
//         const options = {
//           key: 'rzp_test_7FcETDDAqUcnFu', // Razorpay Key ID
//           amount: price * 100, // Amount in paise
//           currency: currency,
//           order_id: orderId, // Order ID from the backend
//           name: 'Subscription Payment',
//           description: `Payment for plan: ${planId}`,
//           handler: function (response) {
//             console.log('Payment successful:', response);
//             // alert('Payment successful!');
//             // You can redirect to a success page here
//            navigate('/payment-success', {
//             state: {
//               status: 'success',
//               orderId: response.razorpay_order_id,
//               paymentId: response.razorpay_payment_id,
//             },
//           });
//           },
//           prefill: {
//             name: 'John Doe', // You can fetch user details here
//             email: 'johndoe@example.com',
//             contact: '9876543210',
//           },
//           theme: {
//             color: '#F37254',
//           },
//         };

//         // Open Razorpay Payment Gateway
//         const rzp1 = new window.Razorpay(options);
//         rzp1.open();
//       }
//     } catch (error) {
//       console.error('Error initiating payment:', error);
//       alert('Error initiating payment');
//     }
//   };

//   return (
//     <div className="p-6 bg-[#F7FBFF] min-h-screen">
//       <h2 className="text-3xl font-bold text-blue-900 text-center mb-10">Select Your Subscription</h2>

//       {/* Error message */}
//       {error && <div className="text-center text-red-600 mb-6">{error}</div>}

//       <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
//         {loading ? (
//           <div className="text-center text-lg text-blue-800">Loading plans...</div>
//         ) : (
//           plans.map((plan) => (
//             <div
//               key={plan.id}
//               className={`bg-white rounded-xl shadow-lg border-2 ${
//                 plan.highlight ? 'border-blue-800' : 'border-blue-100'
//               } p-6 relative transition-transform hover:-translate-y-1`}
//             >
//               {/* Badge */}
//               <span
//                 className={`absolute top-4 right-4 px-3 py-1 text-sm rounded-full font-semibold ${
//                   plan.name === 'Clinic Plan'
//                     ? 'bg-blue-800 text-white'
//                     : 'bg-blue-100 text-blue-800'
//                 }`}
//               >
//                 {plan.name === 'Clinic Plan' ? 'Popular' : 'Basic'}
//               </span>

//               <h3 className="text-2xl font-bold text-blue-900 mb-2">{plan.name}</h3>
//               <p className="text-3xl text-blue-800 font-bold mb-4">
//                 ₹{plan.price} <span className="text-sm text-gray-600">/month</span>
//               </p>

//               {/* Features */}
//               <ul className="mb-6 space-y-2 text-gray-700">
//                 {plan.features.map((feature, i) => (
//                   <li key={i} className="flex items-center">
//                     <FaCheckCircle className="text-green-600 mr-2" /> {feature}
//                   </li>
//                 ))}
//               </ul>

//               {/* Plan Options */}
//               <div className="space-y-2">
//                 <button
//                   onClick={() => handlePayment(plan.id, Math.round(plan.price * 0.65), 'yearly')}
//                   className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 font-medium"
//                 >
//                   Yearly – ₹{Math.round(plan.price * 0.65)} <span className="text-sm">(35% OFF)</span>
//                 </button>
//                 <button
//                   onClick={() => handlePayment(plan.id, Math.round(plan.price * 0.85), 'half-yearly')}
//                   className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 font-medium"
//                 >
//                   Half-Yearly – ₹{Math.round(plan.price * 0.85)} <span className="text-sm">(15% OFF)</span>
//                 </button>
//                 <button
//                   onClick={() => handlePayment(plan.id, plan.price, 'monthly')}
//                   className="w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-800 font-semibold"
//                 >
//                   Monthly – ₹{plan.price}
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default PlanPurchase;






import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PlanPurchase = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const adminData = useSelector((state) => state.admin.admin);
  const [selectedPlan, setSelectedPlan] = useState("")
  // Fetch plans from the API
  const fetchPlans = async () => {
    try {
      const res = await axios.get('http://194.238.17.230:8001/api/admin/get_plans');
      setPlans(res.data.plans);
      setLoading(false);
    } catch (err) {
      setError('Error fetching plans. Please try again later.');
      setLoading(false);
      console.error('Error fetching plans:', err.message);
    }
  };

  // Fetch plans on component mount
  useEffect(() => {
    fetchPlans();
  }, []);

  console.log("selected plan", selectedPlan)


  const checkPaymentStatus = async (paymentId, orderId, planType, duration, planId) => {
    console.log("boddy", paymentId, orderId, planType, planId)
    const res = await axios.get(`http://194.238.17.230:8001/api/admin/get_plan/${planId}`);
    console.log("RESSSSSSS", res)
    setSelectedPlan(res.data.plan);

    try {
      // Assuming 'doctorId' is available in your current context
      const doctorId = adminData?._id || adminData.user?.id;


      // Send the data to the backend to check the payment status
      const response = await axios.post('http://194.238.17.230:8001/api/doctor/check_subscription_payment_status', {
        paymentId,
        doctorId,
        amount: selectedPlan.price,
        planName: selectedPlan.name,
        planType: planType, // Pass the plan type (e.g., 'monthly', 'yearly', etc.)
        duration, // Plan duration
        gst: 18, // GST amount
        planId,
      });

      if (response.data.status) {
        // Handle success response
        console.log("Payment Status:", response.data.message);
        navigate('/payment-success', {
          state: {
            status: 'success',
            paymentId,
            orderId,
          },
        });
      } else {
        // Handle failure response
        console.log("Payment Status:", response.data.message);
        navigate('/payment-failure', {
          state: {
            status: 'failed',
            paymentId,
            orderId,
          },
        });
      }
    } catch (error) {
      console.error('Error checking payment status:', error);
      alert('Error checking payment status');
    }
  };

  // Handle the payment process
  const handlePayment = async (planId, basePrice, duration, planType) => {
  let finalPrice = basePrice;

  if (duration === 'yearly') {
    finalPrice = Math.round(basePrice * 12); // 35% OFF on yearly
  } else if (duration === 'half-yearly') {
    finalPrice = Math.round(basePrice * 6); // 15% OFF on half-yearly
  } else if (duration === 'monthly') {
    finalPrice = basePrice;
  }

  try {
    const res = await axios.post('http://194.238.17.230:8001/api/doctor/create_razorpay_order', {
      amount: finalPrice,
    });

    if (res.data.success) {
      const { id: orderId, currency } = res.data.data;

      const options = {
        key: 'rzp_test_7FcETDDAqUcnFu',
        amount: finalPrice * 100,
        currency,
        order_id: orderId,
        name: 'Subscription Payment',
        description: `Payment for plan: ${planId}`,
        handler: async function (response) {
          try {
            const planRes = await axios.get(`http://194.238.17.230:8001/api/admin/get_plan/${planId}`);
            const fullPlan = planRes.data.plan;
            const doctorId = adminData?._id || adminData.user?.id;

            const paymentStatusRes = await axios.post('http://194.238.17.230:8001/api/doctor/check_subscription_payment_status', {
              paymentId: response.razorpay_payment_id,
              doctorId,
              amount: finalPrice,
              planName: fullPlan.name,
              planType,
              duration,
              gst: 18,
              planId,
            });

            if (paymentStatusRes.data.status) {
              navigate('/payment-success', {
                state: {
                  status: 'success',
                  paymentId: response.razorpay_payment_id,
                  orderId,
                  amount: finalPrice,
                  planId: fullPlan.name,
                  duration,
                },
              });
            } else {
              navigate('/payment-failure', {
                state: {
                  status: 'failed',
                  paymentId: response.razorpay_payment_id,
                  orderId,
                  amount: finalPrice,
                  planId: fullPlan.name,
                  duration,
                },
              });
            }
          } catch (error) {
            console.error('Error during payment verification:', error);
            alert('Error verifying payment.');
          }
        },
        prefill: {
          name: 'John Doe',
          email: 'johndoe@example.com',
          contact: '9876543210',
        },
        theme: {
          color: '#F37254',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    }
  } catch (error) {
    console.error('Error initiating payment:', error);
    alert('Error initiating payment');
  }
};



  return (
    <div className="p-6 bg-[#F7FBFF] min-h-screen">
      <h2 className="text-3xl font-bold text-blue-900 text-center mb-10">Select Your Subscription</h2>

      {/* Error message */}
      {error && <div className="text-center text-red-600 mb-6">{error}</div>}

      <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
        {loading ? (
          <div className="text-center text-lg text-blue-800">Loading plans...</div>
        ) : (
          plans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-xl shadow-lg border-2 ${plan.highlight ? 'border-blue-800' : 'border-blue-100'
                } p-6 relative transition-transform hover:-translate-y-1`}
            >
              {/* Badge */}
              <span
                className={`absolute top-4 right-4 px-3 py-1 text-sm rounded-full font-semibold ${plan.name === 'Clinic Plan' ? 'bg-blue-800 text-white' : 'bg-blue-100 text-blue-800'
                  }`}
              >
                {plan.name === 'Clinic Plan' ? 'Popular' : 'Basic'}
              </span>

              <h3 className="text-2xl font-bold text-blue-900 mb-2">{plan.name}</h3>
              <p className="text-3xl text-blue-800 font-bold mb-4">
                ₹{plan.price} <span className="text-sm text-gray-600">/month</span>
              </p>

              {/* Features */}
              <ul className="mb-6 space-y-2 text-gray-700">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <FaCheckCircle className="text-green-600 mr-2" /> {feature}
                  </li>
                ))}
              </ul>

              {/* Plan Options */}
              <div className="space-y-2">
                <button
                  onClick={() => handlePayment(plan._id, Math.round(plan.price * 0.65), 'yearly')}
                  className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 font-medium"
                >
                  Yearly – ₹{Math.round(plan.price * 0.65)} <span className="text-sm">(35% OFF)</span>
                </button>
                <button
                  onClick={() => handlePayment(plan._id, Math.round(plan.price * 0.85), 'half-yearly')}
                  className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 font-medium"
                >
                  Half-Yearly – ₹{Math.round(plan.price * 0.85)} <span className="text-sm">(15% OFF)</span>
                </button>
                <button
                  onClick={() => handlePayment(plan._id, plan.price, 'monthly')}
                  className="w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-800 font-semibold"
                >
                  Monthly – ₹{plan.price}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PlanPurchase;
