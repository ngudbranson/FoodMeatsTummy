import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import CurrentQuestion from './CurrentQuestion.jsx';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Rubik',
    fontSize: 14,
  }
});

const setup = createMuiTheme({
  typography: {
    fontFamily: 'Rubik',
    fontSize: 28,
  }
});

const muiScale = createMuiTheme({
  typography: {
    fontFamily: 'Rubik',
  }
});

const styles = theme => ({
  flex: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  flexTwo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '80px',
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
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#FEEAE6',
    padding: theme.spacing.unit,
    borderRadius: '15px',
  },
  button: {
    margin: '0 10px',
    backgroundColor: '#f0cac0',
    '&:hover': {
      backgroundColor: '#d8b6ad',
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '0 20px',
  },
  calibration: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  ratingScale: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  ratingScaleItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  typo: {
    marginTop: '5px',
  },
  progression: {
    marginRight: '5px',
  },
});

const scale = [
  {
    value: 0,
    description: 'Not at all',
  },
  {
    value: 1,
    description: '',
  },
  {
    value: 2,
    description: '',
  },
  {
    value: 3,
    description: '',
  },
  {
    value: 4,
    description: '',
  },
  {
    value: 5,
    description: '',
  },
  {
    value: 6,
    description: '',
  },
  {
    value: 7,
    description: 'An extreme amount',
  },
];

const scale2 = [
  {
    value: 1,
    description: '',
  },
  {
    value: 2,
    description: '',
  },
  {
    value: 3,
    description: '',
  },
  {
    value: 4,
    description: '',
  },
  {
    value: 5,
    description: '',
  },
  {
    value: 6,
    description: '',
  },
  {
    value: 7,
    description: 'An extreme amount',
  },
];

class QuestionSix extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentNumber: 6,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    const ratingVal = Number(e.target.innerText);
    const data = {
      result: ratingVal,
      id: this.state.currentNumber,
    };
    axios.post(`http://localhost:3000/questionnaire/${this.state.currentNumber}`, data)
      .then(response => { return; })
        // reponse.data is the message sent back
      .catch(error => console.log(error));
  }

  render() {
    const {classes } = this.props;

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
              Understanding You
            </Typography>
          </MuiThemeProvider>
        </div>
        <div className={classes.root} id="gettingStarted">
          <div className={classes.flex}>
            <MuiThemeProvider theme={theme}>
              <Typography className={classes.question} variant="headline" id="boxShadow">
                At some point during this week did you anticipate something positive happening?
                <Typography variant="body2">
                  You wanted something very much, and you believed the outcome you hoped for was going to occur soon.
                </Typography>
                <Typography variant="body2">
                  How affected are you still?
                </Typography>
              </Typography>
            </MuiThemeProvider>
          </div>
          <div className={classes.ratingScale}>
            <MuiThemeProvider theme={muiScale}>
              {scale.map((rating, index) => {
                return <div className={classes.ratingScaleItem} key={index}>
                  <Button
                    className={classes.button}
                    onClick={this.handleClick}
                    component={Link}
                    to='/questionSeven'
                  >
                    {rating.value}
                  </Button>
                  <Typography variant="caption" className={classes.typo}>
                    {rating.description}
                  </Typography>
                </div>
              })}
            </MuiThemeProvider>
          </div>
          <div className={classes.flexTwo}>
            {scale2.map((rating, index) => {
              return <CurrentQuestion className={classes.progression} current={this.state.currentNumber} rating={rating} key={index}/>
            })}
          </div>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

export default withStyles(styles)(QuestionSix);
// eventually I'll need to find a way to refactor so that the questionnaire
// changes day-to-day so that the user doesn't always have the exact same questionnaire