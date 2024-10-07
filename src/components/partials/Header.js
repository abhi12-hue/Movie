import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ data }) => {
  if (!data) return null; // Return null if no data is available

  const imageUrl = data.backdrop_path 
    ? `https://image.tmdb.org/t/p/w500${data.backdrop_path}`
    : `https://image.tmdb.org/t/p/w500${data.profile_path}`;

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center', 
      }}
      className='w-full h-[50vh] flex flex-col justify-end items-start p-[5%]'>
        <h1 className='text-5xl font-black text-white w-[70%]'>{data.name || data.title || data.original_title || 
        data.original_name}</h1>

        <p className='w-[70%] text-white mt-3'>{data.overview.slice(0,200)}....<Link to={`${data.media_type}/details/${data.id}`} className="text-blue-400">
        more</Link></p>
        <p className='text-white' >
        <i class=" text-yellow-500 ri-megaphone-fill"></i>{data.release_date || "No Data Aviable"}
        <i class="ml-5 text-yellow-500 ri-disc-fill"></i>{data.media_type.toUpperCase()}
        </p>
        <Link className='bg-[#6556CD] p-4 rounded text-white font-semibold mt-5'>Watch Tv
        </Link>
    </div>
  );
};

export default Header;
