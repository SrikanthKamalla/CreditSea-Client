// import React from "react";
// import { Navigate } from "react-router-dom";
// import Navbar from "../src/components/Navbar";
// import { getAuthToken } from "./helpers/localstorage";

// const ProtectedRoute = ({ children, isPublic = false }) => {
//   const token = getAuthToken();
//   if (!token && !isPublic) {
//     return <Navigate to="/login" state={{ from: location.pathname }} replace />;
//   }
//   if (token && isPublic) {
//     return <Navigate to="/dashboard" replace />;
//   }

//   return !isPublic ? (
//     <div>
//       <Navbar />
//       <div>{children}</div>
//     </div>
//   ) : (
//     children
//   );
// };

// export default ProtectedRoute;

import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import { getAuthToken } from "./helpers/localstorage";

const ProtectedRoute = ({ children, isPublic = false }) => {
  const location = useLocation();
  const token = getAuthToken();

  // Redirect to login if no token and route is not public
  if (!token && !isPublic) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Redirect to dashboard if token exists and trying to access public routes
  if (token && isPublic) {
    return <Navigate to="/dashboard" replace />;
  }

  // For protected routes, wrap with Navbar
  return !isPublic ? (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</main>
    </div>
  ) : (
    // For public routes, just render children
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {children}
    </div>
  );
};

export default ProtectedRoute;
