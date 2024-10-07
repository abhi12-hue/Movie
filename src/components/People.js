import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Topnav from './partials/Topnav';
import Dropdown from './partials/Dropdown';
import axios from '../utiles/axios';
import Cards from './partials/Cards';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from './Loading';

const People = () => {
  document.title = "Popular People"; // Set the page title to "Popular People"
  
  const navigate = useNavigate();
  const [category, setCategory] = useState("popular"); // Default category for people
  const [people, setPeople] = useState([]); // Changed to people to reflect popular people content
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const GetPeople = async () => {
    try {
      const { data } = await axios.get(`/person/${category}`, {
        params: { page }
      });
      setPeople((prevState) => [...prevState, ...data.results]);
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
    setPeople([]); // Reset people data when category changes
    setPage(1);      // Reset page to 1
    setHasMore(true); // Reset the "has more" state
    GetPeople();    // Fetch new data
  }, [category]);

  return people.length ? (
    <div className='w-screen h-screen'>
      <div className='w-full flex items-center px-[5%]'>
        <h1 className='w-[20%] text-2xl text-zinc-400 font-semibold'>
          <i
            onClick={() => navigate(-1)} 
            className="text-[#6556CD] ri-arrow-left-line cursor-pointer">
          </i> 
          Popular People
        </h1>
        <Topnav />
        <Dropdown 
          title="Category" 
          options={["popular"]} // For people, "popular" is the main category
          func={(e) => setCategory(e.target.value)} 
        />
      </div>
      
      <InfiniteScroll
        dataLength={people.length}
        next={GetPeople}
        hasMore={hasMore} // Dynamically set based on data
        loader= {<Loading />}
      >
        <Cards data={people} title="people" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default People;
