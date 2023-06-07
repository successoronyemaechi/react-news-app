/**
 * @author Successor Onyemaechi <successoronyemaechi@gmail.com>
 */

import {useCallback, useEffect} from "react";
import {useStateContext} from "../context/ContextProvider";
import toast from "react-hot-toast";
import axiosClient from "../utils/axiosClient";
import {ArticleCard} from "./ArticleCard";
import Pagination from "./Pagination";
import Loader from "./Loader";

export default function GetArticles() {
    const {
        isArticlesLoading,
        getPaginatedArticles,
        articles,
        error,
        getCategoryName,
        getSourceName,
        getArticles,
        currentPage,
        totalPages,
        setCurrentPage

    } = useStateContext();
    let isRequestPending = false;


    const addToPreference = useCallback(async (article) => {
        if (isRequestPending) return;

        try {
            isRequestPending = true;
            const { data } = await axiosClient.post("/add-to-preference", {
                ...article,
            });
            toast.success(data.message);
        } catch (e) {
            if (e.response?.status === 401) {
                return toast.error(e.response?.data.message);
            }
            if (e.response?.status === 406) {
                return toast.error(e.response?.data.message);
            }
        } finally {
            isRequestPending = false;
        }
    }, []);

    useEffect(() => {
        getCategoryName().then(r => r);
        getSourceName().then(r => r)
    }, [getCategoryName, getSourceName]);

    useEffect(() => {
        async function fetchData() {
            await getArticles();
        }
        fetchData();
    }, [getArticles]);

    const paginatedArticles = articles ? getPaginatedArticles(articles, currentPage) : [];

    if (isArticlesLoading) {
        return <Loader />;
    }

    if (!isArticlesLoading && articles.length === 0) {
        return (
            <div className="flex justify-center">
                <div className="text-red-600 mt-5 text-3xl font-bold uppercase text-center">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="grid lg:grid-cols-3 gap-6 xl:gap-x-12 mt-5 mb-20">
                {paginatedArticles && paginatedArticles.map((article, index) => (
                    <ArticleCard key={index} addToPreference={addToPreference} article={article} />
                ))}
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
            />

        </>
    );
}