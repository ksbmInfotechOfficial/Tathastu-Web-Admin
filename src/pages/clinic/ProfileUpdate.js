// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { Formik, Field, Form, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { updateDoctorProfile } from '../../redux/actions/adminActions';
// import { resetDoctorUpdated } from '../../redux/slices/adminSlice';

// const UpdateProfile = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const doctorDetails = useSelector((state) => state.admin.doctorDetails);
//   const doctorUpdated = useSelector((state) => state.admin.doctorUpdated);
//   const [imageFile, setImageFile] = useState(null);
//   const [logoFile, setLogoFile] = useState(null);

//   // Set initial form values to doctor details
//   const initialValues = {
//     fullName: doctorDetails?.fullName || '',
//     email: doctorDetails?.email || '',
//     phone: doctorDetails?.phone || '',
//     dob: doctorDetails?.dob || '',
//     gender: doctorDetails?.gender || 'Male',
//     specialization: doctorDetails?.specialization || '',
//     qualification: doctorDetails?.qualification || '',
//     experience: doctorDetails?.experience || '',
//     registrationNumber: doctorDetails?.registrationNumber || '',
//     consultationFee: doctorDetails?.consultationFee || '',
//     clinicName: doctorDetails?.clinicName || '',
//     clinicAddress: doctorDetails?.clinicAddress || '',
//     clinicEmail: doctorDetails?.clinicEmail || '',
//     clinicContact: doctorDetails?.clinicContact || '',
//     clinicAbout: doctorDetails?.clinicAbout || '',
//     profilePicture: doctorDetails?.profilePicture || '',
//     logo: doctorDetails?.logo || '',
//     username: doctorDetails?.username || '',
//     password: '',
//   };

//   useEffect(() => {
//     if (doctorUpdated) {
//       setTimeout(() => {
//         dispatch(resetDoctorUpdated());
//         navigate('/profile'); // Redirect to profile page or doctors list after update
//       }, 1500);
//     }
//   }, [doctorUpdated, dispatch, navigate]);

//   const validationSchema = Yup.object({
//     fullName: Yup.string().required('Full name is required'),
//     email: Yup.string().email('Invalid email format').required('Email is required'),
//     phone: Yup.string().required('Phone number is required'),
//     dob: Yup.date().required('Date of birth is required'),
//     specialization: Yup.string().required('Specialization is required'),
//     qualification: Yup.string().required('Qualification is required'),
//     experience: Yup.number().required('Experience is required'),
//     registrationNumber: Yup.string().required('Registration number is required'),
//     consultationFee: Yup.number().required('Consultation fee is required'),
//     clinicName: Yup.string().required('Clinic name is required'),
//     clinicAddress: Yup.string().required('Clinic address is required'),
//     clinicEmail: Yup.string().email('Invalid email').required('Clinic email is required'),
//     clinicContact: Yup.string().required('Clinic contact number is required'),
//     clinicAbout: Yup.string().required('Clinic about information is required'),
//     username: Yup.string().required('Username is required'),
//     password: Yup.string().min(6, 'Password should be at least 6 characters long'),
//   });

//   const handleSubmit = (values) => {
//     const formData = new FormData();
    
//     Object.keys(values).forEach((key) => {
//       if (key === 'profilePicture' || key === 'logo') {
//         if (key === 'profilePicture' && imageFile) {
//           formData.append('profilePicture', imageFile);
//         }
//         if (key === 'logo' && logoFile) {
//           formData.append('logo', logoFile);
//         }
//       } else {
//         formData.append(key, values[key]);
//       }
//     });

//     dispatch(updateDoctorProfile(formData)); // Update profile action
//   };

//   return (
//     <div className="max-w-6xl mx-auto px-6 py-6 bg-[#F7FBFF] min-h-[90vh] rounded-md shadow-lg">
//       {doctorUpdated && (
//         <div className="bg-green-100 text-green-800 px-4 py-2 rounded mb-4">
//           Profile updated successfully! Redirecting...
//         </div>
//       )}

//       <div className="flex justify-end mb-4">
//         <button
//           onClick={() => navigate(-1)}
//           className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
//         >
//           Go Back
//         </button>
//       </div>

//       <h2 className="text-2xl font-bold mb-4 text-blue-900">Update Profile</h2>

