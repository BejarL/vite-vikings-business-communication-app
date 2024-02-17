import { Navigate, Outlet } from "react-router-dom";

const Protected = () => {
  // Retrieve the token from session storage
  const token = sessionStorage.getItem("token");

  // Check if the token exists
  // If the token exists, render the nested routes using the Outlet component
  // If the token doesn't exist, redirect to the login page using the Navigate component
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default Protected;
