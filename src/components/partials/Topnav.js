import React, { useEffect, useState } from 'react';
import axios from '../../utiles/axios';
import { Link } from 'react-router-dom';


const Topnav = () => {
    const [query, setQuery] = useState("");
    const [searchs, setSearches] = useState([]);  // Initialize as an empty array

    const GetSearch = async () => {
      if (!query.trim()) return; // Prevent empty queries from being searched
      try {
        const { data } = await axios.get(`/search/multi?query=${query}`);
        setSearches(data.results);
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(() => {
      if (query) {  // Only trigger API call when query is not empty
        GetSearch();
      } else {
        setSearches([]);  // Clear results when query is empty
      }
    }, [query]);

  return (
    <div className='w-full h-[10vh] relative flex mx-auto items-center pl-5'>
      <i className="text-3xl text-zinc-400 ri-search-line"></i>
      <input 
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        className='w-[50%] mx-10 p-5 text-xl outline-none border-none bg-transparent text-zinc-200'
        type="text"
        placeholder='Search Anything'
      />
      {query.length > 0 && (
        <i 
          onClick={() => setQuery("")}
          className="text-3xl text-zinc-400 ri-close-fill"
        ></i>
      )}

      {/* Only display search results when query is not empty and there are search results */}
      {query && searchs.length > 0 && (
        <div className='w-[50%] max-h-[50vh] absolute top-[90%] bg-zinc-200 left-[5%] overflow-auto'>
          {searchs.map((s, i) => (
            <Link to={`/${s.media_type}/details/${s.id}`}
              key={i} 
              className="text-zinc-600 font-semibold hover:text-black hover:bg-zinc-300 duration-300 inline-block w-[100%] p-10 flex justify-start items-center border-b-2 border-zinc-100"
             
            >
              <img 
                src={s.poster_path ? `https://image.tmdb.org/t/p/w200${s.poster_path}` : 'noImage.png'} 
                className="w-10 h-10 object-cover mr-4"
              />
              <span>{s.name || s.title || s.original_title || s.original_name}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
export default Topnav;
