import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Topnav from './partials/Topnav';
import Dropdown from './partials/Dropdown';
import axios from '../utiles/axios';
import Cards from './partials/Cards';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from './Loading';

const TvShows = () => {
  document.title = "TV Shows"; // Set the page title to "TV Shows"
  
  const navigate = useNavigate();
  const [category, setCategory] = useState("popular"); // TV show category (e.g., popular, top_rated, etc.)
  const [tvShows, setTvShows] = useState([]); // Changed to tvShows to reflect TV content
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const GetTvShows = async () => {
    try {
      const { data } = await axios.get(`/tv/${category}`, {
        params: { page }
      });
      setTvShows((prevState) => [...prevState, ...data.results]);
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
    setTvShows([]); // Reset TV shows data when category changes
    setPage(1);      // Reset page to 1
    setHasMore(true); // Reset the "has more" state
    GetTvShows();    // Fetch new data
  }, [category]);

  return tvShows.length ? (
    <div className='w-screen h-screen overflow-auto'>
      <div className='w-full flex flex-col md:flex-row items-center p-5'>
        <h1 className='text-2xl text-zinc-400 font-semibold flex items-center mb-4 md:mb-0'>
          <i
            onClick={() => navigate(-1)} 
            className="text-[#6556CD] ri-arrow-left-line cursor-pointer mr-2">
          </i> 
          TV Shows
        </h1>
        <Topnav />
        <Dropdown 
          title="Category" 
          options={["popular", "top_rated", "airing_today", "on_the_air"]} // TV show category options
          func={(e) => setCategory(e.target.value)} 
          className='mt-4 md:mt-0 md:ml-4' // Responsive margin for Dropdown
        />
      </div>
      
      <InfiniteScroll
        dataLength={tvShows.length}
        next={GetTvShows}
        hasMore={hasMore} // Dynamically set based on data
        loader={<Loading />}
        className="flex flex-wrap justify-center" // Flex for responsive cards
      >
        <Cards data={tvShows} title="tv" /> {/* Using TV shows data here */}
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default TvShows;
