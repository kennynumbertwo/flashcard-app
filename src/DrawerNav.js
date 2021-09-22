import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@mui/material/TextField';
import CreateIcon from '@material-ui/icons/Create';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { ThumbDown } from '@material-ui/icons';
import NestedListItem from './NestedListItem';
import FlashcardTray from './FlashcardTray';
import Modal from './Modal';

const drawerWidth = 350;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '35ch',
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

export default function DrawerNav(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [createNewDeck, setCreateNewDeck] = useState(false);
  // const [selectedSet, setselectedSet] = useState(0);
  // const [isShowingModal, toggleModal] = useToggle(false);
  // const [currentCardSetName, setCurrentCardSetName] = useState('');
  const {
    cardCollections,
    cardSetDatabase,
    updateCardSetName,
    selectedSet,
    currentCardSetName,
    isShowingModal,
    toggleModal,
    findCardSet,
  } = props;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleCreateDeck = () => {
    setCreateNewDeck(true);
  };

  // const updateCardSetName = (e) => {
  //   const nameToFind = e.target.textContent;
  //   console.log(nameToFind);
  //   toggleModal();
  //   return (setCurrentCardSetName(nameToFind));
  // };

  // Finds the cardSet selected from the DrawerNav
  // const findCardSet = () => {
  //   let indexToSet;
  //   cardSetDatabase.forEach(cardSet => {
  //     if (cardSet.id === currentCardSetName.toLowerCase()) {
  //       indexToSet = cardSetDatabase.indexOf(cardSet);
  //     }
  //   });
  //   toggleModal();
  //   return setselectedSet(indexToSet);
  // };

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
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={(
            <ListSubheader component="div" id="nested-list-subheader">
              My Flashcards
            </ListSubheader>
          )}
        >
          {cardCollections.map((col) => (
            <NestedListItem
              key={col.id}
              collectionName={col.collectionName}
              categories={col.categories}
              updateCardSetName={updateCardSetName}
            />
          ))}
        </List>
        <Divider />
        <List>
          <ListItem
            key="Create Deck"
            onClick={handleCreateDeck}
            button
          >
            <ListItemIcon><CreateIcon /></ListItemIcon>
            <ListItemText primary="Create Deck" />
          </ListItem>
          {createNewDeck && (
          <div>
            <TextField
              label="Deck Name"
              id="standard-size-small"
              size="medium"
              color="success"
            />
          </div>
          )}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <FlashcardTray cardSetDatabase={cardSetDatabase} selectedSet={selectedSet} />
        <Modal
          isShowing={isShowingModal}
          hide={toggleModal}
          messageText={`Would you like to load the ${currentCardSetName} flashcard deck?`}
          buttonText={<ThumbUpIcon />}
          secondButtonText={<ThumbDownIcon />}
          buttonAction={findCardSet}
          secondButton
        />
      </main>
    </div>
  );
}
