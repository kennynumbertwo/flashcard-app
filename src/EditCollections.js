import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core';
import { Redirect, useHistory } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PuffLoader from 'react-spinners/PuffLoader';
import Snackbar from '@mui/material/Snackbar';
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import styles from './styles/EditCollectionsStyles';
import EditCollectionsEditDecks from './EditCollectionsEditDecks';
import AccountMenu from './AccountMenu';
import ButtonBottom from './ButtonBottom';
import CardsView from './CardsView';
import EmptyDecksBlock from './EmptyDecksBlock';
import CategoryFilter from './CategoryFilter';

function EditCollections(props) {
  // State for EditCollections
  const [sortState, setSortState] = useState({
    sortedDatabase: [],
    isSorted: false,
    sortId: 'setName',
    sortAsc: true,
  });
    // State for filter
  const [filterState, setFilterState] = useState({
    isFiltered: false,
    showClearFilter: false,
    filtered: [],
  });
  const [isAddingDeck, setIsAddingDeck] = useState(false);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [isEditingDecksTab, setIsEditingDecksTab] = useState(true);
  const [isEditingCardsTab, setIsEditingCardsTab] = useState(false);
  const [isViewingCardsState, setIsViewingCardsState] = useState({
    isViewing: false,
    cardSet: {},
  });

  // State for Material UI Dropdown
  const [filterOptions, setFilterOptions] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedFilter, setSelectedFilter] = useState('');
  const open = Boolean(anchorEl);

  // State for Material UI Tabs
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // State for Material UI Snackbar
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  let history = useHistory();

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  const action = (
    <React.Fragment>
      <CheckIcon sx={{ paddingRight: '10px' }} />
    </React.Fragment>
  );

  // Destructured Props
  const {
    classes,
    userCardSetDatabase,
    isLoggedIn,
    uid,
    deleteUserDatabaseSet,
    fetchUserCardSets,
    isAnimatingCardItem,
    setIsAnimatingCardItem,
    logoutUser,
    user,
  } = props;

  // Fetches latest database from Firestore
  useEffect(() => {
    fetchUserCardSets();
  }, []);

  // Sorts the database by setName, if it exists
  useEffect(() => {
    if (userCardSetDatabase) { sortCollections(sortState.sortId); }
  }, [userCardSetDatabase, sortState.sortAsc, sortState.sortId]);

  // Sets filter options to the state
  useEffect(() => {
    if (userCardSetDatabase) { setFilterOptions(getFilterOptions()); }
  }, [userCardSetDatabase]);

  useEffect(() => {
    setTimeout(() => {
      if (selectedFilter !== '') (setFilterState({ ...filterState, showClearFilter: true }));
      if (selectedFilter === '') (setFilterState({ ...filterState, showClearFilter: false }));
    }, 600);
  }, [selectedFilter]);

  // Gets the viewState
  useEffect(() => {
    if (userCardSetDatabase && isViewingCardsState.isViewing) {
      const updatedViewState = getUpdatedViewState();
      setIsViewingCardsState({ ...isViewingCardsState, cardSet: updatedViewState });
    }
  }, [userCardSetDatabase]);

  // Updates the state when Viewing a decks and adding or deleting cards
  const getUpdatedViewState = () => {
    let updatedViewState = {};
    userCardSetDatabase.forEach(cardSet => {
      if (cardSet.setName === isViewingCardsState.setName) {
        updatedViewState = { ...cardSet };
      }
    });
    return updatedViewState;
  };

  //  <---------------  Filter functions for Material UI Dropdown   --------------->

  // Close handler for the Material UI sort dropdown
  const handleClose = (e) => {
    let filtered = [];
    if (e.target.role === 'menuitem') {
      if (e.target.innerText === 'Clear Filter') {
        setSelectedFilter('');
        setFilterState({ ...filterState, filtered: [], isFiltered: false });
      }
      if (e.target.innerText !== 'Clear Filter') {
        sortState.sortedDatabase.forEach(cardSet => {
          if (cardSet.category === e.target.innerText) {
            filtered.push(cardSet);
          }
        });
        setSelectedFilter(e.target.innerText);
        setFilterState({ ...filterState, filtered, isFiltered: true });
      }
    }
    setAnchorEl(null);
  };

  const getFilterOptions = () => {
    let options = [];
    userCardSetDatabase.forEach(cardSet => {
      if (!options.includes(cardSet.category)) { options.push(cardSet.category); }
    });
    const sortedOptions = options.sort((a, b) => (a < b ? -1 : 1));
    return sortedOptions;
  };

  const deleteDeckFilter = (setName) => {
    let filtered = [...filterState.filtered].filter(deck => deck.setName !== setName);
    if (filtered.length !== 0) {
      return setFilterState({ ...filterState, filtered });
    }
    return setFilterState({
      isFiltered: false,
      showClearFilter: false,
      filtered: [],
    });
  };

  //  <---------------  Click Handlers for EditCollections   --------------->

  // Handles Set Name and Category Sort
  const handleSortClick = (e) => {
    let target = e.currentTarget.id;
    if (target !== sortState.sortId) {
      setSortState({ ...sortState, sortId: target, sortAsc: true });
    }
    if (target === sortState.sortId) {
      setSortState({ ...sortState, sortAsc: !sortState.sortAsc });
    }
  };

  // Click handler for the Edit Decks button
  const handleEditDecksClick = () => {
    if (!isEditingDecksTab) {
      setIsAddingCard(false);
      setIsEditingDecksTab(true);
      setIsEditingCardsTab(false);
      setIsViewingCardsState({ isViewing: false, cardSet: {} });
    }
  };

  // Click handler for the Edit Cards button
  const handleEditCardsClick = () => {
    if (!isEditingCardsTab) {
      setIsEditingCardsTab(true);
      setIsEditingDecksTab(false);
      setIsAddingDeck(false);
    }
  };

  // Click handler for the Add Deck
  const handleAddDeckClick = () => {
    setIsAddingDeck(true);
  };

  // Click handler for the Add Card
  const handleAddCardClick = () => {
    setIsAddingCard(true);
  };

  const handleRunDecksClick = () => {
    history.push('/my-collections');
  };

  //  <---------------  Utility Functions for EditCollections   --------------->

  const getTotalMasteryRating = (array) => {
    let totalMasteryRating = 0;
    array.forEach(flashcard => {
      totalMasteryRating += flashcard.masteryRating;
    });
    let percentage = Math.floor((totalMasteryRating / (array.length * 2)) * 100);
    const mastery = {
      masteryTotal: totalMasteryRating,
      masteryPotential: array.length * 2,
      masteryPercentage: percentage,
    };
    return mastery;
  };

  const getDeletedCardArray = (cardToDelete) => {
    let cardNum = 1;
    let deletedArray = isViewingCardsState.cardSet.cards.filter(card => card !== cardToDelete);
    let finalArray = [];
    deletedArray.forEach(card => {
      let updatedCard = { ...card, cardNumber: cardNum };
      finalArray.push(updatedCard);
      cardNum += 1;
    });
    return finalArray;
  };

  const sortCollections = (id) => {
    const dbCopy = [...userCardSetDatabase];
    if (sortState.sortAsc) {
      const sorted = dbCopy.sort((a, b) => (a[id] > b[id] ? 1 : -1));
      return setSortState({ ...sortState, isSorted: true, sortedDatabase: sorted });
    }
    const sorted = dbCopy.sort((a, b) => (a[id] > b[id] ? -1 : 1));
    return setSortState({ ...sortState, isSorted: true, sortedDatabase: sorted });
  };

  // Render

  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }

  return (
    <div className={classes.EditCollections}>
      <div className={classes.mainCard}>
        <div className={classes.menuBar}>
          <div className={classes.headerWrapper}>
            <h2 className={classes.headerText}>Edit Collections</h2>
          </div>
          <div className={classes.navWrapperOuter}>
            <div className={classes.navWrapperInner}>
              <Tabs
                value={value}
                onChange={handleChange}
                sx={{ width: '80%' }}
                centered
                className={classes.tabWrapper}
              >
                <Tab label="Edit Decks" sx={{ width: '40%' }} onClick={handleEditDecksClick} />
                <Tab label="Edit Cards" sx={{ width: '40%', marginLeft: 'auto' }} onClick={handleEditCardsClick} />
              </Tabs>
            </div>
          </div>

          <div className={classes.filterWrapper}>
            <CategoryFilter
              open={open}
              handleClose={handleClose}
              filterOptions={filterOptions}
              filterState={filterState}
              anchorEl={anchorEl}
              setAnchorEl={setAnchorEl}
              selectedFilter={selectedFilter}
            />
            <AccountMenu logoutUser={logoutUser} isLoggedIn={isLoggedIn} user={user} />
          </div>
        </div>
        <div className={classes.divider} />
        <div className={classes.headerCard}>
          <div className={classes.setNameWrapper}>
            <div className={classes.sortClickWrapper} id="setName" onClick={handleSortClick}>
              <p className={classes.label}>Deck Name</p>
              <div className={classes.sortIconWrapper}>
                {sortState.sortId === 'setName' && sortState.sortAsc
                  ? <i className="fas fa-sort-up" />
                  : null}
                {sortState.sortId === 'setName' && !sortState.sortAsc
                  ? <i className="fas fa-sort-down" />
                  : null}
                {sortState.sortId !== 'setName' && <i className="fas fa-sort" />}
              </div>
            </div>
          </div>
          <div className={classes.categoryWrapper}>
            <div className={classes.sortClickWrapper} id="category" onClick={handleSortClick}>
              <p className={classes.label}>Category</p>
              <div className={classes.sortIconWrapper}>
                {sortState.sortId === 'category' && sortState.sortAsc
                  ? <i className="fas fa-sort-up" />
                  : null}
                {sortState.sortId === 'category' && !sortState.sortAsc
                  ? <i className="fas fa-sort-down" />
                  : null}
                {sortState.sortId !== 'category' && <i className="fas fa-sort" />}
              </div>

            </div>
          </div>
          <div className={classes.iconWrapper}>
            <p className={classes.label}>Icon</p>
          </div>
          <div className={classes.masteryWrapper}>
            <p className={classes.label}>Mastery</p>
          </div>
          <div className={classes.totalCardsWrapper}>
            <p className={classes.label}>Cards</p>
          </div>
          <div className={classes.actionsWrapper}>
            <p className={classes.label}>Actions</p>
          </div>
        </div>
        {/* Blank EditCollectionsItem is shown when Add Deck is clicked */}
        {userCardSetDatabase ? (
          <div className={classes.itemsWrapperOuter}>
            <div className={classes.itemsWrapper}>
              {userCardSetDatabase.length === 0 && !isAddingDeck ? (
                <EmptyDecksBlock isEditCollections />
              ) : (
                <>
                  {isViewingCardsState.isViewing ? (
                    <CardsView
                      uid={uid}
                      userCardSetDatabase={userCardSetDatabase}
                      isViewingCardsState={isViewingCardsState}
                      deleteUserDatabaseSet={deleteUserDatabaseSet}
                      fetchUserCardSets={fetchUserCardSets}
                      isAddingDeck={isAddingDeck}
                      isAddingCard={isAddingCard}
                      isEditingDecksTab={isEditingDecksTab}
                      isEditingCardsTab={isEditingCardsTab}
                      setIsViewingCardsState={setIsViewingCardsState}
                      isAnimatingCardItem={isAnimatingCardItem}
                      setIsAnimatingCardItem={setIsAnimatingCardItem}
                      handleAddCardClick={handleAddCardClick}
                      setIsAddingCard={setIsAddingCard}
                      setOpenSnackbar={setOpenSnackbar}
                      setSnackbarMessage={setSnackbarMessage}
                      getTotalMasteryRating={getTotalMasteryRating}
                      getDeletedCardArray={getDeletedCardArray}
                    />
                  )
                    : (
                      <EditCollectionsEditDecks
                        isAddingDeck={isAddingDeck}
                        filterState={filterState}
                        sortState={sortState}
                        uid={uid}
                        deleteUserDatabaseSet={deleteUserDatabaseSet}
                        fetchUserCardSets={fetchUserCardSets}
                        isEditingDecksTab={isEditingDecksTab}
                        isEditingCardsTab={isEditingCardsTab}
                        isViewingCardsState={isViewingCardsState}
                        setIsViewingCardsState={setIsViewingCardsState}
                        setIsAddingDeck={setIsAddingDeck}
                        setOpenSnackbar={setOpenSnackbar}
                        setSnackbarMessage={setSnackbarMessage}
                        setIsAnimatingCardItem={setIsAnimatingCardItem}
                        deleteDeckFilter={deleteDeckFilter}
                      />
                    )}
                </>
              )}
            </div>
          </div>
        )
          : (
            <div className={classes.itemsWrapperOuter}>
              <div className={classes.itemsWrapper}>
                <div className={classes.loadingSpinnerWrapper}>
                  <PuffLoader color="rgba(0, 0, 0, 0.7)" size="3rem" loading />
                </div>
              </div>
            </div>
          )}

        <div className={classes.dividerEnd} />
        {/* Footer controls when viewing cards */}
        {isViewingCardsState.isViewing ? (
          <div className={classes.viewingButtonWrapperEmpty} />
        )
          : (
            <div className={classes.viewingButtonWrapper}>
              <ButtonBottom
                icon={<AddIcon />}
                handleButtonClick={handleAddDeckClick}
                tooltipText="Add A New Deck"
                isHighlighted={sortState.sortedDatabase.length === 0}
              />
              <ButtonBottom
                icon={<LibraryBooksIcon />}
                handleButtonClick={handleRunDecksClick}
                tooltipText="To My Collections"
                isHighlighted={false}
              />
            </div>
          )}
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        action={action}
      />
    </div>
  );
}

export default withStyles(styles)(EditCollections);
