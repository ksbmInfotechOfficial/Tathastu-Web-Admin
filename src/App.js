import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RouteGuard from './components/RouteGuard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Profile from './pages/Profile';
import User from './pages/users/Users';
import PrivateRoute from './components/PrivateRoute';
import PaymentPage from './components/PaymentPage';
import Layout from './components/Layout'; // Import the Layout component
import './index.css';
import Plan from './pages/plans/Plan';
import AddDoctor from './pages/doctor/AddDoctor';
import DoctorList from './pages/doctor/Doctor';
import UpdateDoctor from './pages/doctor/UpdateDoctor';
import CreatePlan from './pages/plans/CreatePlan';
import EditPlan from './pages/plans/EditPlan';
import NotFound from './components/NotFound';
import Transaction from './pages/Transaction';
import Customer from './pages/customer/Customer';
import CreateSlots from './pages/slots/CreateSlots';
import Slots from './pages/slots/Slot';
import Booking from './pages/booking/Booking';
import ClinicProfile from './pages/clinic/ClinicProfile';
import PlanPurchase from './pages/plans/PlanPurchase';
import SubscriptionGuard from './components/SubscriptionGuard';
import SymptomPage from './pages/symptom/Symptom';
import SlotManagement from './pages/slots/SlotManagement';
import ProfileUpdate from './pages/clinic/ProfileUpdate';
import PaymentSuccess from './pages/plans/PaymentSuccess';
import ViewDetail from './pages/doctor/ViewDetail';
import EliteRequests from './pages/EliteRequests';
import PurchaseHistory from './pages/plans/PurchaseHistory';
import ScheduledSessions from './pages/booking/ScheduledSessions';
import CustomerDetails from './pages/customer/CustomerDetails';
import MasterOtpPage from './pages/master/MasterOtp';
const App = () => {
  return (
    <>

      <Provider store={store}>
        <Router>
          <RouteGuard>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<NotFound />} />
              {/* Protected Routes wrapped with Layout */}
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Layout>
                      <Dashboard />
                    </Layout>
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Layout>
                      <Profile />
                    </Layout>
                  </PrivateRoute>
                }
              />
              <Route
                path="/users"
                element={
                  <PrivateRoute>
                    <Layout>
                      <User />
                    </Layout>
                  </PrivateRoute>
                }
              />

              <Route
                path="/plan"
                element={
                  <PrivateRoute>
                    <Layout>
                      <Plan />
                    </Layout>
                  </PrivateRoute>
                }
              />

              <Route
                path="/plan_purchase"
                element={
                  <PrivateRoute>
                    <Layout>
                      <PlanPurchase />
                    </Layout>
                  </PrivateRoute>
                }
              />


              <Route
                path="/purchase_history"
                element={
                  <PrivateRoute>
                    <Layout>
                      <PurchaseHistory />
                    </Layout>
                  </PrivateRoute>
                }
              />

              <Route
                path="/plan/add"
                element={
                  <PrivateRoute>
                    <Layout>
                      <CreatePlan />
                    </Layout>
                  </PrivateRoute>
                }
              />

              <Route
                path="/plan/edit/:id"
                element={
                  <PrivateRoute>
                    <Layout>
                      <EditPlan />
                    </Layout>
                  </PrivateRoute>
                }
              />


              <Route
                path="/payment"
                element={
                  <PrivateRoute>
                    <Layout>
                      <PaymentPage />
                    </Layout>
                  </PrivateRoute>
                }
              />


              <Route
                path="/payment-success"
                element={
                  <PrivateRoute>
                    <Layout>
                      <PaymentSuccess />
                    </Layout>
                  </PrivateRoute>
                }
              />


              <Route
                path="/doctors/add"
                element={
                  <PrivateRoute>
                    <Layout>
                      <AddDoctor />
                    </Layout>
                  </PrivateRoute>
                }
              />

              <Route
                path="/doctors"
                element={
                  <PrivateRoute>
                    <Layout>
                      <SubscriptionGuard>
                        <DoctorList />
                      </SubscriptionGuard>
                    </Layout>
                  </PrivateRoute>
                }
              />


                <Route
                path="/doctors/view/:id"
                element={
                  <PrivateRoute>
                    <Layout>
                      <SubscriptionGuard>
                        <ViewDetail />
                      </SubscriptionGuard>
                    </Layout>
                  </PrivateRoute>
                }
              />

              <Route
                path="/customers"
                element={
                  <PrivateRoute>
                    <Layout>
                      <Customer />
                    </Layout>
                  </PrivateRoute>
                }
              />

               <Route
                path="/customers/:id"
                element={
                  <PrivateRoute>
                    <Layout>
                      <CustomerDetails />
                    </Layout>
                  </PrivateRoute>
                }
              />

              <Route
                path="/doctors/update/:doctorId"
                element={
                  <PrivateRoute>
                    <Layout>
                      <UpdateDoctor />
                    </Layout>
                  </PrivateRoute>
                }
              />


              <Route
                path="/transaction"
                element={
                  <PrivateRoute>
                    <Layout>
                      <SubscriptionGuard>
                        <Transaction />
                      </SubscriptionGuard>
                    </Layout>
                    
                  </PrivateRoute>
                }
              />


              <Route
                path="/create_slots"
                element={
                  <PrivateRoute>
                    <Layout>
                      <CreateSlots />
                    </Layout>
                  </PrivateRoute>
                }
              />

              <Route
                path="/appointments"
                element={
                  <PrivateRoute>
                    <Layout>
                      <SubscriptionGuard>
                        <Slots />
                      </SubscriptionGuard>
                    </Layout>
                  </PrivateRoute>
                }
              />

               <Route
                path="/slots"
                element={
                  <PrivateRoute>
                    <Layout>
                      <SubscriptionGuard>
                        <SlotManagement />
                      </SubscriptionGuard>
                    </Layout>
                  </PrivateRoute>
                }
              />


              <Route
                path="/booking"
                element={
                  <PrivateRoute>
                    <Layout>
                        <SubscriptionGuard>
                          <Booking />
                      </SubscriptionGuard>
                    </Layout>
                  </PrivateRoute>
                }
              />


                <Route
                path="/scheduled_sessions"
                element={
                  <PrivateRoute>
                    <Layout>
                        <SubscriptionGuard>
                          <ScheduledSessions/>
                      </SubscriptionGuard>
                    </Layout>
                  </PrivateRoute>
                }
              />


              <Route
                path="/elite_requests"
                element={
                  <PrivateRoute>
                    <Layout>
                          <EliteRequests />
                    </Layout>
                  </PrivateRoute>
                }
              />


              <Route
                path="/master_otp"
                element={
                  <PrivateRoute>
                    <Layout>
                          <MasterOtpPage />
                    </Layout>
                  </PrivateRoute>
                }
              />


              <Route
                path="/clinic_profile"
                element={
                  <PrivateRoute>
                    <Layout>
                      <ClinicProfile />
                    </Layout>
                  </PrivateRoute>
                }
              />

               <Route
                path="/profile_update"
                element={
                  <PrivateRoute>
                    <Layout>
                      <ProfileUpdate />
                    </Layout>
                  </PrivateRoute>
                }
              />

              <Route
                path="/symptoms"
                element={
                  <PrivateRoute>
                    <Layout>
                   
                      <SubscriptionGuard>
                           <SymptomPage />
                      </SubscriptionGuard>
                    </Layout>
                  </PrivateRoute>
                }
              />


            </Routes>
          </RouteGuard>
        </Router>
      </Provider>
      <ToastContainer />
    </>
  );
};

export default App;
