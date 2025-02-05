import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const [isAuthenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    setAuthenticated(accessToken);
  }, []);

  if (isAuthenticated === null) {
    return null;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};
