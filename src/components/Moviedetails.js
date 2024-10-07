import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { asyncloadmovie } from '../store/actions/movieAction';
import { removemovie } from '../store/reducers/movieSlice';
import Loading from './Loading';
import Horizontal from './partials/Horizontal';

const Moviedetails = () => {
  const { info, recommendations, videos } = useSelector((state) => state.movie);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(asyncloadmovie(id));
    }

    return () => {
      dispatch(removemovie());
    };
  }, [dispatch, id]);

  if (!info || !info.details) {
    return <Loading />;
  }

  const imageUrl = info.details.backdrop_path
    ? `https://image.tmdb.org/t/p/w500${info.details.backdrop_path}`
    : 'https://via.placeholder.com/500';

  const wikipediaUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(info.details.title)}`;

  const trailer = videos?.results?.find(
    (video) => video.type === 'Trailer' && video.site === 'YouTube'
  );

  const recommendationTrailers = videos?.results?.map((video) => ({
    movieId: video.id,
    ...video
  }));

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.9)), url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className="min-h-screen w-full text-white flex flex-col justify-between px-4 sm:px-6 md:px-12 lg:px-16 py-8 animate-fade-in"
    >
      {/* Navigation */}
      <nav className="flex gap-4 md:gap-6 text-lg items-center mb-8">
        <Link
          onClick={() => navigate(-1)}
          className="text-white hover:opacity-80 cursor-pointer"
        >
          <i className="ri-arrow-left-line text-2xl"></i>
        </Link>
        {info.details.homepage && (
          <a
            className="hover:opacity-80"
            target="_blank"
            rel="noopener noreferrer"
            href={info.details.homepage}
          >
            <i className="ri-external-link-line text-2xl"></i>
          </a>
        )}
        {info.details.title && (
          <a
            className="hover:opacity-80"
            target="_blank"
            rel="noopener noreferrer"
            href={wikipediaUrl}
          >
            <i className="ri-global-fill text-2xl"></i>
          </a>
        )}
        {info.details.imdb_id && (
          <a
            className="hover:opacity-80"
            target="_blank"
            rel="noopener noreferrer"
            href={`https://www.imdb.com/title/${info.details.imdb_id}`}
          >
            IMDB
          </a>
        )}
      </nav>

      {/* Movie Details */}
      <div className="flex flex-col md:flex-row gap-10">
        {/* Poster Section */}
        <div className="w-full md:w-[30%] flex flex-col items-center">
          <img
            className="w-[250px] h-[350px] sm:w-[280px] sm:h-[400px] md:w-[350px] md:h-[500px] object-cover rounded-md shadow-lg transition-transform hover:scale-105"
            src={info.details.poster_path
              ? `https://image.tmdb.org/t/p/w500${info.details.poster_path}`
              : info.details.backdrop_path
              ? `https://image.tmdb.org/t/p/w500${info.details.backdrop_path}`
              : 'https://via.placeholder.com/350x500'}
            alt={info.details.title}
          />
          <div className="mt-6 text-lg text-center space-y-2">
            <span className="text-[#1E90FF] font-semibold">
              {info.details.release_date}
            </span>
            <span className="mx-2">•</span>
            <span>{info.details.runtime} mins</span>
            <span className="mx-2">•</span>
            <span className="text-[#FFD700] font-semibold">{info.details.vote_average} ⭐</span>
            {info.details.budget && (
              <>
                <span className="mx-2">•</span>
                <span className="text-[#FFD700] font-semibold">Budget: ${info.details.budget.toLocaleString()}</span>
              </>
            )}
            {info.details.price && (
              <>
                <span className="mx-2">•</span>
                <span className="text-[#FFD700] font-semibold">Price: ${info.details.price.toLocaleString()}</span>
              </>
            )}
          </div>
          <div className="flex gap-2 mt-4 justify-center flex-wrap">
            {info.details.genres && info.details.genres.map((genre) => (
              <span
                key={genre.id}
                className="px-3 py-1 bg-gray-800 rounded-md text-sm"
              >
                {genre.name}
              </span>
            ))}
          </div>
        </div>

        {/* Overview & More Info */}
        <div className="w-full md:w-[70%] space-y-6 md:space-y-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide animate-fade-up">
            {info.details.title}
          </h1>
          <div className="text-base sm:text-lg leading-relaxed animate-fade-up delay-100">
            <h2 className="text-xl sm:text-2xl font-semibold mb-3">Overview</h2>
            <p>{info.details.overview}</p>
          </div>
          {info.details.tagline && (
            <div className="text-base sm:text-lg italic text-gray-300 animate-fade-up delay-200">
              "{info.details.tagline}"
            </div>
          )}
          <div className="text-sm text-gray-400 animate-fade-up delay-300">
            <span className="font-semibold">Status:</span> {info.details.status}
          </div>

          <div className="mt-4">
            <a
              href={"/#"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300 hover:bg-blue-500"
            >
              Watch Trailer
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Moviedetails;
