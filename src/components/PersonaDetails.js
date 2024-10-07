import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { asyncloadperson } from '../store/actions/peopleAction';
import { removeperson } from '../store/reducers/personalSlice';
import Loading from './Loading';
import Horizontal from './partials/Horizontal'; // Assuming Horizontal is used for displaying credits

const Moviedetails = () => {
  const { info } = useSelector((state) => state.person); // Accessing person details from Redux
  const { id } = useParams(); // Fetching the ID from route parameters
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(asyncloadperson(id)); // Load person details on mount
    }

    return () => {
      dispatch(removeperson()); // Cleanup on unmount
    };
  }, [dispatch, id]);

  if (!info || !info.detail) {
    return <Loading />; // Display loading if info is not yet available
  }

  // Construct the profile or backdrop image URL
  const imageUrl = info.detail.profile_path
    ? `https://image.tmdb.org/t/p/original/${info.detail.profile_path}`
    : `https://image.tmdb.org/t/p/original/${info.detail.backdrop_path}` || 'https://via.placeholder.com/500';

  // Social Media Links
  const { externalid } = info;
  const twitterUrl = externalid?.twitter_id ? `https://twitter.com/${externalid.twitter_id}` : null;
  const instagramUrl = externalid?.instagram_id ? `https://instagram.com/${externalid.instagram_id}` : null;
  const facebookUrl = externalid?.facebook_id ? `https://facebook.com/${externalid.facebook_id}` : null;

  // Render credits (movies and TV shows) horizontally
  const movieCredits = info.combinedCredit?.cast?.filter((credit) => credit.media_type === 'movie') || [];
  const tvCredits = info.combinedCredit?.cast?.filter((credit) => credit.media_type === 'tv') || [];

  return (
    <div className='px-[10%] w-screen text-white h-full'>
      <div className='flex flex-row w-full justify-between items-start mt-6'>
        {/* Person Profile Image on Left */}
        <div className='w-1/3'>
          <img
            className='shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] rounded-md w-full h-[60vh] object-cover'
            src={imageUrl}
            alt={info.detail.name}
          />
        </div>

        {/* Details on Right */}
        <div className='w-2/3 ml-8'>
          {/* Person Name */}
          <h1 className='text-4xl font-extrabold text-white'>{info.detail.name}</h1>

          {/* Person Biography */}
          <p className='mt-4 text-gray-300 text-lg leading-relaxed'>
            {info.detail.biography || 'Biography not available.'}
          </p>

          {/* Social Media Links */}
          <div className='flex mt-6 space-x-4'>
            {twitterUrl && (
              <a href={twitterUrl} target='_blank' rel='noopener noreferrer'>
                <i className='ri-twitter-line text-blue-400 text-3xl hover:text-blue-500 transition duration-300'></i>
              </a>
            )}
            {instagramUrl && (
              <a href={instagramUrl} target='_blank' rel='noopener noreferrer'>
                <i className='ri-instagram-line text-pink-500 text-3xl hover:text-pink-600 transition duration-300'></i>
              </a>
            )}
            {facebookUrl && (
              <a href={facebookUrl} target='_blank' rel='noopener noreferrer'>
                <i className='ri-facebook-box-fill text-blue-600 text-3xl hover:text-blue-700 transition duration-300'></i>
              </a>
            )}
          </div>

          <div className='w-full flex justify-between h-full bg-zinc-400'>
            <Horizontal data ={info.combinedCredit.cast}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Moviedetails;
