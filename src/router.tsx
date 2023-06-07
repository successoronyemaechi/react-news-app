/**
 * @author Successor Onyemaechi <successoronyemaechi@gmail.com>
 */

import {createBrowserRouter} from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import GuestLayout from "./layouts/GuestLayout";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";
import Preference from "./pages/Preference";
import Nav from "./components/Nav";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Nav />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/",
                element: <AuthLayout />,
                children: [
                    {
                        path: "/preference",
                        element: <Preference />,
                    },
                ],
            },
        ],
    },
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/forgot-password",
                element: <ForgotPassword />,
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router;