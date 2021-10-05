import { configureStore } from '@reduxjs/toolkit';
import movieReducer from '../reducers/movieDataSlice';

export const store = configureStore({
  reducer: {
    movie: movieReducer,
  },
});
