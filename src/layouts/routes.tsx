import { useRoutes } from "react-router-dom";
import Layout from "./Layout.tsx";
import Register from "../components/web/register/Register.tsx";
import Home from "../components/web/home/Home.tsx";
import Admin from "../components/web/admin/Admin.tsx";
import Login from "../components/web/login/Login.tsx";

const Router = () => {
  const routes = [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "home",
          element: <Home />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: `home/:id`,
          element: <Home />,
        },
        {
          path: "admin",
          element: <Admin />,
        },

        {
          path: "*",
          element: <h2>Page Not Found -- web</h2>,
        },
      ],
    },
  ];
  return useRoutes(routes);
};

export default Router;
