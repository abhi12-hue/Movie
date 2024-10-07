import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { asyncloadtv, removetv } from '../store/actions/tvAction';
import Loading from './Loading';

const Tvdetails = () => {
  const { info, recommendations, videos } = useSelector((state) => state.tv);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(asyncloadtv(id));
    }

    return () => {
      dispatch(removetv());
    };
  }, [dispatch, id]);

  if (!info || !info.details) {
    return <Loading />;
  }

  const imageUrl = info.details.backdrop_path
    ? `https://image.tmdb.org/t/p/w500${info.details.backdrop_path}`
    : 'https://via.placeholder.com/500';

  const wikipediaUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(info.details.name)}`;

  const trailer = videos?.find(
    (video) => video.type === 'Trailer' && video.site === 'YouTube'
  );

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.9)), url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className="min-h-screen w-full text-white flex flex-col justify-between px-6 md:px-16 py-8 animate-fade-in"
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
        {info.details.name && (
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

      {/* TV Details */}
      <div className="flex flex-col md:flex-row gap-10 h-full">
        {/* Poster Section */}
        <div className="w-full md:w-[30%] flex flex-col items-center">
          <img
            className="w-[300px] h-[450px] md:w-[350px] md:h-[500px] object-cover h-full rounded-md shadow-lg transition-transform hover:scale-105"
            src={info.details.poster_path
              ? `https://image.tmdb.org/t/p/w500${info.details.poster_path}`
              : imageUrl}
            alt={info.details.name}
          />
          <div className="mt-6 text-lg text-center space-y-2">
            <span className="text-[#1E90FF] font-semibold">
              {info.details.first_air_date}
            </span>
            <span className="mx-2">•</span>
            <span>{info.details.number_of_seasons} seasons</span>
            <span className="mx-2">•</span>
            <span className="text-[#FFD700] font-semibold">{info.details.vote_average} ⭐</span>
          </div>
          <div className="flex gap-2 mt-4 justify-center">
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
          <h1 className="text-3xl md:text-4xl font-bold tracking-wide animate-fade-up">
            {info.details.name}
          </h1>
          <div className="text-lg leading-relaxed animate-fade-up delay-100">
            <h2 className="text-2xl font-semibold mb-3">Overview</h2>
            <p>{info.details.overview}</p>
          </div>
          {info.details.tagline && (
            <div className="text-lg italic text-gray-300 animate-fade-up delay-200">
              "{info.details.tagline}"
            </div>
          )}
          <div className="text-sm text-gray-400 animate-fade-up delay-300">
            <span className="font-semibold">Status:</span> {info.details.status}
          </div>

          {trailer && (
            <div className="mt-4">
              <a
                href={`https://www.youtube.com/watch?v=${trailer.key}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300 hover:bg-blue-500"
              >
                Watch Trailer
              </a>
            </div>
          )}

          {/* Horizontal Seasons Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Seasons</h2>
            {info.details.seasons && info.details.seasons.length > 0 ? (
              <div className="flex gap-4 overflow-x-scroll">
                {info.details.seasons.map((season) => (
                  <div
                    key={season.id}
                    className="bg-gray-800 p-4 rounded-md shadow-md flex-none w-[200px]"
                  >
                    <img
                      src={season.poster_path
                        ? `https://image.tmdb.org/t/p/w200${season.poster_path}`
                        : 'https://via.placeholder.com/150'}
                      alt={season.name}
                      className="w-full h-[300px] object-cover rounded-md mb-2"
                    />
                    <h3 className="text-lg font-semibold truncate">
                      {season.name}
                    </h3>
                    <p className="text-sm">{season.episode_count} episodes</p>
                    <p className="text-sm text-gray-400">
                      Aired: {season.air_date}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No season information available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tvdetails;
