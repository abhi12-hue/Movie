import React from 'react';
import { Link } from 'react-router-dom';

const Cards = ({ data , title }) => {
  return (
    <div className='flex flex-wrap justify-center w-full px-[5%] bg-[#1F1E24]'>
      {data.map((c, i) => (
        <Link 
          to={`/${c.media_type||title}/details/${c.id}`}
          className='w-[25vh] mr-[5%] mb-[5%] object-cover mx-auto' 
          key={i}
        >
          <img 
            className='w-[25vh] h-[40vh] object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)]'
            src={c.backdrop_path 
              ? `https://image.tmdb.org/t/p/w500${c.backdrop_path}` 
              : `https://image.tmdb.org/t/p/w500${c.profile_path}`}
            alt={c.name || c.title || c.original_title || c.original_name} 
          />
          <h1 className='text-2xl text-zinc-400 text-center mt-3 font-semibold'>
            {c.name || c.title || c.original_title || c.original_name}
          </h1>
        </Link>
      ))}
    </div>
  );
};

export default Cards; 