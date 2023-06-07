
/**
 * @author Successor Onyemaechi <successoronyemaechi@gmail.com>
 */

import Filter from "../components/Filter";
import GetArticles from "../components/GetArticles";


const Home = () => {


  return (
      <>
          <h2 className="text-3xl font-bold mb-5 pb-4 text-center">Filter</h2>
          <Filter/>
          <GetArticles/>

      </>
  );
};

export default Home;
