import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const CreateSlot = () => {
  const token = useSelector((state) => state.admin.token);
  const adminId = useSelector((state) => state.admin?.admin?.user?.id);
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  const initialValues = {
    doctorId: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    slotDuration: 30,
    maxBookings: 1,
  };

  const validationSchema = Yup.object({
    doctorId: Yup.string().required('Doctor is required'),
    startDate: Yup.string().required('Start date is required'),
    endDate: Yup.string().required('End date is required'),
    startTime: Yup.string().required('Start time is required'),
    endTime: Yup.string().required('End time is required'),
    slotDuration: Yup.number().min(5).required('Duration is required'),
    maxBookings: Yup.number().min(1).required('Max bookings is required'),
  });

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const res = await axios.get(
          `http://194.238.17.230:8001/api/admin/get_all_doctors?createdBy=${adminId}`,
          { headers }
        );
        setDoctors(res.data.data || []);
      } catch (err) {
        toast.error('Failed to fetch doctors');
        console.error(err);
      }
    };
    fetchDoctors();
  }, [token, adminId]);

  const handleSubmit = async (values, { setSubmitting, resetForm, setStatus }) => {
    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      await axios.post('http://194.238.17.230:8001/api/doctor/create_slots', values, { headers });
      setStatus({ success: 'Slots created successfully!' });
      resetForm();
      toast.success('Slots created successfully!');
      navigate('/slots'); // Redirect to slots page
    } catch (err) {
      setStatus({ error: 'Failed to create slots. Please try again.' });
      toast.error('Slot creation failed');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 bg-[#F7FBFF] min-h-[90vh] rounded-md shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-blue-900 hover:text-blue-700 text-xl"
          aria-label="Go back"
        >
          <FaArrowLeft />
        </button>
        <h2 className="text-2xl font-bold text-blue-900">Create Appointment Slots</h2>
      </div>

      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ isSubmitting, status }) => (
          <Form className="bg-white p-6 rounded-md space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Doctor dropdown */}
              <div>
                <label className="block text-blue-800 font-medium mb-1">Select Doctor</label>
                <Field
                  as="select"
                  name="doctorId"
                  className="w-full border border-blue-300 rounded-md px-4 py-2"
                >
                  <option value="">-- Select Doctor --</option>
                  {doctors.map((doc) => (
                    <option key={doc._id} value={doc._id}>
                      {doc.fullName}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="doctorId" component="div" className="text-red-500 text-sm" />
              </div>

              {/* Other fields */}
              {[
                { name: 'startDate', label: 'Start Date', type: 'date' },
                { name: 'endDate', label: 'End Date', type: 'date' },
                { name: 'startTime', label: 'Start Time', type: 'time' },
                { name: 'endTime', label: 'End Time', type: 'time' },
                { name: 'slotDuration', label: 'Slot Duration (min)', type: 'number' },
                { name: 'maxBookings', label: 'Max Bookings per Slot', type: 'number' },
              ].map((field, idx) => (
                <div key={idx}>
                  <label className="block text-blue-800 font-medium mb-1">{field.label}</label>
                  <Field
                    type={field.type}
                    name={field.name}
                    className="w-full border border-blue-300 rounded-md px-4 py-2"
                  />
                  <ErrorMessage name={field.name} component="div" className="text-red-500 text-sm" />
                </div>
              ))}
            </div>

            {/* Feedback messages */}
            {status?.success && (
              <div className="bg-green-100 text-green-700 px-4 py-2 rounded-md">{status.success}</div>
            )}
            {status?.error && (
              <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md">{status.error}</div>
            )}

            {/* Submit button */}
            <div className="text-right pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-900 text-white px-6 py-2 rounded-md hover:bg-blue-700"
              >
                {isSubmitting ? 'Creating...' : 'Create Slots'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateSlot;
