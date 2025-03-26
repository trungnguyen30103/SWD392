import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, allowedRoles, userRole }) => {
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" />;
  }
  return element;
};

export default ProtectedRoute;
