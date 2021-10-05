import React, { Component } from 'react';
import '../index.scss';
import * as constants from '../constants/constants';

import { useSelector, useDispatch } from 'react-redux';
import { filterBy, retrieveMovies } from '../reducers/movieDataSlice';

import { styled } from '@mui/material/styles';
import { Box, AppBar, Toolbar, Autocomplete, TextField, Grid, Button, Avatar, IconButton } from '@mui/material';
import { MovieTwoTone, Menu } from '@material-ui/icons';

// CSS in JS
const SToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: 'flex-start',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(2),
  backgroundColor: constants.primary,
  '@media all': {
    minHeight: 128
  }
}));

function validateAutocomplete(value) {
  if (value.target.defaultValue) {
    return value.target.defaultValue;
  } else {
    if (!value.target.innerText) {
      return '';
    } 
    const a = value.target.innerText;
    const b = a.substring(0, a.length-6).trim();
    return b;
  }
}

class NavigationBar extends Component {
  render() {
    return (
      <Box>
        <AppBar position="static">
          <SToolbar id="navigation-bar">
            <ToolbarContent />
          </SToolbar>
        </AppBar>
      </Box>
    );
  }
}

function MovieFilter(props) {
  const dispatch = useDispatch();
  const movieList = useSelector(retrieveMovies).slice();
  const nameList = movieList.map((e) => `${e.title} (${e.year})`);

  return (
    <Autocomplete
      sx={{ width: 800 }}
      freeSolo
      options={nameList}
      renderInput={props.textField}
      onChange={(value) => dispatch(filterBy(validateAutocomplete(value))) }
    ></Autocomplete>
  )
}

class ToolbarContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status : true
    }
  }

  textField (params) {
    return (
      <TextField className="search-field" {...params} fullWidth label="Buscar"/>
    )
  }

  checkLogin(status) {
    if (status) {
      return <Avatar src="/broken-image.jpg"/>
    } else {
      return <Button className="p-button p-button">Sign In</Button>
    }
  }

  render() {
    return (
      <Grid container spacing={2}>
        <Grid className="centered-grid" item xs={2}>
          <Box display={{ xs: "none", md: "block" }}>
            <MovieTwoTone
              className="movie-icon"
            ></MovieTwoTone>
          </Box>
          <Box display={{ md: "none" }}>
            <IconButton >
              <Menu></Menu>
            </IconButton>
          </Box>
        </Grid>
        <Grid className="centered-grid" item xs={8}>
          <MovieFilter
            textField={this.textField}
          />
        </Grid>
        <Grid className="centered-grid" item xs={2}>
          {this.checkLogin(this.state.status)}
        </Grid>
      </Grid>
    );
  }
}

export default NavigationBar;