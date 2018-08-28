import React from 'react';
import * as ApiRequest from '../ApiRequest/ApiRequest.js';
import PropTypes from 'prop-types';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Typography from '@material-ui/core/Typography';
import RecipeInfo from './Recommendation_Components/RecipeInfo.jsx';

const setup = createMuiTheme({
  typography: {
    fontFamily: 'Rubik',
    fontSize: 28,
  }
});

const styles = theme => ({
  calibration: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  root: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    backgroundColor: '#f5f1ec',
    width: '100%',
    height: '690px',
    marginBottom: '40px',
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

class Recommendations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recommendations: [],
    }
    this.fetchAnswers();
  }

  fetchAnswers() {
    const that = this;
    // currently just fetches the hard-coded info in the database
    axios.get('http://localhost:3000/api/current_answers')
      .then(res => {
        that.setState({
          recommendations: res.data,
        });
      })
      .then(() => {
        console.log(that.state.recommendations);
      })
      // .then(() => ApiRequest.makeApiRequest())
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
                Your Recommendations
              </Typography>
            </MuiThemeProvider>
          </div>
        <div className={classes.root}>
          <div className={classes.flex}>
            {this.state.recommendations.map((recipe, index) => {
              return <RecipeInfo key={index} recipe={recipe}/>;
            })}
          </div>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

export default withStyles(styles)(Recommendations);