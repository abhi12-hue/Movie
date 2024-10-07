
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import Trending from '../Trending';


const Sidenav = () => {

  return (
    <>
      <div className='w-[20%] h-full  border border-zinc-400 p-10'>
        <h1 className='text-2xl text-white font-bold'>
          <i class=" text-[#6556CD]  ri-tv-fill mr-3"></i>
          <span className='text-2xl '>Database</span>
        </h1>
        <nav className='flex flex-col text-zinc-400 text-xl g-3'>
          <h1 className='text-white font-semibold text-xl mt-10 mb-5 '>New Feeds</h1>
          <Link to={"/trending"} className='hover:bg-[#6556CD]  hover:text-white duration-300 rounded-lg  p-5 '> <i class=" mr-2 ri-fire-fill"></i>Trending</Link>
          <Link to={"/popular"} className='hover:bg-[#6556CD]  hover:text-white duration-300 rounded-lg  p-5 '> <i class=" mr-2 ri-bard-fill"></i>Popular</Link>
          <Link to={"/movie"} className='hover:bg-[#6556CD]  hover:text-white duration-300 rounded-lg  p-5 '> <i class=" mr-2 ri-movie-2-fill"></i>Movies</Link>
          <Link to={"/tvshows"} className='hover:bg-[#6556CD]  hover:text-white duration-300 rounded-lg  p-5 '> <i class=" mr-2 ri-tv-fill"></i>Tv Shows</Link>
          <Link to={"/people"} className='hover:bg-[#6556CD]  hover:text-white duration-300 rounded-lg  p-5 '> <i class=" mr-2 ri-team-fill"></i>Peoples</Link>
        </nav>
        <hr className='border-none h-[1px] bg-zinc-400 mt-2'/>
        <nav className='flex flex-col text-zinc-400 text-xl g-3'>
          <h1 className='text-white font-semibold text-xl mt-10 mb-5 '>Website Information</h1>
          <Link className='hover:bg-[#6556CD]  hover:text-white duration-300 rounded-lg  p-5 '> <i class=" mr-2 ri-phone-fill"></i> Contact Us</Link>
          <Link className='hover:bg-[#6556CD]  hover:text-white duration-300 rounded-lg  p-5 '><i class=" mr-2 ri-information-2-fill"></i>About Us</Link>
        </nav>
      </div>
    </>
  )
}

export default Sidenav;
