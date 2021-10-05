import React, { Component } from 'react';
import '../index.scss';

import { useSelector } from 'react-redux';
import { 
  retrieveFavourites
} from '../reducers/movieDataSlice';

import Slider from "react-slick";
import { TextField, Grid, CardContent, Typography, Card, Select, MenuItem } from '@mui/material';
import ImageOne from '../assets/movie_poster2.jpg';
import ImageTwo from '../assets/movie_poster.jpg';

function MovieCard(props) {
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
            </CardContent>
          </Card>
    </>
  )
}

function RetrieveFavourites(props) {
  const favourites = useSelector(retrieveFavourites);
  let modifiedList = favourites.slice();
  const infinite = modifiedList.length > 3;
  let slidesToShow = 1;
  if (modifiedList.length === 2) {
    slidesToShow = 2;
  } else if(modifiedList.length >= 3){
    slidesToShow = 3
  }

  return (
    <Slider
      className="movie-carousel"
      dots={false}
      speed={150}
      infinte={infinite}
      slidesToShow={slidesToShow}
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

function Favourites(props) {
  return (
    <>
      <Typography className="header-title">
        Favourites
      </Typography>
      <RetrieveFavourites />
    </>
  )
}

export default Favourites;