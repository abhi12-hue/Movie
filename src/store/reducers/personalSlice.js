import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState ={
   info : null ,
}

export const personalSlice = createSlice({
    name:"movie",
    initialState,
    reducers: {
        loadperson : (state , action) =>{
            state.info = action.payload;
        },
        removeperson : (state , action) =>{
            state.info = null;
        },

    },
});

export const {loadperson , removeperson} = personalSlice.actions;
export default personalSlice.reducer;


