import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token =localStorage.getItem("token");
  const location = useLocation();
  

  if (!token) {
    return <Navigate to='/login' state={{ path: location.pathname }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;