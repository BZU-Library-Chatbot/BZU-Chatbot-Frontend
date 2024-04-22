import { useRoutes } from "react-router-dom";
import Layout from "./Layout.tsx";
import Register from "../components/web/register/Register.tsx";
import Home from "../components/web/home/Home.tsx";
import Admin from "../components/web/admin/Admin.tsx";
import Login from "../components/web/login/Login.tsx";
import ErrorPage from "../components/web/errorPage/index.tsx";
import About from "../components/web/about/index.tsx";

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
          path: "about",
          element: <About />,
        },
        {
          path: "*",
          element: <ErrorPage />,
        },
      ],
    },
  ];
  return useRoutes(routes);
};

export default Router;
