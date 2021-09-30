import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
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
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import InfoIcon from '@material-ui/icons/Info';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { Route, Switch, Link } from 'react-router-dom';
import { getAuth, signInWithPopup, FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider, EmailAuthProvider } from 'firebase/auth';
import CollectionsPage from './CollectionsPage';
import CardSetsPage from './CardSetsPage';
import NestedListItem from './NestedListItem';
import FlashcardTray from './FlashcardTray';
import CreateDeck from './CreateDeck';
import About from './About';
import Modal from './Modal';
import Login from './Login';

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

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const authenticateFacebook = () => {
    const provider = new FacebookAuthProvider();
    provider.setCustomParameters({
      display: 'popup',
    });
    const auth = getAuth();
    signInWithPopup(auth, provider).then((result) => {
      // The signed-in user
      const { user } = result;
      console.log(user);
      // This gives you a Facebook Access Token used to access the Facebook API
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const { accessToken } = credential;
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's accound used
      const { email } = error;
      const credential = FacebookAuthProvider.credentialFromError(error);
      console.log(error);
    });
  };

  const authenticateGithub = () => {
    const provider = new GithubAuthProvider();
    provider.setCustomParameters({
      display: 'popup',
    });
    const auth = getAuth();
    signInWithPopup(auth, provider).then((result) => {
      // The signed-in user
      const { user } = result;
      console.log(user);
      // This gives you a Github Access Token used to access the Github API
      const credential = GithubAuthProvider.credentialFromResult(result);
      const { accessToken } = credential;
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's accound used
      const { email } = error;
      const credential = GithubAuthProvider.credentialFromError(error);
      console.log(error);
    });
  };

  const authenticateGoogle = () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      display: 'popup',
    });
    const auth = getAuth();
    signInWithPopup(auth, provider).then((result) => {
      // The signed-in user
      const { user } = result;
      console.log(user);
      // This gives you a Google Access Token used to access the Google API
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const { accessToken } = credential;
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's accound used
      const { email } = error;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(error);
    });
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
          {/* <Typography variant="h6" noWrap>
            Flashcards
          </Typography> */}
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
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <Login
          authenticateFacebook={authenticateFacebook}
          authenticateGithub={authenticateGithub}
          authenticateGoogle={authenticateGoogle}
        />
        <Switch>
          <Route
            exact
            path="/collections"
            render={() => <CollectionsPage cardCollections={cardCollections} />}
          />
          <Route
            exact
            path="/collections/:subCategory"
            render={(routeProps) => (
              <CardSetsPage
                cardCollections={cardCollections}
                selectedCollection={routeProps.match.params.subCategory}
                updateCardSetName={updateCardSetName}
              />
            )}
          />
          <Route
            exact
            path="/collections/:subCategory/:setName"
            render={() => (
              <FlashcardTray
                cardSetDatabase={cardSetDatabase}
                selectedSetIndex={selectedSetIndex}
                currentCardSetName={currentCardSetName}
              />
            )}
          />
          <Route exact path="/create-deck" render={() => <CreateDeck />} />
          <Route exact path="/about" render={() => <About />} />
        </Switch>
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
