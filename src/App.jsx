// import "./index.css";
// import { Routes, Route, Link } from "react-router-dom";

// import SignUp from "./pages/SignUp";
// import ProtectedRoute from "./WithAuth";
// import Login from "./pages/Login";

// function App() {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <main className="p-6">
//         <Routes>
//           <Route
//             path="/signup"
//             element={
//               <ProtectedRoute isPublic={true}>{<SignUp />}</ProtectedRoute>
//             }
//           />
//           <Route
//             path="/login"
//             element={
//               <ProtectedRoute isPublic={true}>{<Login />}</ProtectedRoute>
//             }
//           />
//         </Routes>
//       </main>
//     </div>
//   );
// }

// export default App;

import "./index.css";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import SignUp from "./pages/SignUp";
import ProtectedRoute from "./WithAuth";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UploadPage from "./pages/UploadPage";
import ReportDetail from "./pages/ReportDetail";

function App() {
  // Optional: Add authentication check on app load
  useEffect(() => {
    // You can add global auth initialization here if needed
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        {/* Public Routes */}
        <Route
          path="/signup"
          element={
            <ProtectedRoute isPublic={true}>
              <SignUp />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <ProtectedRoute isPublic={true}>
              <Login />
            </ProtectedRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <UploadPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports/:id"
          element={
            <ProtectedRoute>
              <ReportDetail />
            </ProtectedRoute>
          }
        />

        {/* Catch all route - redirect to dashboard */}
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
