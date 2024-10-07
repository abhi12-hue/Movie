import React from 'react';
import { Link } from 'react-router-dom';
import Dropdown from './Dropdown';

const Horizontal = ({ data }) => {

    return (
      
            <div className='w-full flex overflow-y-hidden h-[40vh]  p-5 overflow-hidden overflow-y-auto'>
                {data.map((d, i) => (
                    <Link to={`/${d.media_type}/details/${d.id}`} key={i} className='min-w-[15%] h-full mr-5 bg-zinc-900  mb-5'>
                        <img className='w-full  object-cover '
                            src={d.backdrop_path
                                ? `https://image.tmdb.org/t/p/w500${d.backdrop_path}`
                                : `https://image.tmdb.org/t/p/w500${d.profile_path}`}
                            alt={d.name || d.title || d.original_title || d.original_name}
                        />
                        <div className='text-white p-3 h-[55%]'>
                            <h1 className='text-xl font-semibold  w-[70%]'>
                                {d.name || d.title || d.original_title || d.original_name}
                            </h1>

                            <p className='text-white mt-3'>
                                {d.overview.slice(0, 50)}...
                                <Link to="/" className="text-zinc-500">more</Link>
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
    );
};

export default Horizontal;
