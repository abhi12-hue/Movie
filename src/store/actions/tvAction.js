import axios from '../../utiles/axios';
import { loadtv } from '../reducers/tvsSlice';
export {removetv} from '../reducers/tvsSlice'

// Action to asynchronously load movie details
export const asyncloadtv = (id) => async (dispatch, getState) => {
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
      axios.get(`/tv/${id}`),
      axios.get(`/tv/${id}/external_ids`),
      axios.get(`/tv/${id}/recommendations`),
      axios.get(`/tv/${id}/similar`),
      axios.get(`/tv/${id}/videos`),
      axios.get(`/tv/${id}/watch/providers`)
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
    dispatch(loadtv(theultimatedetails));
  } catch (error) {
    console.error('Error loading movie details:', error);
  }
};
