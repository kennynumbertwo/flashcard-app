import React, { useState, useEffect } from 'react';
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
import InfoIcon from '@material-ui/icons/Info';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { Route, Switch, Link } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore/lite';
import ContactsIcon from '@mui/icons-material/Contacts';
import CollectionsPage from './CollectionsPage';
import UserCollectionsPage from './UserCollectionsPage';
import FlashcardTray from './FlashcardTray';
import About from './About';
import Login from './Login';
import HomePage from './HomePage';
import AccountMenu from './AccountMenu';
import db from './firebase.config';
import EditDeckList from './EditDeckList';
import UserFlashcardTray from './UserFlashcardTray';

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
  const [userCardCollections, setUserCardCollections] = useState([]);
  const [userDeckState, setUserDeckState] = useState({
    isLoading: false,
    errorMessage: '',
    userCardSetDatabase: null,
  });
  // const [editDeckState, setEditDeckState] = useState({
  //   deckToEdit: {},
  //   deckToAddCards: {},
  // });
  const [roundState, setRoundState] = useState({
    cardQuantity: 0,

  });
  // Checks if user is logged in, if not, login page is shown
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const {
    cardSetDatabase,
    updateCardSetName,
    setCurrentCardSetName,
    currentCardSetName,
    getCardCollections,
  } = props;

  // Opens Material UI Drawer
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  // Closes Material UI Drawer
  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchUserCardSets();
  }, [user]);

  const fetchUserCardSets = async () => {
    try {
      setUserDeckState({ isLoading: true, errorMessage: '', userCardSetDatabase: null });
      let docRef = doc(db, 'users', `${user.uid}`);
      let docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        let docData = docSnapshot.data();
        let userCardSetArray = [];
        for (let data in docData) {
          userCardSetArray.push(docData[data]);
        }
        setUserDeckState({ isLoading: false, errorMessage: '', userCardSetDatabase: userCardSetArray });
      }
    } catch (err) {
      setUserDeckState({ isLoading: false, errorMessage: 'Could not connect', userCardSetDatabase: null });
      console.log(err);
    }
  };

  const deleteUserDatabaseSet = (setNameToDelete) => {
    const databaseCopy = [...userDeckState.userCardSetDatabase];
    const updatedDatabase = databaseCopy.filter(cardSet => cardSet.setName !== setNameToDelete);
    setUserDeckState({ ...userDeckState, userCardSetDatabase: updatedDatabase });
  };

  useEffect(() => {
    if (userDeckState.userCardSetDatabase) {
      setUserCardCollections(getCardCollections(userDeckState.userCardSetDatabase));
    }
  }, [userDeckState.userCardSetDatabase]);

  // Function to logout user and reset state
  const logoutUser = async () => {
    const auth = getAuth();
    setUser({});
    setUserCardCollections([]);
    setUserDeckState({ isLoading: true, errorMessage: '', userCardSetDatabase: null });
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
            <Link to="/my-collections" className={classes.navLink}>
              <ListItem
                className={classes.navItem}
                key="my-collections"
                button
              >
                <ListItemIcon><ContactsIcon /></ListItemIcon>
                <ListItemText primary="Run Decks" />
                <ListItemIcon><ArrowRightAltIcon className="navArrow" /></ListItemIcon>
              </ListItem>
            </Link>
            <Link to="/edit-deck" className={classes.navLink}>
              <ListItem
                key="edit-deck"
                button
              >
                <ListItemIcon><CreateIcon /></ListItemIcon>
                <ListItemText primary="Edit My Collections" />
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
                cardSetDatabase={cardSetDatabase}
                updateCardSetName={updateCardSetName}
                setCurrentCardSetName={setCurrentCardSetName}
                isLoggedIn={isLoggedIn}
                roundState={roundState}
                setRoundState={setRoundState}
              />
            )}
          />
          {/* STOCK INDIVIDUAL SET / FLASHCARD PAGE */}
          <Route
            exact
            path="/collections/:setName"
            render={() => (
              <FlashcardTray
                cardSetDatabase={cardSetDatabase}
                userCardSetDatabase={userDeckState.userCardSetDatabase}
                currentCardSetName={currentCardSetName}
                isLoggedIn={isLoggedIn}
                roundState={roundState}
                setRoundState={setRoundState}
              />
            )}
          />
          {/* USER COLLECTION PAGE */}
          <Route
            exact
            path="/my-collections"
            render={() => (
              <UserCollectionsPage
                cardSetDatabase={cardSetDatabase}
                userCardSetDatabase={userDeckState.userCardSetDatabase}
                updateCardSetName={updateCardSetName}
                setCurrentCardSetName={setCurrentCardSetName}
                isLoggedIn={isLoggedIn}
                roundState={roundState}
                setRoundState={setRoundState}
                fetchUserCardSets={fetchUserCardSets}
              />
            )}
          />
          <Route
            exact
            path="/my-collections/:setName"
            render={() => (
              <UserFlashcardTray
                userCardSetDatabase={userDeckState.userCardSetDatabase}
                currentCardSetName={currentCardSetName}
                isLoggedIn={isLoggedIn}
                roundState={roundState}
                setRoundState={setRoundState}
                uid={user.uid}
              />
            )}
          />
          {/* EDIT DECK LIST PAGE */}
          <Route
            exact
            path="/edit-deck"
            render={() => (
              <EditDeckList
                isLoggedIn={isLoggedIn}
                uid={user.uid}
                userCardSetDatabase={userDeckState.userCardSetDatabase}
                userCardCollections={userCardCollections}
                updateCardSetName={updateCardSetName}
                // setEditDeckState={setEditDeckState}
                deleteUserDatabaseSet={deleteUserDatabaseSet}
                fetchUserCardSets={fetchUserCardSets}
              />
            )}
          />
          {/* ABOUT PAGE */}
          <Route exact path="/about" render={() => <About />} />
        </Switch>
      </main>
    </div>
  );
}
