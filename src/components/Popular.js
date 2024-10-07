import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Topnav from './partials/Topnav';
import Dropdown from './partials/Dropdown';
import axios from '../utiles/axios';
import Cards from './partials/Cards';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from './Loading';

const Popular = () => {
    document.title ="Popular";
  const navigate = useNavigate();
  const [category, setCategory] = useState("movie");
  const [popular, setPopular] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const Getpopular = async () => {
    try {
      const { data } = await axios.get(`${category}/popular`, {
        params: { page }
      });
      setPopular((prevState) => [...prevState, ...data.results]); // Correct function call
      setPage((prevPage) => prevPage + 1);

      // Check if we should stop loading more data
      if (data.results.length === 0 || data.results.length < 20) {
        setHasMore(false); // No more data to load
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setPopular([]); // Reset popular data when category changes
    setPage(1);      // Reset page to 1
    setHasMore(true); // Reset the "has more" state
    Getpopular();    // Fetch new data
  }, [category]);

  return popular.length ? (
    <div className='w-screen h-screen'>
      <div className='w-full flex items-center px-[5%]'>
        <h1 className='w-[20%] text-2xl text-zinc-400 font-semibold'>
          <i
            onClick={() => navigate(-1)} 
            className="text-[#6556CD] ri-arrow-left-line cursor-pointer">
          </i> 
          Popular
        </h1>
        <Topnav />
        <Dropdown 
          title="Category" 
          options={[ "tv", "all"]} // Corrected category options
          func={(e) => setCategory(e.target.value)} 
        />
      </div>
      
      <InfiniteScroll
        dataLength={popular.length}
        next={Getpopular} // Corrected function call
        hasMore={hasMore} // Dynamically set based on data
        loader= {<Loading/>}
      >
        <Cards data={popular} title={category} /> {/* Using popular here */}
      </InfiniteScroll>
    </div>
  ) : (
    <Loading/>
  );
};

export default Popular;
