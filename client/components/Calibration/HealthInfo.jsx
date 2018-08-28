import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import DoneIcon from '@material-ui/icons/Done';
import IconButton from '@material-ui/core/IconButton';

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
    marginBottom: '40px',
    marginTop: '40px',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#FEEAE6',
    padding: theme.spacing.unit,
    borderRadius: '15px',
  },
  inputField: {
    border: '4px solid #442C2E',
    borderRadius: '7px',
    margin: '1em auto',
  },
  input: {
    fontSize: '34px',
    padding: '1rem 2rem',
    borderRadius: '7px',
    borderWidth: 0,
    outline: 'none',
  },
  icon: {
    position: 'relative',
    fontSize: 32,
    marginBottom: '8px',
    outline: 'none',
  },
  calibration: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
});

class HealthInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      disabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitTwo = this.handleSubmitTwo.bind(this);
  }

  handleChange(e) {
    const input = document.getElementById('userInput');
    this.setState({
      id: e.target.value,
      disabled: false,
    });
    if (input.value === '') {
      this.setState({
        disabled: true,
      });
    }
  }

  handleSubmit() {
    const input = document.getElementById('userInput');
    input.value = '';
    const data = {result: this.state.id};
    axios.post('http://localhost:3000/api/dietary_restrictions', data)
      .then(response => { return; })
        // reponse.data is the message sent back
      .catch(error => console.log(error));
  }

  handleSubmitTwo(e) {
    if (e.keyCode === 13) {
      this.setState({
        redirect: true,
      });
      const input = document.getElementById('userInput');
      input.value = '';
      const arr = this.state.id.match(/[a-z]+/gi);
      const returned = [];
      for (let i = 0; i < arr.length; i++) {
        returned.push(arr[i].charAt(0).toUpperCase() + arr[i].slice(1));
      }
      const data = {result: returned.join(' ')};
      axios.post('http://localhost:3000/api/dietary_restrictions', data)
        .then(response => { return; })
        // reponse.data is the message sent back
        .catch(error => console.log(error));
    }
  }

  render() {
    const { classes } = this.props;

    if (this.state.redirect) {
      return <Redirect to='/welcome'/>;
    }
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
                Dietary Restrictions?
              </Typography>
              <form className={classes.inputField}>
                <input type="text" name="user-response" className={classes.input} onChange={this.handleChange} id="userInput" onKeyDown={this.handleSubmitTwo}/>
                <IconButton
                  className={classes.icon}
                  disabled={this.state.disabled}
                  aria-label="Done"
                  onClick={this.handleSubmit}
                  component={Link}
                  to='/welcome'
                >  
                  <DoneIcon />
                </IconButton>
              </form>
            </MuiThemeProvider>
          </div>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

export default withStyles(styles)(HealthInfo);