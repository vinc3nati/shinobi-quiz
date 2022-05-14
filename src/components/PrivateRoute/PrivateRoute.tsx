import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts";

export const PrivateRoute = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const {
    userCredentials: { token },
  } = useAuth();
  const location = useLocation();

  return token ? (
    children
  ) : (
    <Navigate state={{ from: location.pathname }} replace to="/login" />
  );
};
