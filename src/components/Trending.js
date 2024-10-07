import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Topnav from './partials/Topnav';
import Dropdown from './partials/Dropdown';
import axios from '../utiles/axios';
import Cards from './partials/Cards';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from './Loading';

const Trending = () => {
    document.title ="Trending";
  const navigate = useNavigate();
  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("day");
  const [trending, setTrending] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/${duration}`, {
        params: { page }
      });
      setTrending((prevState) => [...prevState, ...data.results]);
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
    setTrending([]); // Reset trending data when category or duration changes
    setPage(1);      // Reset page to 1
    setHasMore(true); // Reset the "has more" state
    GetTrending();    // Fetch new data
  }, [category, duration]);

  return trending.length ? (
    <div className='w-screen h-screen'>
      <div className='w-full flex items-center px-[5%]'>
        <h1 className='w-[20%] text-2xl text-zinc-400 font-semibold'>
          <i
            onClick={() => navigate(-1)} 
            className="text-[#6556CD] ri-arrow-left-line cursor-pointer">
          </i> 
          Trending
        </h1>
        <Topnav />
        <Dropdown 
          title="Category" 
          options={["movie", "tv", "all"]} // Corrected category options
          func={(e) => setCategory(e.target.value)} 
        />
        <div className='w-[2%]'></div>
        <Dropdown 
          title="Duration" 
          options={["day", "week"]} // Corrected duration options
          func={(e) => setDuration(e.target.value)} 
        />
      </div>
      
      <InfiniteScroll
        dataLength={trending.length}
        next={GetTrending}
        hasMore={hasMore} // Dynamically set based on data
        loader= {<Loading/>}
      >
        <Cards data={trending} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading/>
  );
};

export default Trending;