//       <div className="max-h-[75vh] overflow-y-auto pr-2">
//         <Formik
//           initialValues={initialValues}
//           validationSchema={validationSchema}
//           onSubmit={handleSubmit}
//         >
//           {({ isSubmitting, setFieldValue, values }) => (
//             <Form className="bg-white p-6 rounded-md space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Common Fields */}
//                 {[
//                   { name: 'fullName', label: 'Full Name' },
//                   { name: 'email', label: 'Email', type: 'email' },
//                   { name: 'phone', label: 'Phone' },
//                   { name: 'dob', label: 'Date of Birth', type: 'date' },
//                   { name: 'specialization', label: 'Specialization' },
//                   { name: 'qualification', label: 'Qualification' },
//                   { name: 'experience', label: 'Experience (years)', type: 'number' },
//                   { name: 'registrationNumber', label: 'Registration Number' },
//                   { name: 'consultationFee', label: 'Consultation Fee', type: 'number' },
//                   { name: 'clinicName', label: 'Clinic Name' },
//                   { name: 'clinicAddress', label: 'Clinic Address' },
//                   { name: 'clinicEmail', label: 'Clinic Email', type: 'email' },
//                   { name: 'clinicContact', label: 'Clinic Contact' },
//                   { name: 'clinicAbout', label: 'Clinic About' },
//                   { name: 'username', label: 'Username' },
//                 ].map((field, index) => (
//                   <div key={index}>
//                     <label className="block text-blue-800 font-medium mb-1">{field.label}</label>
//                     <Field
//                       type={field.type || 'text'}
//                       name={field.name}
//                       className="w-full border border-blue-300 rounded-md px-4 py-2"
//                     />
//                     <ErrorMessage name={field.name} component="div" className="text-red-500 text-sm" />
//                   </div>
//                 ))}

//                 {/* Gender Select */}
//                 <div>
//                   <label className="block text-blue-800 font-medium mb-1">Gender</label>
//                   <Field as="select" name="gender" className="w-full border border-blue-300 rounded-md px-4 py-2">
//                     <option value="Male">Male</option>
//                     <option value="Female">Female</option>
//                     <option value="Other">Other</option>
//                   </Field>
//                 </div>

//                 {/* Password */}
//                 <div>
//                   <label className="block text-blue-800 font-medium mb-1">Password</label>
//                   <Field
//                     type="password"
//                     name="password"
//                     className="w-full border border-blue-300 rounded-md px-4 py-2"
//                   />
//                   <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
//                 </div>

//                 {/* Profile Picture */}
//                 <div className="md:col-span-2">
//                   <label className="block text-blue-800 font-medium mb-1">Profile Picture</label>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) => setImageFile(e.currentTarget.files[0])}
//                     className="w-full border border-blue-300 rounded-md px-4 py-2"
//                   />
//                 </div>

//                 {/* Logo */}
//                 <div className="md:col-span-2">
//                   <label className="block text-blue-800 font-medium mb-1">Logo</label>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) => setLogoFile(e.currentTarget.files[0])}
//                     className="w-full border border-blue-300 rounded-md px-4 py-2"
//                   />
//                 </div>
//               </div>

//               {/* Submit */}
//               <div className="text-right pt-6">
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="bg-blue-900 text-white px-6 py-2 rounded-md hover:bg-blue-700"
//                 >
//                   {isSubmitting ? 'Updating...' : 'Update Profile'}
//                 </button>
//               </div>
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// };

// export default UpdateProfile;



import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useSelector } from 'react-redux';

