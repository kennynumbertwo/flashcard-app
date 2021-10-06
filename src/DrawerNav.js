import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
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
import CreateIcon from '@material-ui/icons/Create';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import InfoIcon from '@material-ui/icons/Info';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { Route, Switch, Link } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import CollectionsPage from './CollectionsPage';
import CardSetsPage from './CardSetsPage';
import NestedListItem from './NestedListItem';
import FlashcardTray from './FlashcardTray';
import CreateDeck from './CreateDeck';
import About from './About';
import Modal from './Modal';
import Login from './Login';
import HomePage from './HomePage';
import AccountMenu from './AccountMenu';

const drawerWidth = 350;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '35ch',
    },
    height: '100%',
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
  navLink: {
    textDecoration: 'none',
    color: 'rgba(0, 0, 0, .8)',
    '& .navArrow': {
      color: 'rgba(0, 0, 0, 0)',
      transition: 'all .25s',
      transitionTimingFunction: 'ease-in-out',
    },
    '&:hover .navArrow': {
      color: 'rgba(0, 0, 0, .8)',
      transform: 'translateX(35%)',
    },
  },
}));

export default function DrawerNav(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = useState({});
  // Checks if user is logged in, if not, login page is shown
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const {
    cardCollections,
    cardSetDatabase,
    updateCardSetName,
    selectedSetIndex,
    currentCardSetName,
    isShowingModal,
    toggleModal,
    pendingSetName,
    confirmPendingSetName,
    denyPendingSetName,
  } = props;

  // Opens Material UI Drawer
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  // Closes Material UI Drawer
  const handleDrawerClose = () => {
    setOpen(false);
  };

  // Function to logout user and reset state
  const logoutUser = async () => {
    const auth = getAuth();
    setUser({});
    setOpen(false);
    await auth.signOut();
    setIsLoggedIn(false);
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
          {isLoggedIn && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          )}
          <AccountMenu logoutUser={logoutUser} isLoggedIn={isLoggedIn} user={user} />
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
        {/* Creates the main nav links at the top of the drawer */}
        {isLoggedIn && (
        <>
          <List>
            <ListSubheader component="div" id="navigation-header">
              Navigation
            </ListSubheader>
            <Link to="/collections" className={classes.navLink}>
              <ListItem
                className={classes.navItem}
                key="collections"
                button
              >
                <ListItemIcon><LibraryBooksIcon /></ListItemIcon>
                <ListItemText primary="Collections" />
                <ListItemIcon><ArrowRightAltIcon className="navArrow" /></ListItemIcon>
              </ListItem>
            </Link>
            <Link to="/create-deck" className={classes.navLink}>
              <ListItem
                key="create-deck"
                button
              >
                <ListItemIcon><CreateIcon /></ListItemIcon>
                <ListItemText primary="Create Deck" />
                <ListItemIcon><ArrowRightAltIcon className="navArrow" /></ListItemIcon>
              </ListItem>
            </Link>
            <Link to="/about" className={classes.navLink}>
              <ListItem
                key="about"
                button
              >
                <ListItemIcon><InfoIcon /></ListItemIcon>
                <ListItemText primary="About" />
                <ListItemIcon><ArrowRightAltIcon className="navArrow" /></ListItemIcon>
              </ListItem>
            </Link>
          </List>
          <Divider />
          {/* Create Nested Lists for "My Flashcards" section in drawer */}
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
                key={col.subCategoryId}
                subCategory={col.subCategory}
                subCategoryId={col.subCategoryId}
                setNames={col.setNames}
                updateCardSetName={updateCardSetName}
              />
            ))}
          </List>
        </>
        )}
      </Drawer>
      {/* Main Page Content */}
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        {/* ROUTES */}
        <Switch>
          {/* HOME PAGE */}
          <Route
            exact
            path="/"
            render={() => <HomePage isLoggedIn={isLoggedIn} />}
          />
          {/* LOGIN PAGE */}
          <Route
            exact
            path="/login"
            render={() => (
              <Login
                isLoggedIn={isLoggedIn}
                user={user}
                setUser={setUser}
                setIsLoggedIn={setIsLoggedIn}
              />
            )}
          />
          {/* COLLECTION PAGE */}
          <Route
            exact
            path="/collections"
            render={() => (
              <CollectionsPage
                cardCollections={cardCollections}
                isLoggedIn={isLoggedIn}
              />
            )}
          />
          {/* CARD SETS PAGE PAGE */}
          <Route
            exact
            path="/collections/:subCategory"
            render={(routeProps) => (
              <CardSetsPage
                cardCollections={cardCollections}
                selectedCollection={routeProps.match.params.subCategory}
                updateCardSetName={updateCardSetName}
                isLoggedIn={isLoggedIn}
              />
            )}
          />
          {/* INDIVIDUAL SET / FLASHCARD PAGE */}
          <Route
            exact
            path="/collections/:subCategory/:setName"
            render={() => (
              <FlashcardTray
                cardSetDatabase={cardSetDatabase}
                selectedSetIndex={selectedSetIndex}
                currentCardSetName={currentCardSetName}
                isLoggedIn={isLoggedIn}
              />
            )}
          />
          {/* CREATE DECK PAGE */}
          <Route
            exact
            path="/create-deck"
            render={() => (
              <CreateDeck isLoggedIn={isLoggedIn} />
            )}
          />
          {/* ABOUT PAGE */}
          <Route exact path="/about" render={() => <About />} />
        </Switch>
        {/* MODAL */}
        <Modal
          isShowing={isShowingModal}
          hide={toggleModal}
          messageText={`Would you like to load the ${pendingSetName} flashcard deck?`}
          buttonText={<ThumbUpIcon />}
          secondButtonText={<ThumbDownIcon />}
          buttonAction={confirmPendingSetName}
          secondButtonAction={denyPendingSetName}
          secondButton
        />
      </main>
    </div>
  );
}
