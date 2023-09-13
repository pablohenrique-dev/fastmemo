import React from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Loading } from "../components/Loading/Index";

export const ProtectedRoute = ({ children }: React.PropsWithChildren) => {
  const { logged } = useAuthContext();

  if (logged === null) return <Loading />;
  return logged ? children : <Navigate to="/login" />;
};
