import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import DoneIcon from '@material-ui/icons/Done';
import IconButton from '@material-ui/core/IconButton';

const welcome = createMuiTheme({
  typography: {
    fontFamily: 'Rubik',
    fontSize: 40,
    fontWeight: 'bold',
  }
});

const setup = createMuiTheme({
  typography: {
    fontFamily: 'Rubik',
    fontSize: 25,
  }
});

const description = createMuiTheme({
  typography: {
    fontFamily: 'Rubik',
    fontSize: 20,
  }
});

const buttonTheme = createMuiTheme({
  typography: {
    fontFamily: 'Rubik',
  }
});

const styles = theme => ({
  calibration: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '20px',
  },
  button: {
    margin: '0 10px',
    backgroundColor: '#FEEAE6',
    '&:hover': {
      backgroundColor: '#f0cac0',
    },
  },
});

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: '',
    }
    this.fetchUserInfo();
  }

  fetchUserInfo() {
    const that = this;
    axios.get('http://localhost:3000/api/current_user')
      .then(response => {
        that.setState({
          currentUser: response.data.match(/[a-z]+/gi)[0],
        });
      })
      .catch(error => console.log(error));
  }

  render() {
    const { classes } = this.props;
    
    return(
      <ReactCSSTransitionGroup
        transitionAppear={true}
        transitionAppearTimeout={600}
        transitionEnterTimeout={600}
        transitionLeaveTimeout={200}
        transitionName={'SlideIn'}
      >
        <div className={classes.calibration}>
          <MuiThemeProvider theme={welcome}>
            <Typography variant="headline" className={classes.calibration}>
              Welcome, {this.state.currentUser}.
            </Typography>
          </MuiThemeProvider>
          <MuiThemeProvider theme={setup}>
            <Typography variant="subheading" className={classes.calibration}>
              You're all set up!
            </Typography>
          </MuiThemeProvider>
          <MuiThemeProvider theme={description}>
            <Typography variant="caption" className={classes.calibration}>
              Continue on to get your unique recommendations
            </Typography>
          </MuiThemeProvider>
          <MuiThemeProvider theme={buttonTheme}>
            <Button
              className={classes.button}
              variant='contained'
              component={Link}
              to='/questionOne'
            >
              Continue
            </Button>
          </MuiThemeProvider>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

export default withStyles(styles)(Welcome);

// Need to make sure that somehow, I can retrieve the proper user from the server 
// later will refactor so that it never stores anything in the server (since
// that would prevent multiple users from ever using the website without overwriting
// each other's data)

// maybe somehow, when the person hits the 'get started' button, it pings the database
// and creates a new user, then sends that user's id back down to the client
// store it as a state(?) or a class name somewhere easily accessible and then
// every server hit after that updates that user's preferences in the database(?) 
// aka name, employed, health 