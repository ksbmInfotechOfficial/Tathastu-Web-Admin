import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const SubscriptionGuard = ({ children }) => {
  const user = useSelector((state) => state.admin?.admin?.user);
  const subscription = user?.subscription;
  const role = user?.role;
  const [doctorDetails, setDoctorDetails] = useState(null); 
  const isSubscribed = doctorDetails?.subscription?.isActive === true;
  console.log(isSubscribed, "dfsakjfdklsajklfjklsajfdkl")

  //start new logic
 const token = useSelector((state) => state.admin?.token); // Token from Redux store

 const doctorId = useSelector((state) => state.admin?.admin?.user?.id); // Get doctorId from Redux store

  // Fetch doctor details on component mount
  useEffect(() => {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const fetchDoctorDetails = async () => {
      try {
        const response = await axios.get(`http://194.238.17.230:8001/api/admin/get_doctor/${doctorId}`, { headers });
        setDoctorDetails(response.data); // Assuming the API returns the doctor's profile details
      } catch (error) {
        console.error("Error fetching doctor's details", error);
      }
    };

    if (doctorId && token) {
      fetchDoctorDetails(); // Fetch doctor details if doctorId and token exist
    }
  }, [doctorId, token]);


  // start new logic

  // Use useRef to prevent multiple toasts from being triggered
  const hasToastBeenShown = useRef(false);

  // useEffect(() => {
  //   if (role === 'doctorAdmin' && !isSubscribed && !hasToastBeenShown.current) {
  //     // Trigger toast only if it hasn't been shown already
  //     toast.info('Please subscribe to a plan to access this section.', {
  //       position: 'top-right',
  //       autoClose: 3000,
  //       hideProgressBar: true,
  //       pauseOnHover: false,
  //       draggable: false,
  //     });
      
  //     // Set the flag to true to ensure toast is not shown again
  //     hasToastBeenShown.current = true;
  //   }
  // }, [role, isSubscribed]); // Run only when role or subscription state changes

  if (role === 'doctorAdmin' && !isSubscribed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] bg-yellow-50 text-yellow-800 border border-yellow-200 rounded-md p-6 text-center">
        <h2 className="text-2xl font-semibold mb-2">Subscription Required</h2>
        <p className="mb-4 text-md max-w-md">
          This feature is locked. Please purchase a subscription plan to access it.
        </p>
        <Link
          to="/plan_purchase"
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded transition"
        >
          Go to Plans
        </Link>
      </div>
    );
  }

  return <>{children}</>;
};

export default SubscriptionGuard;
