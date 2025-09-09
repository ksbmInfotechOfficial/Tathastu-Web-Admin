import {
    LOGIN_SUCCESS, LOGIN_FAILURE,
    ADD_DOCTOR_SUCCESS, ADD_DOCTOR_FAILURE,
    SET_DOCTORS, DOCTORS_FAILURE,  SET_CURRENT_DOCTOR,
  } from '../actions/adminActions';
  
  const initialState = {
    token: null,
    doctors: [],
    error: null,
    currentDoctor: null, 
  };
  
  const adminReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_SUCCESS:
        return { ...state, token: action.payload.token, error: null };
      case LOGIN_FAILURE:
        return { ...state, error: action.payload };
  
      case ADD_DOCTOR_SUCCESS:
        return { ...state, error: null };
      case ADD_DOCTOR_FAILURE:
        return { ...state, error: action.payload };
  
      case SET_DOCTORS:
  return {
    ...state,
    doctors: action.payload.data,        // doctor list
    pagination: action.payload.pagination, // store pagination info
  };

      case DOCTORS_FAILURE:
        return { ...state, error: action.payload };

      case SET_CURRENT_DOCTOR:  // Handle the new action for setting a current doctor
        return { ...state, currentDoctor: action.payload };  
  
      default:
        return state;
    }
  };
  
  export default adminReducer;
  