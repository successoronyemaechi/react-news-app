
/**
 * @author Successor Onyemaechi <successoronyemaechi@gmail.com>
 */

import Loader from "../components/Loader";
import {useStateContext} from "../context/ContextProvider";

export default function NotFound() {
    const { isLoading } = useStateContext();

    if (isLoading) {
        return (
            <Loader/>
        );
    }

    return (
        <div>
            <h1>404 Page Not Found</h1>
        </div>
    )
}
