import { createSlice } from '@reduxjs/toolkit';

import * as MovieData from '../assets/data/moviedata.json';
import * as MovieGenres from '../assets/data/genres.json';

// Creation of movie derived data
const movieData = MovieData.default.slice();
const movieGenres = MovieGenres.default.slice();

const initialState = {
  value: movieData,
  genres: movieGenres,
  filter: null,
  genreFilter: null,
  yearFilter: null,
  favourites: []
};

export const movieDataSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    filterBy: (state, action) => {
      state.filter = action.payload;
    },
    filterByGenre: (state, action) => {
      state.genreFilter = action.payload;
    },
    filterByYear: (state, action) => {
      state.yearFilter = action.payload;
    },
    addFavourite: (state, action) => {
      const existsInArray = state.favourites.some(l => l.title === action.payload.title)
        if(!existsInArray) {
          state.favourites.push(action.payload);
        }
    }
  }
});

export const { filterBy, filterByGenre, filterByYear, addFavourite } = movieDataSlice.actions;

const retrieveMovies = (state) => state.movie.value;
const retrieveGenres = (state) => state.movie.genres;
const retrieveFilter = (state) => state.movie.filter;
const retrieveGenreFilter = (state) => state.movie.genreFilter;
const retrieveYearFilter = (state) => state.movie.yearFilter;
const retrieveFavourites = (state) => state.movie.favourites;

export {retrieveMovies, retrieveGenres, retrieveFilter, retrieveGenreFilter, retrieveYearFilter, retrieveFavourites};

export default movieDataSlice.reducer;
