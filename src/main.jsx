// DEFAULT IMPORTS
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// USEFUL IMPORTS
import { ToastContainer } from "react-toastify";
import { AppProvider } from "./context/AppProvider";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

// PAGES IMPORTS
import LogIn from "./pages/LogIn";
import Root from "./pages/Root";
import ForgotPassword from "./pages/ForgotPassword";
import NewPassword from "./pages/NewPassword";
import GestionarUsuarios from "./pages/GestionarUsuarios";
import EditarPerfil from "./pages/Editar-Perfil";
import Perfil from "./pages/Perfil";
import ConsultaPublica from "./pages/ConsultaPublica";

// Rutas privadas y publicas
import PublicRoutes from "./auth/PublicRoutes";
import PrivateRoutes from "./auth/PrivateRoutes";
import AdminRoutes from "./auth/AdminRoutes";

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        path: "/consulta-publica",
        element: <ConsultaPublica />,
      },
    ],
  },

  {
    element: <PublicRoutes />,
    children: [
      {
        element: <Root />,
        children: [
          {
            path: "/",
            element: <LogIn />,
            index: true,
          },
        ]
      },

      {
        path: "/olvide-password",
        element: <ForgotPassword />,
      },

      {
        path: "/NewPassword",
        element: <NewPassword />,
      },
    ],
  },

  {
    element: <PrivateRoutes />,
    children: [
      {
        element: <Root />,
        children: [
          {
            path: "/perfil/:perfilId?",
            element: <Perfil />,
          },

          {
            path: "/editar-perfil",
            element: <EditarPerfil />,
          },

          {
            element: <AdminRoutes />,
            children: [
              {
                path: "/gestionar-usuarios",
                element: <GestionarUsuarios />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AppProvider>
    <ToastContainer position="top-center" stacked />
    <RouterProvider router={router} />
  </AppProvider>
);
