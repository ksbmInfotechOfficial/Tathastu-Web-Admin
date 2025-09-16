import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MasterOtpPage = () => {
  const [masterOtp, setMasterOtp] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const API_BASE_URL = 'https://apitathastu.astroone.in/api/admin';

  useEffect(() => {
    const fetchOtp = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_BASE_URL}/get_master_otp`);
        const otp = res.data.data.masterOtp || res.data.data || '';
        setMasterOtp(otp);
      } catch {
        setError('Failed to fetch OTP');
      } finally {
        setLoading(false);
      }
    };
    fetchOtp();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setSubmitting(true);

    try {
      await axios.post(`${API_BASE_URL}/create_master_otp`, { masterOtp });
      setMessage('Master OTP created or updated successfully.');
    } catch {
      setError('Failed to create/update OTP');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FEE2E2] to-[#F3F4F6] flex items-center justify-center p-6">
      <div className="bg-white/60 backdrop-blur-md shadow-2xl rounded-3xl w-full max-w-xl p-10 sm:p-12">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-[#9A3412] tracking-tight drop-shadow-sm">
          🔐 Manage Master OTP
        </h1>

        {message && (
          <div className="flex items-center mb-6 rounded-lg bg-green-100 text-green-800 px-4 py-3 shadow-md">
            ✅ <span className="ml-2">{message}</span>
          </div>
        )}

        {error && (
          <div className="flex items-center mb-6 rounded-lg bg-red-100 text-red-700 px-4 py-3 shadow-md">
            ❌ <span className="ml-2">{error}</span>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-16">
            <svg
              className="animate-spin h-10 w-10 text-[#9A3412]"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8 relative">
            <div className="relative z-0">
              <input
                type="text"
                id="masterOtp"
                name="masterOtp"
                value={masterOtp}
                onChange={(e) => setMasterOtp(e.target.value)}
                placeholder=" "
                required
                className="peer block w-full appearance-none border-2 border-gray-300 rounded-xl bg-transparent px-4 pt-4 pb-2 text-lg text-[#9A3412] focus:border-[#9A3412] focus:outline-none focus:ring-0"
              />
              {/* <label
                htmlFor="masterOtp"
                className="absolute left-4 top-3 text-gray-500 text-lg transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-3 peer-focus:text-[#9A3412] peer-focus:text-lg"
              >
                Enter Master OTP
              </label> */}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className={`w-full py-3 rounded-xl text-white text-xl font-semibold shadow-lg transition 
                ${
                  submitting
                    ? 'bg-[#9A3412]/50 cursor-not-allowed'
                    : 'bg-[#9A3412] hover:bg-[#7C2D12] active:scale-95'
                }`}
            >
              {submitting ? 'Saving...' : 'Save OTP'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default MasterOtpPage;
