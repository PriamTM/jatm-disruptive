import React, { Component } from 'react';
import '../index.scss';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import { useSelector, useDispatch } from 'react-redux';
import { 
  retrieveMovies,
  retrieveFilter,
  retrieveGenreFilter,
  retrieveYearFilter,
  retrieveGenres,
  filterByGenre,
  filterByYear,
  addFavourite 
} from '../reducers/movieDataSlice';

import { Box, TextField, Grid, CardContent, Typography, Card, Select, MenuItem, IconButton } from '@mui/material';
import Slider from "react-slick";
import ImageOne from '../assets/movie_poster2.jpg';
import ImageTwo from '../assets/movie_poster.jpg';
import { FavoriteBorder } from '@material-ui/icons';

function MovieCard(props) {
  const dispatch = useDispatch();
  // A static, all-purpose movie poster is defined, since media-imdb disallows FE to use their bandwidth, otherwise 
  // backgroundImage: `url(${movie.info.image_url})` would be used
  let img = ImageOne;
  if (props.movie.info.rank % 2 === 1) {
    img = ImageTwo;
  }
  return (
    <>
          <Card
            className="movie-card"
            square elevation={0}
            style={{
              backgroundImage: `url(${img})`
            }}
          >
            <CardContent className="movie-card-content">
              <Typography className="movie-card-title">
                  {props.movie.title}
              </Typography>
              <Typography>
                  {props.movie.year}
              </Typography>
              <Box className="movie-card-favourite">
                <IconButton>
                  <FavoriteBorder
                    onClick={(event) => dispatch(addFavourite(props.movie))}></FavoriteBorder>
                </IconButton>
              </Box>
            </CardContent>
          </Card>
    </>
  )
}

function GenreSelect(props) {
  const genreList = useSelector(retrieveGenres).slice();
  const dispatch = useDispatch();
  
  return (
    <>
      <Typography className="filter-select-text">Genre:</Typography>
        <Select
          className="filter-select"
          label="Genre"
          variant={"standard"}
          placeholder="Genre"
          onChange={(value) => dispatch(filterByGenre(value.target.value))}
        >
          {genreList.map((genre) => 
            <MenuItem value={genre} key={genre}>{genre}</MenuItem>
          )}
        </Select>
    </>
  )
}

function YearSelect(props) {
  const dispatch = useDispatch();
  
  return (
    <>
      <Typography className="filter-select-text">Year:</Typography>
      <TextField
        className="filter-input"
        variant="standard" 
        onChange={(value) => dispatch(filterByYear(value.target.value))}  
      />
    </>
  )
}

function RetrieveMovies(props) {
  // Relevant info instatiation; movieList = list of movie data, filter = selected name filter to search for,
  // genre filter = selected genre filter to search for. Slice is used to ensure immutability.
  const movieList = useSelector(retrieveMovies).slice();
  const filter = useSelector(retrieveFilter);
  const genreFilter = useSelector(retrieveGenreFilter);
  const yearFilter = useSelector(retrieveYearFilter);
  let modifiedList = movieList.slice();
  let matchedItems = [];
  // Genre filtering, first: iteration by movie element, second: iteration by the movies genres are compared to the selected genre filter
  if (yearFilter && yearFilter !== 0 && yearFilter.length > 3) {
    const lf = parseInt(yearFilter);
    modifiedList = modifiedList.filter((e) => e.year === lf);
  }
  if (genreFilter !== 'Any' && genreFilter) {
    const lf = genreFilter.toLowerCase();
    modifiedList.forEach((e) => {
      if (e.info.genres) {
        const match = e.info.genres.find(b => b.toLowerCase() === lf)
        if (match) {
          matchedItems.push(e)
        }
      }
    })
    modifiedList = matchedItems.slice();
  }
  if (filter) {
    const lf = filter.toLowerCase();
    modifiedList = modifiedList.filter((e) => e.title.toLowerCase().includes(lf));
  }

  // Limit to 50 movies in array for performance reasons
  modifiedList = modifiedList.slice(0, 50);

  return (
    <Slider
      className="movie-carousel"
      dots={false}
      speed={150}
      infinte={false}
      slidesToShow={3}
      slidesToScroll={1}
    >
      {
        modifiedList.map((movie, id) =>
          <MovieCard movie={movie} key={`Slide ${id}`}></MovieCard>
        )
      }
    </Slider>
  )
}

class MovieRow extends Component {

  render() {
    return (
      <>
        <Grid container>
          <Grid item xs={6}>
            <Typography className="header-title">All Movies</Typography>
          </Grid>
          <Grid className="genre-container" item xs={6}>
            <GenreSelect />
            <YearSelect />
          </Grid>
        </Grid>
        <RetrieveMovies></RetrieveMovies>
      </>
    )
  }
}

export default MovieRow;