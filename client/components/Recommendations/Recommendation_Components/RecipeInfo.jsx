import React from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Rubik',
    fontSize: 14,
  }
});

const styles = theme => ({
  imageAndInfo: {
    margin: '0 5px',
    width: '20%',
  },
  image: {
    maxWidth: '100%',
    height: '200px',
    borderRadius: '5px',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    opacity: 1,
    transition: theme.transitions.create('opacity'),
    '&:hover': {
      opacity: 0.8,
      transform: 'scale(1.1)',
    },
    marginBottom: '20px',
  },
  anchor: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  time: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  timeInfo: {
    margin: '10px 0',
  },
  ingredients: {
    width: '80%',
    padding: '8px',
    backgroundColor: '#fffbfa',
    height: '250px',
    overflow: 'scroll',
  },
  ingredientsTwo: {
    width: '80%',
    padding: '8px',
    backgroundColor: '#fffbfa',
    height: '250px',
    overflow: 'scroll',
    marginBottom: '20px',
  },
});

class RecipeInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    const { classes } = this.props;
    const url = `/images/recipes/recipe${this.props.recipe.id}.jpg`;

    if (this.props.recipe.id % 2 === 1) {
      return (
        <div className={classes.imageAndInfo}>
          <div>
            <MuiThemeProvider theme={theme}>
              <a href={this.props.recipe.url} target="_blank" className={classes.anchor}>
                <img src={url} className={classes.image}/>
              </a>
              <div className={classes.time}>
                <Typography variant="body1"><strong>{this.props.recipe.name}</strong></Typography>
                <Typography variant="caption" className={classes.timeInfo}><strong>Prep Time:</strong> {this.props.recipe.prep_time}</Typography>
                <Typography variant="caption" className={classes.timeInfo}><strong>Cook Time:</strong> {this.props.recipe.cook_time}</Typography>
                <Typography variant="caption" className={classes.timeInfo}><strong>Total Time:</strong> {this.props.recipe.total_time}</Typography>
                <Typography variant="caption" className={classes.timeInfo}><strong>Servings:</strong> {this.props.recipe.servings}</Typography>
                <Card className={classes.ingredients}><Typography><strong>Ingredients:</strong></Typography>
                  {this.props.recipe.ingredients.ingredients.map((ingredient, index) => {
                    return <Typography key={index}>{index}: {ingredient}</Typography>;
                  })}
                </Card>
              </div>
            </MuiThemeProvider>
          </div>
        </div>
      );
    } else {
      return (
        <div className={classes.imageAndInfo}>
          <div>
            <MuiThemeProvider theme={theme}>
              <div className={classes.time}>
                <Typography variant="body1"><strong>{this.props.recipe.name}</strong></Typography>
                <Typography variant="caption" className={classes.timeInfo}><strong>Prep Time:</strong> {this.props.recipe.prep_time}</Typography>
                <Typography variant="caption" className={classes.timeInfo}><strong>Cook Time:</strong> {this.props.recipe.cook_time}</Typography>
                <Typography variant="caption" className={classes.timeInfo}><strong>Total Time:</strong> {this.props.recipe.total_time}</Typography>
                <Typography variant="caption" className={classes.timeInfo}><strong>Servings:</strong> {this.props.recipe.servings}</Typography>
                <Card className={classes.ingredientsTwo}><Typography><strong>Ingredients:</strong></Typography>
                  {this.props.recipe.ingredients.ingredients.map((ingredient, index) => {
                    return <Typography key={index}>{index}: {ingredient}</Typography>;
                  })}
                </Card>
              </div>
              <a href={this.props.recipe.url} target="_blank" className={classes.anchor}>
                <img src={url} className={classes.image}/>
              </a>
            </MuiThemeProvider>
          </div>
        </div>
      );
    }
  }
}

export default withStyles(styles)(RecipeInfo);