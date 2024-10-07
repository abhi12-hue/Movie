import axios from '../../utiles/axios';
import { loadmovie } from '../reducers/movieSlice';

// Action to asynchronously load movie details
export const asyncloadmovie = (id) => async (dispatch, getState) => {
  try {
    // Fetch all the data in parallel
    const [
      detail,
      externalid,
      recommendations,
      similar,
      videos,
      watchproviders
    ] = await Promise.all([
      axios.get(`/movie/${id}`),
      axios.get(`/movie/${id}/external_ids`),
      axios.get(`/movie/${id}/recommendations`),
      axios.get(`/movie/${id}/similar`),
      axios.get(`/movie/${id}/videos`),
      axios.get(`/movie/${id}/watch/providers`)
    ]);

    // Combine all the fetched data
    const theultimatedetails = {
      details: detail.data,
      externalid: externalid.data,
      recommendations: recommendations.data.results,
      similar: similar.data.results,
      videos: videos.data.results.filter((video) => video.type === 'Trailer'),
      watchproviders: watchproviders.data.results.IN, // or dynamically handle country if needed
    };

    // Dispatch the result to Redux store
    dispatch(loadmovie(theultimatedetails));
  } catch (error) {
    console.error('Error loading movie details:', error);
  }
};
