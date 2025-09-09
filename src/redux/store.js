// src/store.js
// import { configureStore } from '@reduxjs/toolkit';
// import sidebarReducer from './slices/sidebarSlice';
// import userReducer from './slices/userSlice';

// export const store = configureStore({
//   reducer: {
//     sidebar: sidebarReducer,
//     user: userReducer,
//   },
// });



// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import sidebarReducer from './slices/sidebarSlice';
import userReducer from './slices/userSlice';
import adminReducer from './slices/adminSlice';
import adminSaga from './sagas/adminSaga'; 

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure store
export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    user: userReducer,
    admin: adminReducer, // optional: include admin if you made it
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

// Run saga watchers
sagaMiddleware.run(adminSaga);

