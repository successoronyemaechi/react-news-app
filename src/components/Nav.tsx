/**
 * @author Successor Onyemaechi <successoronyemaechi@gmail.com>
 */

import { Outlet, Link } from "react-router-dom";
import {useStateContext} from "../context/ContextProvider";
import Loader from "../components/Loader";
import {useAuthContext} from "../context/AuthProvider";
import {Collapse, Dropdown, initTE, Ripple} from "tw-elements";
import {useEffect} from "react";
import GuestLayout from "../layouts/GuestLayout";
import {RxHamburgerMenu} from "react-icons/rx";
import {BsFillBookmarkCheckFill} from "react-icons/bs";
import {FaUserAlt} from "react-icons/fa";

const Nav = () => {
    const { user, logout } = useAuthContext();
    const { isLoading, isArticlesLoading} = useStateContext();
    useEffect(() => {
        initTE({ Ripple, Collapse, Dropdown });
    }, []);

    if (isLoading && isArticlesLoading) {
        return <Loader />;
    }

    if (!user && location.pathname === '/preference') {
        return <GuestLayout/>;
    }

    return  (
        <>
            <nav
                className="bg-indigo-900 flex-no-wrap relative flex w-full items-center justify-around py-2 shadow-md shadow-black/5 dark:shadow-black/10 lg:py-4"
                data-te-navbar-ref>
                <div className="container mx-auto">
                    <div className="flex w-full flex-wrap items-center justify-between px-3">
                        <button
                            className="block border-0 bg-transparent px-2 text-neutral-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
                            type="button"
                            data-te-collapse-init
                            data-te-target="#navbarSupportedContent1"
                            aria-controls="navbarSupportedContent1"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                      <span className="[&>svg]:w-7">
                        <RxHamburgerMenu className="h-7 w-7"/>
                      </span>
                        </button>
                        <div
                            className="!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto"
                            id="navbarSupportedContent1"
                            data-te-collapse-item>
                            <Link
                                to="/"
                                className="mb-4 mr-2 mt-3 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:mb-0 lg:mt-0">
                                <span className="text-2xl">News Aggregator</span>
                            </Link>
                        </div>

                        {user ? (
                            <>
                                <div className="relative flex items-center">
                                    <Link
                                        to="/preference"
                                        className="mr-4 text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                                        >
                                        <span className="[&>svg]:w-5">
                                            <BsFillBookmarkCheckFill className="h-5 w-5"/>
                                        </span>
                                    </Link>

                                    <div className="relative">
                                        <button
                                            onClick={logout}
                                            title="Logout"
                                            className="[&>svg]:w-5 hidden-arrow flex items-center whitespace-nowrap transition duration-150 ease-in-out motion-reduce:transition-none"
                                            aria-expanded="false">
                                            <FaUserAlt className="text-white h-5 w-5"/>
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (

                            <>
                                <div className="relative flex items-center">
                                    <div className="mb-4 pt-2 pr-3 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
                                        <Link
                                            to="/login"
                                            className="text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                                            aria-current="page"
                                        >
                                            Login
                                        </Link>
                                    </div>
                                    <div className="mb-4 pt-2 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
                                        <Link
                                            to="/register"
                                            className="text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                                            aria-current="page"
                                        >
                                            Register
                                        </Link>
                                    </div>
                                </div>

                            </>
                        )}
                    </div>
                </div>

            </nav>
            <div className="container my-10 px-6 mx-auto">
                <section className="mb-32 text-gray-800 text-center pb-5">
                    <div className="flex justify-center">
                        {user && <div className="text-center mt-10 text-2xl italic">Hi {user.name} welcome back!</div>}
                    </div>
                    <Outlet />
                </section>
            </div>

        </>
    );
};

export default Nav;
