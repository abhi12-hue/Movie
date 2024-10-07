import { configureStore } from '@reduxjs/toolkit';
import tvreducer from './tvsSlice';
import personreduces from './personalSlice';
import moviereduce from './movieSlice';

export const store = configureStore({
    reducer: {
        movie:moviereduce,
        tv: tvreducer,
        person: personreduces ,
    }
});
