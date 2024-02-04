import { Navigate, Outlet } from "react-router-dom";
import AppContext from "../context/AppProvider";
import { useContext } from "react";

const PublicRoutes = () => {
  const { userInfo } = useContext(AppContext);

  return userInfo?.token ? <Navigate to={"/pagina-principal"} /> : <Outlet />;
};

export default PublicRoutes;