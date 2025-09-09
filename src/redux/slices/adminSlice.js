import { createSlice } from '@reduxjs/toolkit';

// Read from localStorage if available
const savedAdmin = localStorage.getItem('admin');
const savedToken = localStorage.getItem('token');

const initialState = {
  admin: savedAdmin ? JSON.parse(savedAdmin) : null,
  token: savedToken || null,
  doctors: [],
  loading: false,
  error: null,
  doctorAdded: false,
  doctorUpdated: false,
  currentDoctor: null,

};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { token, ...adminData } = action.payload;
      state.token = token;
      state.admin = adminData;
      state.error = null;

      // Save to localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('admin', JSON.stringify(adminData));
      localStorage.setItem('role', adminData.admin.role);
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
    },

    logoutAdmin: (state) => {
      state.token = null;
      state.admin = null;
      state.error = null;
      state.doctors = [];

      // Clear localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('admin');
      localStorage.removeItem('role');
    },

    addDoctorSuccess: (state, action) => {
      state.doctorAdded = action.payload;
      state.error = null;
    },
    resetDoctorAdded: (state) => {
        state.doctorAdded = false;
      },
    addDoctorFailure: (state, action) => {
      state.error = action.payload;
    },

    updateDoctorSuccess: (state, action) => {
      const updatedDoctor = action.payload;
      state.doctors = state.doctors.map((doctor) =>
        doctor._id === updatedDoctor._id ? updatedDoctor : doctor
      );
      state.doctorUpdated = true;
      state.error = null;
    },
    resetDoctorUpdated: (state) => {
      state.doctorUpdated = false;
    },
    

    setDoctors: (state, action) => {
  state.doctors = action.payload.data;         // array of doctors
  state.pagination = action.payload.pagination; // full pagination object
  state.error = null;
},

    doctorsFailure: (state, action) => {
      state.error = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setCurrentDoctor: (state, action) => {
      state.currentDoctor = action.payload;
    },
  },
});

export const {
  loginSuccess,
  loginFailure,
  logoutAdmin,
  addDoctorSuccess,
  addDoctorFailure,
  setDoctors,
  doctorsFailure,
  setLoading,
  resetDoctorAdded,
  updateDoctorSuccess,
  resetDoctorUpdated,
  setCurrentDoctor,
} = adminSlice.actions;

export default adminSlice.reducer;
