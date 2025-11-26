// // src/components/ProtectedRoute.jsx
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated, loading } = useAuth();

//   // Show loading spinner while checking authentication
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-slate-50">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-800 mx-auto mb-4"></div>
//           <p className="text-slate-600 text-sm">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   // If not authenticated, redirect to login
//   if (!isAuthenticated()) {
//     return <Navigate to="/login" replace />;
//   }

//   // If authenticated, render the protected content
//   return children;
// };

// export default ProtectedRoute;





// import React, { useContext } from 'react';
// import { Navigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';


// export default function ProtectedRoute({ children }){
// const { token } = useContext(AuthContext);
// if (!token) return <Navigate to="/login" replace />;
// return children;
// }





// ===== ProtectedRoute.jsx =====
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  // const { token } = useContext(AuthContext);
  // if (!token) return <Navigate to="/login" replace />;
  const { token, user } = useContext(AuthContext);
if (!token || !user) return <Navigate to="/login" replace />;
return children;
}
