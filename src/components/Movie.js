import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Topnav from './partials/Topnav';
import Dropdown from './partials/Dropdown';
import axios from '../utiles/axios';
import Cards from './partials/Cards';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from './Loading';

const Movie = () => {
  document.title = "Movie";
  const navigate = useNavigate();
  const [category, setCategory] = useState("now_playing");
  const [movies, setMovies] = useState([]); // Corrected state to movies
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const GetMovie = async () => {
    try {
      const { data } = await axios.get(`/movie/${category}`, { // Corrected endpoint
        params: { page }
      });
      setMovies((prevState) => [...prevState, ...data.results]); // Corrected state update
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
    setMovies([]); // Reset movie data when category changes
    setPage(1);    // Reset page to 1
    setHasMore(true); // Reset the "has more" state
    GetMovie();    // Fetch new data
  }, [category]);

  return movies.length ? (
    <div className='w-screen h-screen'>
      <div className='w-full flex items-center px-[5%]'>
        <h1 className='w-[20%] text-2xl text-zinc-400 font-semibold'>
          <i
            onClick={() => navigate(-1)} 
            className="text-[#6556CD] ri-arrow-left-line cursor-pointer">
          </i> 
          Movies
        </h1>
        <Topnav />
        <Dropdown 
          title="Category" 
          options={["now_playing", "upcoming", "top_rated"]} // Corrected category options for movies
          func={(e) => setCategory(e.target.value)} 
        />
      </div>
      
      <InfiniteScroll
        dataLength={movies.length} // Corrected to use movies state
        next={GetMovie} // Corrected function call
        hasMore={hasMore} // Dynamically set based on data
        loader= {<Loading/>}
      >
        <Cards data={movies} title="movie" /> {/* Using movies data here */}
      </InfiniteScroll>
    </div>
  ) : (
    <Loading/>
  );
};

export default Movie;
