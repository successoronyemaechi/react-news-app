/**
 * @author Successor Onyemaechi <successoronyemaechi@gmail.com>
 */

import {BsFillBookmarkCheckFill} from "react-icons/bs";


export const ArticleCard = ({addToPreference = null, article}) => {
    const {
        author,
        title,
        url,
        description,
        urlToImage,
        publishedAt,
    } = article;

    const trimDescription = (description) => {
        if(description) {
            const words = description.split(' ');
            if (words.length > 17) {
                return words.slice(0, 17).join(' ') + '...';
            }
            return description;
        }
        return "";
    };

    const handleAddToPreference = () => {
        if (addToPreference) {
            addToPreference(article);
        }
    };

    return (
        <>
            <div className="mb-6 lg:mb-0" >
                <div className="relative block bg-white rounded-lg shadow-lg">
                    <div className="flex">
                        <div className="relative overflow-hidden bg-no-repeat bg-cover relative overflow-hidden bg-no-repeat bg-cover shadow-lg rounded-lg mx-4 -mt-4">
                            <img src={urlToImage} className="w-full" alt={title} />
                            {addToPreference &&
                                <div
                                    onClick={handleAddToPreference}
                                    className="z-10 text-white hover:cursor-pointer visited:cursor-pointer active:cursor-pointer absolute top-3 pl-3 left-72 bottom-0 left-0 w-full h-full overflow-hidden"><BsFillBookmarkCheckFill className="h-8 w-8"/>
                                </div>
                            }
                            <a href={url} target="_blank">
                                <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed opacity-0 hover:opacity-100 transition duration-300 ease-in-out" style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
                            </a>
                        </div>
                    </div>
                    <div className="p-6">
                        <h5 className="font-bold text-lg mb-3">{title}</h5>
                        <p className="text-gray-500 mb-4">
                            <small>Published <u>{publishedAt}</u> by <a href="" className="text-gray-900">{author ?? 'no author'}</a></small>
                        </p>
                        <p className="mb-4 pb-2 ">{trimDescription(description)}</p>
                        <a href={url} target="_blank" data-mdb-ripple="true" data-mdb-ripple-color="light" className="inline-block px-6 py-2.5 bg-indigo-900 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-indigo-950 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Read more</a>
                    </div>
                </div>
            </div>
        </>
    );
};

