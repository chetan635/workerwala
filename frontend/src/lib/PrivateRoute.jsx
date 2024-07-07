import React from "react";
import { Auth } from "../lib/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const user = Auth();
  if (!user.accessToken) return <Navigate to="/login" />;
  return (
    <div>
      <Outlet />
    </div>
  );
}
