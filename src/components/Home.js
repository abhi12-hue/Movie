import React, { useEffect, useState } from 'react';
import Sidenav from './partials/Sidenav';
import Topnav from './partials/Topnav';
import Header from './partials/Header';
import axios from '../utiles/axios';
import Horizontal from './partials/Horizontal';
import Dropdown from './partials/Dropdown';
import Loading from './Loading';
//import Loading from './Loading';

const Home = () => {
    document.title = "Database || Homepage";
    
    const [wallpaper, setWallpaper] = useState(null);
    const [trending, setTrending] = useState(null);
    const [category, setCategory] = useState("all");

    // Fetch random wallpaper data
    const GetHandler = async () => {
      try {
        const { data } = await axios.get(`/trending/all/day`);
        let randomData = data.results[Math.floor(Math.random() * data.results.length)];
        setWallpaper(randomData);
      } catch (error) {
        console.log(error);
      }
    };

    // Fetch trending based on category
    const GetTrending = async () => {
      try {
        const { data } = await axios.get(`/trending/${category}/day`);
        setTrending(data.results);
      } catch (error) {
        console.log(error);
      }
    };

    // Use effect to call API on component mount and category change
    useEffect(() => {
      if (!wallpaper) {
        GetHandler();
      }
      GetTrending();
    }, [category]); // Add 'category' to dependency array to trigger re-fetch on change

    return wallpaper && trending ? ( 
        <>
            <Sidenav />
            <div className='w-[80%] h-full overflow-auto overflow-x-hidden'>
                <Topnav />
                <Header data={wallpaper} />
                
                <div className='my-5 p-2 flex justify-between mt-5'>
                    <h1 className='text-3xl font-semibold text-zinc-400 '>
                        Trending
                    </h1>
                    {/* Dropdown updated with correct func prop */}
                    <Dropdown 
                        title="filter" 
                        options={["tv", "movie", "all"]} 
                        func={(e) => setCategory(e.target.value)} 
                    />
                </div>
                
                {/* Horizontal component to display trending items */}
                <Horizontal data={trending} />
            </div>
        </>
    ) : (<Loading />
    );
};

export default Home;
