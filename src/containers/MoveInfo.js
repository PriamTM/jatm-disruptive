import React, { Component } from 'react';
import '../index.scss';

import Paper from '@mui/material/Paper';
import { Parallax } from 'react-parallax';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const CustomTabIndicator = { component: <span className="prlx-tabs-indicator" /> };

class MovieInfo extends Component {
  constructor (props) {
    super(props);
    this.state = {
      tabsValue: 0
    }
  }

  tabChange = (event, newValue) => {
    this.setState({
      tabsValue: newValue
    });
  };

  render() {
    return (
      <>
        <Parallax
          blur={10}
          bgImage="https://images.unsplash.com/photo-1498092651296-641e88c3b057?auto=format&fit=crop&w=1778&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"
          bgImageAlt="Movie Image"
          strenght={500}
        >
          <div id="prlx">
            <Paper className="prlx-paper">
              <Tabs
                value={this.state.tabsValue}
                onChange={this.tabChange}
                TabIndicatorProps={CustomTabIndicator}
              >
                <Tab className="prlx-tab" disableRipple label="Synopsis" />
                <Tab className="prlx-tab" disableRipple label="Screenshots" />
                <Tab className="prlx-tab" disableRipple label="Reviews" />
              </Tabs>
            </Paper>
          </div>
        </Parallax>
        <Paper sx={{ height: 1000}}></Paper>
      </>
    );
  }
}

export default MovieInfo;
