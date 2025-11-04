// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   // Navigate,
// } from "react-router-dom";
// import ProfileNavbar from "./components/ProfileNavbar";
// import Sidebar from "./components/Sidebar";
// import HomePage from "./pages/HomePage";
// import LoginPage from "./pages/LoginPage";
// import RegisterPage from "./pages/RegisterPage";
// import RKKYForm from "./pages/RKKYForm";
// import ProfileDataProvider from "./context_providers/ProfileDataProvider";
// import ProfilePage from "./pages/ProfilePage";
// import ApplicationTrackingPage from "./pages/ApplicationTrackingPage";
// import HistoryPage from "./pages/HistoryPage";
// import MedAidsPage from "./pages/MedAidsPage";
// import ContactUsPage from "./pages/ContactUsPage";
// import PageNotFoundPage from "./pages/PageNotFoundPage";

// const App = () => {
//   return (
//     <>
//       {/* <ProfileNavbar /> */}
//       {/* <HomePage /> */}
//       <Router>
//         <ProfileDataProvider>
//           <Routes>
//             {/* <Route path="/" element={<RegisterPage />} />
//             <Route path="/form" element={<RKKYForm />} /> */}
//             {/* Main Routes */}
//             <Route path="/" element={<HomePage />} />
//             <Route path="/login" element={<LoginPage />} />
//             <Route path="/register" element={<RegisterPage />} />
//             <Route path="/profile" element={<ProfilePage />} />

//             {/* Application Related Routes */}
//             <Route
//               path="/application-tracking"
//               element={<ApplicationTrackingPage />}
//             />
//             <Route path="/form" element={<RKKYForm />} />
//             <Route path="/history" element={<HistoryPage />} />

//             {/* Medical Aid Routes */}
//             <Route path="/medical-aids" element={<MedAidsPage />} />

//             {/* Other Routes */}
//             <Route path="/contact-us" element={<ContactUsPage />} />

//             {/* 404 Route - Always keep this last */}
//             <Route path="*" element={<PageNotFoundPage />} />

//             {/* Public Routes */}
//             {/* <Route path="/" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/resetPassword" element={<ResetPassword />} />
//           <Route path="/unauthorized" element={<Unauthorized />} />
//           <Route path="/file-upload" element={<FileUpload />} /> */}

//             {/* User Routes */}
//             {/* <Route element={<PrivateRoute allowedRoles={["user"]} />}>
//             <Route path="/user" element={<Home />}>
//               <Route path="profile" element={<UserProfile />} />
//               <Route path="form" element={<FormPage />} />
//               <Route path="claim-amt" element={<ClaimAmt />} />
//               <Route path="transactions" element={<Transactions />} />
//               <Route path="receipt" element={<Receipt />} />
//               <Route path="preview-claim" element={<AmountClaimPreview />} />
//             </Route>
//             <Route path="receipt/:id" element={<ShowReceipt />} />
//           </Route> */}

//             {/* Sub-Admin Routes */}
//             {/* <Route element={<PrivateRoute allowedRoles={["sub-admin"]} />}>
//             <Route path="/sub-admin" element={<Home />}>
//               <Route path="profile" element={<SubAdminProfile />} />
//               <Route path="view-users" element={<ViewUsers />} />
//               <Route path="users/:userId" element={<EditUsers />} />
//               <Route path="manage-applications" element={<ManageForms />} />
//               <Route
//                 path="view-application/:id"
//                 element={<HandleApplications />}
//               />
//             </Route>
//           </Route> */}

//             {/* Admin Routes */}
//             {/* <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
//             <Route path="/admin" element={<Home />}>
//               <Route path="profile" element={<AdminProfile />} />
//               <Route path="manage-users" element={<ManageUsers />} />
//               <Route path="sub-admin/:userId" element={<ViewSubAdmin />} />
//               <Route path="show-applications" element={<ShowForms />} />
//               <Route
//                 path="manage-application/:id"
//                 element={<ManageApplicationsAdmin />}
//               />
//             </Route>
//           </Route> */}
//           </Routes>
//         </ProfileDataProvider>
//       </Router>
//     </>
//   );
// };

// export default App;

import { Routes, Route } from "react-router-dom";
import HomePage, { Scheme1Page, Scheme2Page } from "./pages/HomePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/scheme1" element={<Scheme1Page />} />
      <Route path="/scheme2" element={<Scheme2Page />} />
    </Routes>
  );
}

export default App;
