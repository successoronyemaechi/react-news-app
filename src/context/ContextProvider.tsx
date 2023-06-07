
/**
 * @author Successor Onyemaechi <successoronyemaechi@gmail.com>
 */


import {createContext, useCallback, useContext, useState} from "react";
import {AuthProvider} from "./AuthProvider";
import axiosClient from "../utils/axiosClient";
import {Toaster} from "react-hot-toast";

const StateContext = createContext({});

export const ContextProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")
    const [sourceNames, setSourceNames] = useState([]);
    const [categories, setCategories] = useState([])
    const [articles, setArticles] = useState([]);
    const [isArticlesLoading, setIsArticlesLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 9;
    const NumArticles = articles.length;

    const getSourceName = useCallback( async () => {
        try {
            const { data } = await axiosClient.get("/source-name");
            setSourceNames(data[0]);
        } catch (e) {
            console.error(e.response?.data.error);
        }
    }, []);

    const getCategoryName = useCallback( async () => {
        try {
            const { data } = await axiosClient.get("/category-name");
            setCategories(data[0]);
        } catch (e) {
            console.error(e.response?.data.error);
        }
    }, []);

    const getArticles = useCallback( async () => {
        setIsArticlesLoading(true)
        try {
            const { data } = await axiosClient.get("/filter");
            setArticles(data);
        } catch (e) {
            setError(e.response?.data.error)
        } finally {
            setIsArticlesLoading(false)
        }
    }, []);



    const getPaginatedArticles = (articles, currentPage) => {
        const startIndex = (currentPage - 1) * perPage;
        const endIndex = startIndex + perPage;
        return articles.slice(startIndex, endIndex);
    };
    const totalPages = Math.ceil(articles.length / perPage);

    return (
        <StateContext.Provider
            value={{
                articles,
                setArticles,
                isLoading,
                setIsLoading,
                isArticlesLoading,
                setIsArticlesLoading,
                currentPage,
                totalPages,
                setCurrentPage,
                perPage,
                getArticles,
                NumArticles,
                sourceNames,
                categories,
                getPaginatedArticles,
                error,
                setError,
                loading,
                setLoading,
                getCategoryName,
                getSourceName,
            }}
        >

            <AuthProvider>
                <Toaster />
                <div className="min-h-screen">
                    {children}
                </div>
            </AuthProvider>
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);

