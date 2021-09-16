import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import NoteIcon from '@material-ui/icons/Note';
import CreateIcon from '@material-ui/icons/Create';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import TextField from '@material-ui/core/TextField';

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: 'white',
    color: 'black',
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function DrawerNav() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [collection, setCollection] = useState({
    coding: ['React', 'JavaScript', 'CSS', 'Python', 'HTML'],
    tv: ['The Office', 'Seinfeld', 'Game of Throne', 'Entourage'],
    movies: ['The Big Lebowski', 'Goodfellas', 'Shawshank Redemption'],
  });
  const [category, setCategory] = useState('Coding');
  const [createNewDeck, setCreateNewDeck] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleButtonClick = (cat) => {
    setCategory(cat);
    setCreateNewDeck(false);
  };

  const handleCreateDeck = () => {
    setCreateNewDeck(true);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Flashcards
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button={false} key="My Flashcards">
            <ListItemIcon><LibraryBooksIcon /></ListItemIcon>
            <ListItemText primary="My Flashcards" />
          </ListItem>
          {['Coding', 'TV', 'Movies'].map((text) => (
            <ListItem button key={text} onClick={() => handleButtonClick(text)}>
              <ListItemIcon><NoteIcon /></ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
          <ListItem button key="Create Deck" onClick={handleCreateDeck}>
            <ListItemIcon><CreateIcon /></ListItemIcon>
            <ListItemText primary="Create Deck" />
          </ListItem>
        </List>
        <Divider />
        <List>
          {!createNewDeck && (
          <ListItem button={false}>
            <ListItemIcon><LibraryBooksIcon /></ListItemIcon>
            <ListItemText primary={category} />
          </ListItem>
          )}
          {!createNewDeck && (
            collection[category.toLowerCase()].map((text) => (
              <ListItem button key={text}>
                <ListItemIcon><ArrowRightIcon /></ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))
          )}
          {createNewDeck && (
          <TextField
            id="outlined-password-input"
            label="Name"
            type="name"
            variant="outlined"
          />
          )}
        </List>
      </Drawer>
    </div>
  );
}
