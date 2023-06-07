

/**
 * @author Successor Onyemaechi <successoronyemaechi@gmail.com>
 */
import {Oval} from "react-loader-spinner";

const Loader = () => {
    return (
        <div className="container mx-auto">
            <div className="flex flex-wrap">
                <div className="w-full px-4">
                    <div
                        className="
                            flex
                            justify-center
                              relative
                              overflow-hidden
                              rounded-lg
                              py-16
                              px-10
                              text-center
                              sm:px-12
                              md:px-[60px]
                            "
                    >
                        <div className="mb-10  md:mb-16">
                            <Oval
                                height={80}
                                width={80}
                                color="#312E81"
                                wrapperStyle={{}}
                                wrapperClass="text-center"
                                visible={true}
                                ariaLabel='oval-loading'
                                secondaryColor="#312E80"
                                strokeWidth={2}
                                strokeWidthSecondary={2}

                            /></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loader;