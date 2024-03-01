import { createBrowserRouter } from "react-router-dom";
import Layout from './Layout.tsx'
import Register from "../components/web/register/Register.tsx";
import Home from "../components/web/home/Home.tsx";
import Login  from "../components/web/login/Login.jsx";



export const router = createBrowserRouter([
    {
        path:'/',
        element:<Layout />,
        children: [
            {
                path: 'register',
                element:<Register/>
            },
            {
                path: 'login',
                element:<Login/>
            },
            {
                path: 'home',
                element:<Home/>
            },
            {
                path: '*',
                element: <h2>Page Not Found -- web</h2>
            }
        ]
    },
]);