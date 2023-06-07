/**
 * @author Successor Onyemaechi <successoronyemaechi@gmail.com>
 */
import {useStateContext} from "../context/ContextProvider";
import {useCallback, useEffect, useState} from "react";
import axiosClient from "../utils/axiosClient";

export default function Filter() {
    const { sourceNames, categories, setArticles, setIsArticlesLoading, setError } = useStateContext();
    const [keyword, setKeyword] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSource, setSelectedSource] = useState("");
    const [byDate, setByDate] = useState("");

    const search = useCallback( async () => {
        if (keyword.trim() === "" && !selectedCategory && !selectedSource && !byDate) return;

        setIsArticlesLoading(true)
        try {
            const { data } = await axiosClient.post("/filter", {
                keyword,
                name: selectedCategory,
                source: selectedSource,
                date: byDate
            });
            setArticles(data)
        } catch (e) {
            setError("No result matches your filter!")
        } finally {
            setIsArticlesLoading(false)
        }
    },[keyword, selectedCategory, selectedSource, byDate, setIsArticlesLoading, setArticles, setError]);

    useEffect(() => {
        search();
    }, [search]);

    const clearFilter = () => {
        setByDate("");
        setSelectedSource("");
        setSelectedCategory("");
        setKeyword("");
        setSelectedSource("NewsApi")
    }

    return (
        <>
            <div className="mb-10">
                <button
                    onClick={clearFilter}
                    className="z-[2] mb-4 p-3 items-center bg-indigo-900 px-3 lg:px-6  text-xs text-right font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-indigo-950 hover:shadow-lg focus:bg-indigo-950 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg lg:mt-0"
                    type="button"
                    id="button-addon1"
                    data-te-ripple-color="light"
                >
                    Clear filter
                </button>
                <div className="grid lg:grid-cols-4 gap-1 xl:gap-x-4">
                    <input
                        type="search"
                        value={keyword}
                        onChange={(e) => {
                            setKeyword(e.target.value);
                            search();
                        }}
                        className="rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[1] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none"
                        placeholder="Search"
                        aria-label="Search"
                        aria-describedby="button-addon1"
                    />
                    <select
                        value={selectedCategory}
                        onChange={(e) => {
                            setSelectedCategory(e.target.value);
                            search();
                        }}
                        className=" rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding text-base px-3 py-[0.25rem] font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none lg:mt-0" >
                        <option value="">All Category</option>
                        {categories && categories.map((category, index) => {
                            return (
                                <option value={category.name}  key={index}>{category.name}</option>
                            );
                        })}
                    </select>
                    <input
                        type="date"
                        value={byDate}
                        onChange={(e) => {
                            setByDate(e.target.value);
                            search().then(r => r);
                        }}
                        className=" rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none"
                    />
                    <select
                        value={selectedSource}
                        onChange={(e) => {
                            setSelectedSource(e.target.value);
                            search();
                        }}
                        className=" rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none lg:mt-0">
                        {sourceNames && sourceNames.map((source, index) => {
                            return (<option value={source.name} key={index}>{source.name}</option>);
                        })}
                    </select>
                </div>
            </div>
        </>
    )

}