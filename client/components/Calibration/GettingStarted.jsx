import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Typed from 'typed.js';
import TypedOut from './Typed.jsx';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Rubik',
    color: '#442C2E',
    fontSize: '25px',
  }
});

const setup = createMuiTheme({
  typography: {
    fontFamily: 'Rubik',
    fontSize: 28,
  }
});

const styles = theme => ({
  flex: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  root: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    backgroundColor: '#f5f1ec',
    width: '100%',
    height: '460px',
  },
  top: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '40px 0',
  },
  button: {
    position: 'relative',
    right: 0,
    top: 0,
    margin: '40px 0',
    width: '20%',
    backgroundColor: '#FEEAE6',
    '&:hover': {
      backgroundColor: '#f0cac0',
    },
  },
  calibration: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
});

function GettingStarted(props) {
  const strings = ['', '^500 Welcome to <strong>FoodMeetsTummy</strong><br>^2000Food recommendations based on <i><br>Mood</i><br>^2000Before we get started,<br>^2000A few questions to help set up<br>Your unique profile'];
  const options = {
    strings: strings,
    typeSpeed: 50,
  }
  const { classes } = props;
  return (
    <ReactCSSTransitionGroup
      transitionAppear={true}
      transitionAppearTimeout={600}
      transitionEnterTimeout={600}
      transitionLeaveTimeout={200}
      transitionName={'SlideIn'}
    >
      <div className={classes.calibration}>
        <MuiThemeProvider theme={setup}>
          <Typography variant="headline" className={classes.calibration}>
            FoodMeetsTummy
          </Typography>
        </MuiThemeProvider>
      </div>
      <div className={classes.root} id="gettingStarted">
        <div className={classes.top}>
          <MuiThemeProvider theme={theme}>
            <Typography variant="headline">
              <span id="typed">
                <TypedOut options={options}/>
              </span>
            </Typography>
            <Button
              variant="contained"
              component={Link}
              to="/name"
              className={classes.button}
            >
              <Typography variant="button">Get Started</Typography>
            </Button>
          </MuiThemeProvider>
        </div>
      </div>
    </ReactCSSTransitionGroup>
  );
};

export default withStyles(styles)(GettingStarted);