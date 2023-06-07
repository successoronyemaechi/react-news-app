
/**
 * @author Successor Onyemaechi <successoronyemaechi@gmail.com>
 */

import {useCallback, useEffect, useState} from "react";
import axiosClient from "../utils/axiosClient";
import {useStateContext} from "../context/ContextProvider";
import {ArticleCard} from "../components/ArticleCard";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";

const Preference = () => {
    const [articles, setArticles] = useState([]);
    const [isArticlesLoading, setIsArticlesLoading] = useState(false);
    const { setError, error, getPaginatedArticles, currentPage, perPage, setCurrentPage   } = useStateContext();

    const getPreference = useCallback( async () => {
        setIsArticlesLoading(true)
        try {
            const { data: { data } } = await axiosClient.get("/get-preference");
            setArticles(data);
        } catch (e) {
            setError(e.response.data.message)
        } finally {
            setIsArticlesLoading(false)
        }
    }, [setError, setIsArticlesLoading]);

    useEffect(() => {
        getPreference()
    }, [getPreference]);

    if (isArticlesLoading) {
        return <Loader />;
    }

    if (!isArticlesLoading && articles.length === 0) {
        return (
            <div className="flex justify-center">
                <div className="text-red-600 mt-3 text-3xl font-bold uppercase text-center">
                    {error}
                </div>
            </div>
        );
    }

    const paginatedArticles = articles ? getPaginatedArticles(articles, currentPage) : [];
    const totalPages = Math.ceil(articles.length / perPage);

    return (
        <>
            <h2 className="text-3xl font-bold mb-5 pb-4 text-center">Your Preference</h2>
            <div className="grid lg:grid-cols-3 gap-6 xl:gap-x-12 mb-20">
                {paginatedArticles && paginatedArticles.map((article, index) => (
                    <ArticleCard key={index} article={article} />
                ))}
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
            />
        </>
    )
}

export default Preference;