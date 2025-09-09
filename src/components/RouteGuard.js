import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RouteGuard = ({ children }) => {
  const [doctorDetails, setDoctorDetails] = useState(null); 
  // const admin = useSelector((state) => state.admin?.admin?.user);
  // const subscription = admin?.subscription;
  const isSubscribed = doctorDetails?.subscription?.isActive;
  // console.log(isSubscribed)
  const role = doctorDetails?.role;

  const location = useLocation();
  const navigate = useNavigate();
  const hasRedirected = useRef(false);

  //APIII
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

  //APIII

  useEffect(() => {
    const isPlanRoute = location.pathname === '/plan_purchase';

    if (
      role === 'doctorAdmin' &&
      isSubscribed === false &&
      !isPlanRoute &&
      !hasRedirected.current
    ) {
      hasRedirected.current = true;
      navigate('/plan_purchase');
    }
  }, [role, isSubscribed, location.pathname, navigate]);

  return children;
};

export default RouteGuard;
