import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import { addDoctor } from '../../redux/actions/adminActions';
import { resetDoctorAdded } from '../../redux/slices/adminSlice';

const AddDoctor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.admin.token);
  const doctorAdded = useSelector((state) => state.admin.doctorAdded);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (doctorAdded) {
      setTimeout(() => {
        dispatch(resetDoctorAdded());
        navigate('/doctors');
      }, 1500);
    }
  }, [doctorAdded, dispatch, navigate]);

  const initialValues = {
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    gender: 'Male',
    specialization: '',
    qualification: '',
    experience: '',
    registrationNumber: '',
    consultationFee: '',
    clinicAddress: '',
    username: '',
    password: '',
    role: 'doctor',
    createdBy:'',
    availability: [
      { day: '', startTime: '', endTime: '' }
    ],
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required('Full name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().required('Phone is required'),
    dob: Yup.date().required('Date of birth is required'),
    specialization: Yup.string().required('Specialization is required'),
    qualification: Yup.string().required('Qualification is required'),
    experience: Yup.number().required('Experience is required'),
    registrationNumber: Yup.string().required('Registration Number is required'),
    consultationFee: Yup.number().required('Fee is required'),
    clinicAddress: Yup.string().required('Address is required'),
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
    role: Yup.string().oneOf(['admin', 'doctor']).required('Role is required'),
  });

  const admin = useSelector((state) => state.admin.admin?.user);
  console.log(admin.id, "QJKLJKLJKL")

  const handleSubmit = (values) => {
    const formData = new FormData();
  
    // Determine createdBy
    const createdByValue = admin?.role === 'superadmin' ? 'superadmin' : admin?.id;
    values.createdBy = createdByValue;
  
    // Append fields to FormData
    Object.keys(values).forEach((key) => {
      if (key === 'availability') {
        formData.append(key, JSON.stringify(values[key]));
      } else {
        formData.append(key, values[key]);
      }
    });
  
    if (imageFile) {
      formData.append('image', imageFile);
    }
  
    dispatch(addDoctor(formData, token));
  };
  
  
  return (
    <div className="max-w-6xl mx-auto px-6 py-6 bg-[#F7FBFF] min-h-[90vh] rounded-md shadow-lg">
      {doctorAdded && (
        <div className="bg-green-100 text-green-800 px-4 py-2 rounded mb-4">
          Doctor added successfully! Redirecting...
        </div>
      )}

      <div className="flex justify-end mb-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
        >
          Go Back
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-4 text-blue-900">Add New Doctor</h2>

      <div className="max-h-[75vh] overflow-y-auto pr-2">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form className="bg-white p-6 rounded-md space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Common Fields */}
                {[ 
                  { name: 'fullName', label: 'Full Name' },
                  { name: 'email', label: 'Email', type: 'email' },
                  { name: 'phone', label: 'Phone' },
                  { name: 'dob', label: 'Date of Birth', type: 'date' },
                  { name: 'specialization', label: 'Specialization' },
                  { name: 'qualification', label: 'Qualification' },
                  { name: 'experience', label: 'Experience (years)', type: 'number' },
                  { name: 'registrationNumber', label: 'Registration Number' },
                  { name: 'consultationFee', label: 'Consultation Fee', type: 'number' },
                  { name: 'clinicAddress', label: 'Clinic Address' },
                  { name: 'username', label: 'Username' },
                  { name: 'password', label: 'Password', type: 'password' }
                ].map((field, index) => (
                  <div key={index}>
                    <label className="block text-blue-800 font-medium mb-1">{field.label}</label>
                    <Field
                      type={field.type || 'text'}
                      name={field.name}
                      className="w-full border border-blue-300 rounded-md px-4 py-2"
                    />
                    <ErrorMessage name={field.name} component="div" className="text-red-500 text-sm" />
                  </div>
                ))}

                {/* Gender Select */}
                <div>
                  <label className="block text-blue-800 font-medium mb-1">Gender</label>
                  <Field as="select" name="gender" className="w-full border border-blue-300 rounded-md px-4 py-2">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </Field>
                </div>

                {/* Role Select */}
                <div>
                  <label className="block text-blue-800 font-medium mb-1">Role</label>
                  <Field as="select" name="role" className="w-full border border-blue-300 rounded-md px-4 py-2">
                    <option value="doctor">Doctor</option>
                    <option value="admin">Admin</option>
                  </Field>
                </div>

                {/* Profile Picture */}
                <div className="md:col-span-2">
                  <label className="block text-blue-800 font-medium mb-1">Profile Picture</label>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={(event) => setImageFile(event.currentTarget.files[0])}
                    className="w-full border border-blue-300 rounded-md px-4 py-2"
                  />
                </div>
              </div>

              {/* Availability Section */}
              <div className="mt-6">
                <label className="block text-blue-800 font-medium mb-2">Availability</label>
                <FieldArray name="availability">
                  {({ remove, push }) => (
                    <div className="space-y-4">
                      {values.availability.map((slot, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                          <Field name={`availability[${index}].day`} placeholder="Day (e.g. Monday)" className="border px-3 py-2 rounded-md" />
                          <Field name={`availability[${index}].startTime`} type="time" className="border px-3 py-2 rounded-md" />
                          <Field name={`availability[${index}].endTime`} type="time" className="border px-3 py-2 rounded-md" />
                          <button type="button" onClick={() => remove(index)} className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600">
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => push({ day: '', startTime: '', endTime: '' })}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                      >
                        + Add Slot
                      </button>
                    </div>
                  )}
                </FieldArray>
              </div>

              {/* Submit */}
              <div className="text-right pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-900 text-white px-6 py-2 rounded-md hover:bg-blue-700"
                >
                  {isSubmitting ? 'Adding...' : 'Add Doctor'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddDoctor;
