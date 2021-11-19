import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Route, Switch } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore/lite';
import UserCollectionsPage from './UserCollectionsPage';
import About from './About';
import Login from './Login';
import db from './firebase.config';
import EditCollections from './EditCollections';
import FlashcardTray from './FlashcardTray';
import styles from './styles/RoutesStyles';

const useStyles = styles;

export default function Routes(props) {
  const classes = useStyles();
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
      if (!docSnapshot.exists()) {
        setUserDeckState({ isLoading: false, errorMessage: '', userCardSetDatabase: [] });
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
        <Route
          exact
          path=""
          render={() => (
            <About
              isLoggedIn={isLoggedIn}
            />
          )}
        />
      </Switch>
    </div>
  );
}
