import { useRoutes } from "react-router-dom";
import Layout from "./Layout";
import Register from "../components/web/register/Register";
import Home from "../components/web/home/Home";
import Admin from "../components/web/admin/Admin";
import Login from "../components/web/login/Login";
import ErrorPage from "../components/web/errorPage/index";
import About from "../components/web/about/index";
import SendCode from "../components/web/sendCode/SendCode";
import ForgetPassword from "../components/web/forgetpassword/ForgetPassword";

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
          path: "code",
          element: <SendCode />,
        },
        {
          path: "forgetPassword",
          element: <ForgetPassword />,
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
