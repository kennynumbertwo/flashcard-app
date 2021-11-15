import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
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
import UserCollectionsPage from './UserCollectionsPage';
import About from './About';
import Login from './Login';
import AccountMenu from './AccountMenu';
import db from './firebase.config';
import EditCollections from './EditCollections';
import FlashcardTray from './FlashcardTray';
import styles from './styles/DrawerNavStyles';

const useStyles = styles;

export default function DrawerNav(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = useState({});
  const [userCardCollections, setUserCardCollections] = useState([]);
  const [isShowingMastery, setIsShowingMastery] = useState(false);
  const [isShowingModal, setIsShowingModal] = useState(true);
  const [userDeckState, setUserDeckState] = useState({
    isLoading: false,
    errorMessage: '',
    userCardSetDatabase: null,
  });
  const [roundState, setRoundState] = useState({
    cardQuantity: 0,
  });
  // Checks if user is logged in, if not, login page is shown
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Animation State
  const [isAnimatingCardItem, setIsAnimatingCardItem] = useState(false);

  const {
    cardSetDatabase,
    updateCardSetName,
    setCurrentCardSetName,
    currentCardSetName,
    getCardCollections,
    fetchStockCards,
  } = props;

  // Opens Material UI Drawer
  const handleDrawerOpen = () => {
    setIsAnimatingCardItem(false);
    setOpen(true);
  };

  // Closes Material UI Drawer
  const handleDrawerClose = () => {
    setIsAnimatingCardItem(false);
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
                onClick={handleDrawerClose}
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
                onClick={handleDrawerClose}
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
                onClick={handleDrawerClose}
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
                handleDrawerClose={handleDrawerClose}
              />
            )}
          />
          {/* STOCK INDIVIDUAL SET / FLASHCARD PAGE */}
          <Route
            exact
            path="/collections/:setName"
            render={() => (
              <FlashcardTray
                userCardSetDatabase={cardSetDatabase}
                currentCardSetName={currentCardSetName}
                isLoggedIn={isLoggedIn}
                roundState={roundState}
                setRoundState={setRoundState}
                fetchUserCardSets={fetchUserCardSets}
                uid={user.uid}
                isShowingMastery={isShowingMastery}
                setIsShowingMastery={setIsShowingMastery}
                stockCardSet
                fetchStockCards={fetchStockCards}
                isShowingModal={isShowingModal}
                setIsShowingModal={setIsShowingModal}
              />
            )}
          />
          {/* USER INDIVIDUAL SET / FLASHCARD PAGE */}
          <Route
            exact
            path="/my-collections/:setName"
            render={() => (
              <FlashcardTray
                userCardSetDatabase={userDeckState.userCardSetDatabase}
                currentCardSetName={currentCardSetName}
                isLoggedIn={isLoggedIn}
                roundState={roundState}
                setRoundState={setRoundState}
                fetchUserCardSets={fetchUserCardSets}
                isShowingMastery
                uid={user.uid}
                userCardSet
              />
            )}
          />
          {/* EDIT DECK LIST PAGE */}
          <Route
            exact
            path="/edit-deck"
            render={() => (
              <EditCollections
                isLoggedIn={isLoggedIn}
                uid={user.uid}
                userCardSetDatabase={userDeckState.userCardSetDatabase}
                userCardCollections={userCardCollections}
                updateCardSetName={updateCardSetName}
                // setEditDeckState={setEditDeckState}
                deleteUserDatabaseSet={deleteUserDatabaseSet}
                fetchUserCardSets={fetchUserCardSets}
                isAnimatingCardItem={isAnimatingCardItem}
                setIsAnimatingCardItem={setIsAnimatingCardItem}
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
