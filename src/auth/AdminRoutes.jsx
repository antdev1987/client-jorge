import React, { useContext } from "react";
import AppContext from "../context/AppProvider";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoutes = () => {
  const { userInfo } = useContext(AppContext);

  return userInfo.isAdmin ? <Outlet /> : <Navigate to={"/pagina-principal"} />;
};

export default AdminRoutes;
