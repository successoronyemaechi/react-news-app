/**
 * @author Successor Onyemaechi <successoronyemaechi@gmail.com>
 */
import {createContext, useCallback, useContext, useEffect, useState} from "react";
import axiosClient, { axiosGetCrsf } from "../utils/axiosClient";
import { Navigate } from "react-router-dom";
import {useStateContext} from "./ContextProvider";


const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [errors, setErrors] = useState({});
    const [notification, setNotification] = useState("");
    const { setIsLoading, setLoading } = useStateContext();
    
    const csrf = useCallback( async () => {
        try {
            await axiosGetCrsf.get("/sanctum/csrf-cookie");
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    },[setLoading]);

    const getUser = useCallback( async () => {
        setIsLoading(true)
        try {
            const { data } = await axiosClient.get("/user");
            setUser(data.user);
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    },[setIsLoading]);

    const login = useCallback( async ({ ...data }) => {
        setLoading(true);
        setErrors([]);
        await csrf();
        try {
            await axiosClient.post("/login", data);
            await getUser();
            return <Navigate to="/" />;
        } catch (e) {
            if (e.response?.status === 422) {
                return setErrors(e.response.data.errors);
            }
            if (e.response?.status === 500) {
                const errorMessage = e.response.data.message;
                return setErrors({ serverError: [errorMessage] });
            }
            setErrors({ serverError: [e.message] });
        } finally {
            setLoading(false);
        }
    }, [csrf, getUser, setLoading]);

    const register = useCallback( async ({ ...data }) => {
        setLoading(true)
        await csrf();
        setErrors([]);
        try {
            await axiosClient.post("/register", data);

            await getUser();
            return <Navigate to="/" />;
        } catch (e) {
            if (e.response?.status === 422) {
                return setErrors(e.response.data.errors);
            }
            if (e.response?.status === 500) {
                const errorMessage = e.response.data.message;
                return setErrors({ serverError: [errorMessage] });
            }
            setErrors({ serverError: [e.message] });
        } finally {
            setLoading(false);
        }
    },[csrf, getUser, setLoading]);

    const logout = useCallback( () => {
        setLoading(true)
        axiosClient.post("/logout").then(() => {
            setUser(null);
            return <Navigate to="/" />;
        });
        setLoading(false)
    },[setLoading]);



    useEffect(() => {
        async function fetchData() {
            if (!user) {
                await getUser();
                setIsLoading(false);
            }
        }
        fetchData();
    }, [getUser, user, setIsLoading]);



    return (
        <AuthContext.Provider
            value={{
                user,
                errors,
                getUser,
                login,
                register,
                logout,
                csrf,
                notification,
                setNotification,
            }}
        >

            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => useContext(AuthContext);
