import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import scania from '../../images/scania.png';
import ConnStatus from '../ConnStatus';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  img: {
    maxHeight: '2.5rem'
  }
}));

export default function NavBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose(route) {
    window.location.href = route;
    setAnchorEl(null);
  }

  return (
    <div className={classes.root}>
      <AppBar style={{ background: '#041E42' }} position="static">
        <Toolbar>
          <IconButton 
            edge="start" 
            className={classes.menuButton} 
            color="inherit" 
            aria-label="Menu"
            aria-controls="simple-menu" 
            aria-haspopup="true" 
            onClick={handleClick}>
            <Icon>menu</Icon>
          </IconButton>         
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => handleClose('/#/')}>Início</MenuItem>
            <MenuItem onClick={() => handleClose('/#/home')}>User</MenuItem>
            <MenuItem onClick={() => handleClose('/#/config')}>Configurações</MenuItem>
            <MenuItem onClick={() => handleClose('/#/status')}>Status</MenuItem>
            <MenuItem onClick={() => handleClose('')}>Recarregar</MenuItem>
          </Menu>
          <Typography variant="h6" className={classes.title}>
            ONE BIN
          </Typography>
          <ConnStatus />
          <img src={scania} alt="logo" className={classes.img} />
        </Toolbar>
      </AppBar>
    </div>
  );
}
