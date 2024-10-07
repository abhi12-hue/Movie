import axios from "../../utiles/axios";
import { loadperson } from "../reducers/personalSlice";

// Asynchronous action to fetch person details including external ids and credits
export const asyncloadperson = (id) => async (dispatch) => {
  try {
    // Fetch all necessary data in parallel
    const [detail, externalid, combinedCredit] = await Promise.all([
      axios.get(`/person/${id}`), // Person details (bio, name, etc.)
      axios.get(`/person/${id}/external_ids`), // External ids (social media, IMDb, etc.)
      axios.get(`/person/${id}/combined_credits`), // Combined credits for both movies and TV
    ]);

    // Combine all fetched details into one structured object
    const theultimatedetails = {
      detail: detail.data,
      externalid: externalid.data,
      combinedCredit: combinedCredit.data, // Contains both TV and movie credits
    };

   
    // Dispatch the action to load person details into the Redux store
    dispatch(loadperson(theultimatedetails));
  } catch (error) {
    console.log("Error loading person details:", error);
  }
};
