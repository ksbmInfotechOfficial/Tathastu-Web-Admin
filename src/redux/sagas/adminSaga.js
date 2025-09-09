import { call, put, takeLatest } from 'redux-saga/effects';
import { APIURL } from '../api';
import {
  loginSuccess,
  loginFailure,
  addDoctorSuccess,
  addDoctorFailure,
  updateDoctorSuccess,
  setDoctors,
  doctorsFailure,
  setLoading,
  setCurrentDoctor
} from '../slices/adminSlice';

import {
  LOGIN_ADMIN,
  ADD_DOCTOR,
  GET_ALL_DOCTORS,
  DELETE_DOCTOR,
  UPDATE_DOCTOR,
  GET_DOCTOR_BY_ID,
  SET_CURRENT_DOCTOR
} from '../actions/adminActions';

function* loginAdminSaga(action) {
  try {
    yield put(setLoading(true));
    const response = yield call(fetch, `${APIURL}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(action.payload),
    });
    const data = yield response.json();

    if (data.token) {
      yield put(loginSuccess(data));
    } else {
      yield put(loginFailure(data.message));
    }
  } catch (error) {
    yield put(loginFailure(error.message));
  } finally {
    yield put(setLoading(false));
  }
}

// function* addDoctorSaga(action) {
//     try {
//       const { doctorData, token } = action.payload;
//       const response = yield call(fetch, 'http://194.238.17.230:8001/api/admin/add_doctor', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(doctorData),
//       });
  
//       const data = yield response.json();
  
//       if (response.ok) {
//         yield put(addDoctorSuccess(true)); // set success flag
//       } else {
//         yield put(addDoctorFailure(data.message));
//       }
//     } catch (error) {
//       yield put(addDoctorFailure(error.message));
//     }
//   }


function* addDoctorSaga(action) {
  try {
    const { doctorData, token } = action.payload;

    // Debug log
    for (let [key, value] of doctorData.entries()) {
      console.log(`${key}:`, value);
    }
    console.log('Token:', token);

    const response = yield call(fetch, 'http://194.238.17.230:8001/api/admin/add_doctor', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`, // Don't set Content-Type
      },
      body: doctorData,
    });

    const data = yield response.json();

    if (response.ok) {
      yield put(addDoctorSuccess(true));
    } else {
      yield put(addDoctorFailure(data.message || 'Failed to add doctor'));
    }
  } catch (error) {
    yield put(addDoctorFailure(error.message));
  }
}




// function* getAllDoctorsSaga(action) {
//   try {
//     yield put(setLoading(true));
//     const response = yield call(fetch, 'http://194.238.17.230:8001/api/admin/get_all_doctors', {
//       headers: {
//         Authorization: `Bearer ${action.payload}`,
//       },
//     });
//     const data = yield response.json();

//     if (response.ok) {
//       yield put(setDoctors(data.data));
//     } else {
//       yield put(doctorsFailure(data.message));
//     }
//   } catch (error) {
//     yield put(doctorsFailure(error.message));
//   } finally {
//     yield put(setLoading(false));
//   }
// }


// function* getAllDoctorsSaga(action) {
//   try {
//     yield put(setLoading(true));

//     const { token, createdBy } = action.payload;

//     const queryParam = createdBy ? `?createdBy=${createdBy}` : '';
//     console.log("QUERRRR",queryParam)
//     const response = yield call(fetch, `http://194.238.17.230:8001/api/admin/get_all_doctors${queryParam}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     const data = yield response.json();

//     if (response.ok) {
//       yield put(setDoctors(data.data));
//     } else {
//       yield put(doctorsFailure(data.message));
//     }
//   } catch (error) {
//     yield put(doctorsFailure(error.message));
//   } finally {
//     yield put(setLoading(false));
//   }
// }


