export const LOGIN_ADMIN = 'LOGIN_ADMIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const ADD_DOCTOR = 'ADD_DOCTOR';
export const ADD_DOCTOR_SUCCESS = 'ADD_DOCTOR_SUCCESS';
export const ADD_DOCTOR_FAILURE = 'ADD_DOCTOR_FAILURE';

export const GET_ALL_DOCTORS = 'GET_ALL_DOCTORS';
export const SET_DOCTORS = 'SET_DOCTORS';
export const DOCTORS_FAILURE = 'DOCTORS_FAILURE';

// Action Types
export const DELETE_DOCTOR = 'DELETE_DOCTOR';
export const DELETE_DOCTOR_SUCCESS = 'DELETE_DOCTOR_SUCCESS';
export const DELETE_DOCTOR_FAILURE = 'DELETE_DOCTOR_FAILURE';

export const UPDATE_DOCTOR = 'UPDATE_DOCTOR';
export const UPDATE_DOCTOR_SUCCESS = 'UPDATE_DOCTOR_SUCCESS';
export const UPDATE_DOCTOR_FAILURE = 'UPDATE_DOCTOR_FAILURE';
export const GET_DOCTOR_BY_ID = 'GET_DOCTOR_BY_ID';
export const SET_CURRENT_DOCTOR = 'SET_CURRENT_DOCTOR';

// Action Creators
export const deleteDoctor = (doctorId, token) => ({
  type: DELETE_DOCTOR,
  payload: { doctorId, token },
});

export const updateDoctor = (doctorId, formData, token) => ({
  type: UPDATE_DOCTOR,
  payload: { doctorId, formData, token },
});



export const getDoctorById = (doctorId, token) => ({
  type: GET_DOCTOR_BY_ID,
  payload: { doctorId, token },
});


export const loginAdmin = (credentials) => ({ type: LOGIN_ADMIN, payload: credentials });
export const addDoctor = (doctorData, token) => ({ type: ADD_DOCTOR, payload: { doctorData, token } });
export const getAllDoctors = (token) => ({ type: GET_ALL_DOCTORS, payload: token });
