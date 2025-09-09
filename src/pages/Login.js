// // src/pages/Login.js
// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { loginUser } from '../redux/slices/userSlice';
// import { useNavigate } from 'react-router-dom';
// import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'; // Import icons

// const Login = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

//   const handleLogin = () => {
//     if (!email || !password) {
//       setError('Please enter both email and password');
//       return;
//     }

//     // Simulate successful login
//     const user = { email }; // Mock user object
//     dispatch(loginUser(user));
//     navigate('/');
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-800 to-gray-900">
//       <div className="bg-white p-8 rounded-lg shadow-xl w-96 max-w-sm">
//         <h2 className="text-3xl font-semibold text-center mb-6 text-gray-900">Admin Panel Login</h2>
        
//         {/* Error message */}
//         {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

//         <div className="mb-6">
//           <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
//           <div className="relative mt-1">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <FaEnvelope className="text-gray-400" />
//             </div>
//             <input
//               type="email"
//               id="email"
//               className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//         </div>

//         <div className="mb-6">
//           <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
//           <div className="relative mt-1">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <FaLock className="text-gray-400" />
//             </div>
//             <input
//               type={showPassword ? 'text' : 'password'}
//               id="password"
//               className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
//             >
//               {showPassword ? <FaEyeSlash /> : <FaEye />}
//             </button>
//           </div>
//         </div>

//         <button
//           onClick={handleLogin}
//           className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition-all duration-300"
//         >
//           Login
//         </button>

//         <div className="mt-4 text-center">
//           <span className="text-sm text-gray-600">
//             <button
//               onClick={() => alert('Forgot password functionality coming soon!')}
//               className="text-blue-500 hover:underline focus:outline-none"
//             >
//               Forgot Password?
//             </button>
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;



import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { loginAdmin } from '../redux/actions/adminActions';
import { toast } from 'react-toastify';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const token = useSelector((state) => state.admin.token);
  const loginError = useSelector((state) => state.admin.error);
  const subscription = useSelector((state) => state.admin?.admin?.user?.subscription);
  const role = useSelector((state) => state.admin?.admin);
  console.log(role, "ROLEEEEEEEEEEE")
  const isSubscribed = subscription?.isSubscribed === true;

  const handleLogin = () => {
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    toast.info('Logging in...', { autoClose: 1000 });
    dispatch(loginAdmin({ email, password }));
  };

  useEffect(() => {
    if (token) {
      toast.success('Login successful!', { autoClose: 1500 });
      navigate('/');
    }
  }, [token, navigate]);

  useEffect(() => {
    if (loginError) {
      toast.error(loginError || 'Login failed. Please try again.', { autoClose: 2000 });
    }
  }, [loginError]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 relative overflow-hidden">

      {/* Centered Background Image */}
      <img
        src="/images/logo.png"
        alt="Tathastu Background"
        className="absolute top-1/2 left-1/2 w-96 opacity-0.1 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-1"
      />

      {/* Login Card */}
      <div className="relative z-10 bg-white bg-opacity-90 backdrop-blur-md p-10 rounded-xl shadow-2xl w-full max-w-md text-center">

        {/* Logo */}
        <div className="flex justify-center mb-2">
          <img
            src="/images/logo.png"
            alt="Tathastu Logo"
            className="h-20 w-auto"
          />
        </div>

        <h2 className="text-2xl font-bold text-[#EA580C] mb-4">Admin Login</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Email Field */}
        <div className="mb-5 text-left">
          <label htmlFor="email" className="block text-sm font-medium text-[#EA580C] mb-1">Email Address</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-orange-400">
              <FaEnvelope />
            </span>
            <input
              type="email"
              id="email"
              className="w-full pl-10 pr-3 py-2 border border-orange-300 rounded-md focus:ring-2 focus:ring-[#EA580C] focus:outline-none"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="mb-6 text-left">
          <label htmlFor="password" className="block text-sm font-medium text-[#EA580C] mb-1">Password</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-orange-400">
              <FaLock />
            </span>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              className="w-full pl-10 pr-10 py-2 border border-orange-300 rounded-md focus:ring-2 focus:ring-[#EA580C] focus:outline-none"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-orange-400"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-[#EA580C] text-white py-2 rounded-md hover:bg-orange-600 transition-all duration-300"
        >
          Login
        </button>

        {/* Forgot Password */}
        {/* <div className="text-center mt-4">
          <button
            onClick={() => alert('Forgot password functionality coming soon!')}
            className="text-sm text-[#EA580C] hover:underline"
          >
            Forgot Password?
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Login;

