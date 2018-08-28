import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Rubik',
  }
});

const styles = theme => ({
  top: {
    backgroundColor: '#f0cac0',
    width: '100%',
    marginBottom: '60px',
  },
  list: {
    width: 250,
    backgroundColor: '#fffbfa',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  listItem: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    paddingBottom: '40px',
    borderBottom: '1px solid #442C2E',
  },
  button: {
    padding: '25px 20px',
  },
  buttonRight: {
    padding: '25px 20px',
    float: 'right',
  },
});

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      left: false,
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  toggleDrawer() {
    this.setState({
      left: !this.state.left,
    });
  }

  render() {
    const { classes } = this.props;
    const sideList = (
      <div className={classes.list}>
        <Button className={classes.listItem}>
          <Typography id="firstListItem">My Account</Typography>
        </Button>
        <Button className={classes.listItem} component={Link} to='/questionOne'>
          <Typography id="firstListItem">Find New Recommendations</Typography>
        </Button>
        <Button className={classes.listItem} component={Link} to='/recommendations'>
          <Typography id="firstListItem">My Recommendations</Typography>
        </Button>
      </div>
    );

    return (
      <div className={classes.top}>
        <MuiThemeProvider theme={theme}>
          <Button onClick={this.toggleDrawer} className={classes.button}>
            <Typography theme={theme} variant="button">My Account</Typography>
          </Button>
          <Button className={classes.buttonRight} component={Link} to='/'>
            <Typography theme={theme} variant="button">Home</Typography>
          </Button>
          <SwipeableDrawer
            open={this.state.left}
            onClose={this.toggleDrawer}
            onOpen={this.toggleDrawer}
          >
            <div
              tabIndex={0}
              role="button"
              onClick={this.toggleDrawer}
              onKeyDown={this.toggleDrawer}
            >
              {sideList}
            </div>
          </SwipeableDrawer>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default withStyles(styles)(Navbar);