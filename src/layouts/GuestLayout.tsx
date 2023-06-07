
/**
 * @author Successor Onyemaechi <successoronyemaechi@gmail.com>
 */
import { Navigate, Outlet } from "react-router-dom";
import {useStateContext} from "../context/ContextProvider";
import Loader from "../components/Loader";
import {useAuthContext} from "../context/AuthProvider";

const GuestLayout = () => {
  const { user } = useAuthContext();
  const { isLoading } = useStateContext();

  if (isLoading) {
    return (
        <Loader/>
    );
  }

  return !isLoading && !user ? <Outlet /> : <Navigate to="/" />;
};

export default GuestLayout;
