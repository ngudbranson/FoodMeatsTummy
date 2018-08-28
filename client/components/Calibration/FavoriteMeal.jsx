import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const styles = theme => ({
  big: {
    height: 600,
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    backgroundColor: '#f5f1ec',
    width: '100%',
    height: '460px',
  },
  big2: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 300,
    width: '75%',
    marginBottom: '40px',
  },
  image: {
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid #FEEAE6',
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
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

const images = [
  {
    url: '/images/breakfast.jpg',
    title: 'Breakfast',
    width: '33%',
    number: 1,
  },
  {
    url: '/images/lunch.jpg',
    title: 'Lunch',
    width: '33%',
    number: 2,
  },
  {
    url: '/images/dinner.jpg',
    title: 'Dinner',
    width: '33%',
    number: 3,
  },
];

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Rubik',
  }
});

const question = createMuiTheme({
  typography: {
    fontFamily: 'Rubik',
    color: '#442C2E',
  }
});

const setup = createMuiTheme({
  typography: {
    fontFamily: 'Rubik',
    fontSize: 28,
  }
});

class FavoriteMeal extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(e) {
    const data = {result: e.target.innerText};
    axios.post('http://localhost:3000/api/fav_meal', data)
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
        <div className={classes.big} id="favMeal">
          <div className={classes.big2}>
            <MuiThemeProvider theme={question}>
              <Typography 
                variant="headline"
                className={classes.question}
                id="boxShadow"
              >
                What is your favorite meal?
              </Typography>
            </MuiThemeProvider>
            <MuiThemeProvider theme={theme}>
                <div className={classes.root}>
                  {images.map(image => (
                    <ButtonBase
                      focusRipple
                      key={image.title}
                      className={classes.image}
                      focusVisibleClassName={classes.focusVisible}
                      style={{
                        width: image.width,
                      }}
                      onClick={this.handleSelect}
                    >
                      <span
                        className={classes.imageSrc}
                        style={{
                          backgroundImage: `url(${image.url})`,
                        }}
                      />
                      <span className={classes.imageBackdrop} />
                      <span className={classes.imageButton}>
                        <Typography
                          component="span"
                          variant="subheading"
                          color="inherit"
                          className={classes.imageTitle}
                        >
                          {image.title}
                          <span className={classes.imageMarked} />
                        </Typography>
                      </span>
                    </ButtonBase>
                  ))}
                </div>
                <div>
                  <Button 
                    className={classes.button}
                    component={Link}
                    to='/name'
                    variant='contained'
                  >
                    Back
                  </Button>
                  <Button
                    className={classes.button}
                    component={Link}
                    to='/employment'
                    variant='contained'
                  >
                    Next
                  </Button>
                </div>
            </MuiThemeProvider>
          </div>
        </div>
      </ReactCSSTransitionGroup>
    );
  };
};

export default withStyles(styles)(FavoriteMeal);