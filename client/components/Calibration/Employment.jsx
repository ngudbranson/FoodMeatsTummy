import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Rubik',
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
  question: {
    paddingRight: '20px',
    paddingLeft: '20px',
    paddingTop: '10px',
    paddingBottom: '10px',
    margin: '10px',
    marginBottom: '100px',
    marginTop: '40px',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#FEEAE6',
    padding: theme.spacing.unit,
    borderRadius: '15px',
  },
  button: {
    margin: '0 10px',
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

class Employment extends React.Component {
  constructor(props) {
    super(props);
    this.handleJob = this.handleJob.bind(this);
  }

  handleJob(e) {
    const string = e.target.innerText.match(/[a-z]+/gi);
    const arr = [];
    for (let i = 0; i < string.length; i += 1) {
      if (string[i] !== '') {
        arr.push(string[i]);
      }
    }
    const data = {result: arr.join(' ')};
    axios.post('http://localhost:3000/api/job', data)
      .then(response => { return; })
        // reponse.data is the message sent back
      .catch(error => console.log(error));
  }

  render() {
    const { classes } = this.props;

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
              Create Your Profile
            </Typography>
          </MuiThemeProvider>
        </div>
        <div className={classes.root} id="gettingStarted">
          <div className={classes.flex}>
            <MuiThemeProvider theme={theme}>
              <Typography className={classes.question} variant="headline" id="boxShadow">
                Are you currently employed?
              </Typography>
            </MuiThemeProvider>
              <MuiThemeProvider theme={theme}>
                <div>
                  <Button
                    className={classes.button}
                    onClick={this.handleJob}
                    component={Link}
                    to="/healthInfo"
                    variant="contained"
                  >
                    Yes
                  </Button>
                  <Button
                    className={classes.button}
                    onClick={this.handleJob}
                    component={Link}
                    to="/healthInfo"
                    variant="contained"
                  >
                    Taking a break
                  </Button>
                  <Button
                    className={classes.button}
                    onClick={this.handleJob}
                    component={Link}
                    to="/healthInfo"
                    variant="contained"
                  >
                    No
                  </Button>
                </div>
              </MuiThemeProvider>
          </div>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

export default withStyles(styles)(Employment);