const UpdateProfile = () => {
  const navigate = useNavigate();
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const doctorId = useSelector((state) => state.admin?.admin?.user?.id);
  const token = useSelector((state) => state.admin?.token);
  // Fetch doctor details (this would usually come from an API)
  useEffect(() => {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const fetchDoctorDetails = async () => {
      try {
        const response = await axios.get(`http://194.238.17.230:8001/api/admin/get_doctor/${doctorId}`, {headers}); // Replace with your actual API endpoint
        setDoctorDetails(response.data); // Assuming the API returns the doctor's profile details
      } catch (error) {
        console.error("Error fetching doctor's details", error);
      }
    };
    fetchDoctorDetails();
  }, []);

  if (!doctorDetails) return <div>Loading...</div>;

  const initialValues = {
    fullName: doctorDetails.fullName || '',
    email: doctorDetails.email || '',
    phone: doctorDetails.phone || '',
    dob: doctorDetails.dob || '',
    gender: doctorDetails.gender || 'Male',
    specialization: doctorDetails.specialization || '',
    qualification: doctorDetails.qualification || '',
    experience: doctorDetails.experience || '',
    registrationNumber: doctorDetails.registrationNumber || '',
    consultationFee: doctorDetails.consultationFee || '',
    clinicName: doctorDetails.clinicName || '',
    clinicAddress: doctorDetails.clinicAddress || '',
    clinicEmail: doctorDetails.clinicEmail || '',
    clinicContact: doctorDetails.clinicContact || '',
    clinicAbout: doctorDetails.clinicAbout || '',
    profilePicture: doctorDetails.profilePicture || '',
    logo: doctorDetails.logo || '',
    username: doctorDetails.username || '',
    password: '',
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required('Full name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    phone: Yup.string().required('Phone number is required'),
    dob: Yup.date().required('Date of birth is required'),
    specialization: Yup.string().required('Specialization is required'),
    qualification: Yup.string().required('Qualification is required'),
    experience: Yup.number().required('Experience is required'),
    registrationNumber: Yup.string().required('Registration number is required'),
    consultationFee: Yup.number().required('Consultation fee is required'),
    clinicName: Yup.string().required('Clinic name is required'),
    clinicAddress: Yup.string().required('Clinic address is required'),
    clinicEmail: Yup.string().email('Invalid email').required('Clinic email is required'),
    clinicContact: Yup.string().required('Clinic contact number is required'),
    clinicAbout: Yup.string().required('Clinic about information is required'),
    username: Yup.string().required('Username is required'),
    password: Yup.string().min(6, 'Password should be at least 6 characters long'),
  });

  const handleSubmit = async (values) => {
    const formData = new FormData();
    
    // Append fields to FormData
    Object.keys(values).forEach((key) => {
      if (key === 'profilePicture' || key === 'logo') {
        if (key === 'profilePicture' && imageFile) {
          formData.append('profilePicture', imageFile);
        }
        if (key === 'logo' && logoFile) {
          formData.append('logo', logoFile);
        }
      } else {
        formData.append(key, values[key]);
      }
    });

    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await axios.put(`http://194.238.17.230:8001/api/doctor/update_profile?doctorId=${doctorId}`, formData, {headers}); // Replace with your actual API endpoint
      console.log('Profile updated successfully:', response.data);
      navigate('/clinic_profile'); // Redirect after successful update
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-6 bg-[#F7FBFF] min-h-[90vh] rounded-md shadow-lg">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
        >
          Go Back
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-4 text-blue-900">Update Profile</h2>

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
                  { name: 'clinicName', label: 'Clinic Name' },
                  { name: 'clinicAddress', label: 'Clinic Address' },
                  { name: 'clinicEmail', label: 'Clinic Email', type: 'email' },
                  { name: 'clinicContact', label: 'Clinic Contact' },
                  { name: 'clinicAbout', label: 'Clinic About' },
                  { name: 'username', label: 'Username' },
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

                {/* Password */}
                <div>
                  <label className="block text-blue-800 font-medium mb-1">Password</label>
                  <Field
                    type="password"
                    name="password"
                    className="w-full border border-blue-300 rounded-md px-4 py-2"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                </div>

                {/* Profile Picture */}
                <div className="md:col-span-2">
                  <label className="block text-blue-800 font-medium mb-1">Profile Picture</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.currentTarget.files[0])}
                    className="w-full border border-blue-300 rounded-md px-4 py-2"
                  />
                </div>

                {/* Logo */}
                <div className="md:col-span-2">
                  <label className="block text-blue-800 font-medium mb-1">Logo</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setLogoFile(e.currentTarget.files[0])}
                    className="w-full border border-blue-300 rounded-md px-4 py-2"
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="text-right pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-900 text-white px-6 py-2 rounded-md hover:bg-blue-700"
                >
                  {isSubmitting ? 'Updating...' : 'Update Profile'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UpdateProfile;
