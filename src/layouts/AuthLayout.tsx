import { Navigate, Outlet } from "react-router-dom";
import {useStateContext} from "../context/ContextProvider";
import Loader from "../components/Loader";
import {useAuthContext} from "../context/AuthProvider";

const AuthLayout = () => {
  const { user } = useAuthContext();
  const { isLoading } = useStateContext();

    if (isLoading) {
        return (
            <Loader/>
        );
    }

    return !isLoading && !user ? <Navigate to="/login" /> : <Outlet />;
};

export default AuthLayout;