function* getAllDoctorsSaga(action) {
  try {
    yield put(setLoading(true));

    const { token, page, limit, search, specialty, gender, createdBy } = action.payload;

    const queryParams = new URLSearchParams({
      ...(page && { page }),
      ...(limit && { limit }),
      ...(search && { search }),
      ...(specialty && { specialty }),
      ...(gender && { gender }),
      ...(createdBy && { createdBy }),
    }).toString();

    const response = yield call(fetch, `http://194.238.17.230:8001/api/admin/get_all_doctors?${queryParams}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = yield response.json();

    if (response.ok) {
      yield put(setDoctors({
    data: data.data,
    pagination: data.pagination
  })); // and maybe store pagination info too
    } else {
      yield put(doctorsFailure(data.message));
    }
  } catch (error) {
    yield put(doctorsFailure(error.message));
  } finally {
    yield put(setLoading(false));
  }
}




function* deleteDoctorSaga(action) {
    try {
      const { doctorId, token } = action.payload;
      yield put(setLoading(true));
      const response = yield call(fetch, `http://194.238.17.230:8001/api/admin/delete_doctor/${doctorId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        // Refresh doctors list after deletion
        const refreshed = yield call(fetch, 'http://194.238.17.230:8001/api/admin/get_all_doctors', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = yield refreshed.json();
        yield put(setDoctors(data.data));
      } else {
        const error = yield response.json();
        yield put(doctorsFailure(error.message));
      }
    } catch (error) {
      yield put(doctorsFailure(error.message));
    } finally {
      yield put(setLoading(false));
    }
  }


  // function* updateDoctorSaga(action) {
  //   try {
  //     const { doctorId, doctorData, token } = action.payload;
  //     yield put(setLoading(true));
  
  //     const response = yield call(fetch, `http://194.238.17.230:8001/api/admin/update_doctor/${doctorId}`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify(doctorData),
  //     });
  
  //     if (response.ok) {
  //       // Refresh list after update
  //       const refreshed = yield call(fetch, 'http://194.238.17.230:8001/api/admin/get_all_doctors', {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });
  //       const data = yield refreshed.json();
  //       yield put(setDoctors(data.data));
  //     } else {
  //       const error = yield response.json();
  //       yield put(doctorsFailure(error.message));
  //     }
  //   } catch (error) {
  //     yield put(doctorsFailure(error.message));
  //   } finally {
  //     yield put(setLoading(false));
  //   }
  // }


  function* updateDoctorSaga(action) {
    try {
      const { doctorId, formData, token } = action.payload;
  
      yield put(setLoading(true));
  
      const response = yield call(fetch, `http://194.238.17.230:8001/api/admin/update_doctor/${doctorId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
  
      const data = yield response.json();
  
      if (response.ok) {
        const refreshed = yield call(fetch, 'http://194.238.17.230:8001/api/admin/get_all_doctors', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const refreshedData = yield refreshed.json();
        yield put(setDoctors(refreshedData.data));
        yield put(updateDoctorSuccess(data));
      } else {
        yield put(doctorsFailure(data.message));
      }
    } catch (error) {
      yield put(doctorsFailure(error.message));
    } finally {
      yield put(setLoading(false));
    }
  }
  
  
  function* getDoctorByIdSaga(action) {
    try {
      const { doctorId, token } = action.payload;
  
      const response = yield call(fetch, `http://194.238.17.230:8001/api/admin/get_doctor/${doctorId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const data = yield response.json();
  
      if (response.ok) {
        // If needed, you could store this doctor in state
        // Example: yield put(setCurrentDoctor(data));
        console.log('Fetched doctor by ID:', data);
        yield put(setCurrentDoctor(data));
      } else {
        yield put(doctorsFailure(data.message));
      }
    } catch (error) {
      yield put(doctorsFailure(error.message));
    }
  }
  

export default function* adminSaga() {
  yield takeLatest(LOGIN_ADMIN, loginAdminSaga);
  yield takeLatest(ADD_DOCTOR, addDoctorSaga);
  yield takeLatest(GET_ALL_DOCTORS, getAllDoctorsSaga);
  yield takeLatest(DELETE_DOCTOR, deleteDoctorSaga);
  yield takeLatest(UPDATE_DOCTOR, updateDoctorSaga);
  yield takeLatest(GET_DOCTOR_BY_ID, getDoctorByIdSaga);
}
