import React, { Component } from 'react';
import MovieRow from './MovieRow';
import Favourites from '../components/favourites';
import '../index.scss';
import { css } from "@emotion/react";

import { Paper } from '@mui/material';
import PacmanLoader from "react-spinners/PacmanLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  width: 50px;
  height: 50px;
`;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state={
      loading: false,
      setLoading: false,
      color: '#ffffff',
      setColor: '#ffffff'
    }
  }

  toggleLoader(status) {
    this.setState({
      loading: status
    });
  }

  handleLoader(status) {
    if( status ) {
      return (
        <div  className="loader-background">
          <PacmanLoader css={override} color={this.state.color} loading={this.state.loading}></PacmanLoader>
        </div>
      )
    } else {
      return;
    }
  }

  render() {
    return(
      <>
        <Paper id="movies-home" square>
          <MovieRow toggleLoader={(s) => this.toggleLoader(s)} />
          <Favourites />
        </Paper>
      </>
    )
  }
}

export default Home = React.memo(Home);