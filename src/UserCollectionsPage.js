import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core';
import { Redirect, useHistory } from 'react-router-dom';
import PuffLoader from 'react-spinners/PuffLoader';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import EditIcon from '@mui/icons-material/Edit';
import UserCollectionCardDetails from './UserCollectionCardDetails';
import styles from './styles/UserCollectionsPageStyles';
import AccountMenu from './AccountMenu';
import ButtonBottom from './ButtonBottom';
import EmptyDecksBlock from './EmptyDecksBlock';
import CategoryFilter from './CategoryFilter';

function UserCollectionsPage(props) {
  // State for UserCollectionsPage
  const [sortState, setSortState] = useState({
    sortedDatabase: [],
    isSorted: false,
    sortId: 'setName',
    sortAsc: true,
  });

  const [stockSortState, setStockSortState] = useState({
    sortedStockDatabase: [],
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

  // State for Material UI Dropdown
  const [filterOptions, setFilterOptions] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedFilter, setSelectedFilter] = useState('');
  const open = Boolean(anchorEl);

  // State for Material UI Tabs
  const [myDecksTab, setMyDecksTab] = useState(true);
  const [stockDecksTab, setStockDecksTab] = useState(false);
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // State for window size
  const [isMobile, setIsMobile] = useState(false);

  const [isAnimatingCardDetails, setIsAnimatingCardDetails] = useState(true);

  let history = useHistory();

  const {
    classes,
    cardSetDatabase,
    userCardSetDatabase,
    isLoggedIn,
    roundState,
    setRoundState,
    setCurrentCardSetName,
    fetchUserCardSets,
    logoutUser,
    user,
  } = props;

  // Listen for the window size
  useEffect(() => {
    if (window.innerWidth <= 950) {
      setIsMobile(true);
    }
    function handleMobileResize() {
      if (window.innerWidth <= 950) {
        setIsMobile(true);
      }
      if (window.innerWidth > 950) {
        setIsMobile(false);
      }
    }
    window.addEventListener('resize', handleMobileResize);
  }, [isMobile]);

  useEffect(() => {
    fetchUserCardSets();
  }, []);

  // Sorts the database by setName, if it exists
  useEffect(() => {
    if (userCardSetDatabase) { sortCollections(sortState.sortId); }
  }, [userCardSetDatabase, sortState.sortAsc, sortState.sortId]);

  // Sorts the stock database by setName, if it exists
  useEffect(() => {
    if (cardSetDatabase) { sortStockCollections(stockSortState.sortId); }
  }, [cardSetDatabase, stockSortState.sortAsc, stockSortState.sortId]);

  // Sets filter options to the state
  useEffect(() => {
    if (userCardSetDatabase) { setFilterOptions(getFilterOptions()); }
  }, [userCardSetDatabase, myDecksTab, stockDecksTab]);

  useEffect(() => {
    setTimeout(() => {
      if (selectedFilter !== '') (setFilterState({ ...filterState, showClearFilter: true }));
      if (selectedFilter === '') (setFilterState({ ...filterState, showClearFilter: false }));
    }, 600);
  }, [selectedFilter]);

  const resetUserCollectionsState = () => {
    setSortState({
      sortedDatabase: [],
      isSorted: false,
    });
  };

  // Close handler for the Material UI sort dropdown
  const handleClose = (e) => {
    let filtered = [];
    if (e.target.role === 'menuitem') {
      if (e.target.innerText === 'Clear Filter') {
        setSelectedFilter('');
        setFilterState({ ...filterState, filtered: [], isFiltered: false });
      }
      if (e.target.innerText !== 'Clear Filter') {
        if (myDecksTab) {
          sortState.sortedDatabase.forEach(cardSet => {
            if (cardSet.category === e.target.innerText) {
              filtered.push(cardSet);
            }
          });
        }
        if (stockDecksTab) {
          stockSortState.sortedStockDatabase.forEach(cardSet => {
            if (cardSet.category === e.target.innerText) {
              filtered.push(cardSet);
            }
          });
        }
        setSelectedFilter(e.target.innerText);
        setFilterState({ ...filterState, filtered, isFiltered: true });
      }
    }
    setAnchorEl(null);
  };

  const getFilterOptions = () => {
    let options = [];
    if (myDecksTab) {
      userCardSetDatabase.forEach(cardSet => {
        if (!options.includes(cardSet.category)) { options.push(cardSet.category); }
      });
    }
    if (stockDecksTab) {
      cardSetDatabase.forEach(cardSet => {
        if (!options.includes(cardSet.category)) { options.push(cardSet.category); }
      });
    }
    const sortedOptions = options.sort((a, b) => (a < b ? -1 : 1));
    return sortedOptions;
  };

  //  <---------------  Click Handlers for UserCollections   --------------->

  // Handles Set Name and Category Sort
  const handleSortClick = (e) => {
    let target = e.currentTarget.id;
    if (myDecksTab) {
      if (target !== sortState.sortId) {
        setSortState({ ...sortState, sortId: target, sortAsc: true });
      }
      if (target === sortState.sortId) {
        setSortState({ ...sortState, sortAsc: !sortState.sortAsc });
      }
    }
    if (stockDecksTab) {
      if (target !== stockSortState.sortId) {
        setStockSortState({ ...stockSortState, sortId: target, sortAsc: true });
      }
      if (target === stockSortState.sortId) {
        setStockSortState({ ...stockSortState, sortAsc: !stockSortState.sortAsc });
      }
    }
  };

  const handleEditDecksClick = () => {
    history.push('/edit-deck');
  };

  const handleMyDecksClick = () => {
    if (!myDecksTab) {
      setMyDecksTab(true);
      setStockDecksTab(false);
      setFilterState({
        isFiltered: false,
        showClearFilter: false,
        filtered: [],
      });
    }
  };
  const handleStockDecksClick = () => {
    if (!stockDecksTab) {
      setMyDecksTab(false);
      setStockDecksTab(true);
      setFilterState({
        isFiltered: false,
        showClearFilter: false,
        filtered: [],
      });
    }
  };

  //  <---------------  Utility Functions for EditDeckList   --------------->

  const sortCollections = (id) => {
    const dbCopy = [...userCardSetDatabase];
    if (sortState.sortAsc) {
      const sorted = dbCopy.sort((a, b) => (a[id] > b[id] ? 1 : -1));
      return setSortState({ ...sortState, isSorted: true, sortedDatabase: sorted });
    }
    const sorted = dbCopy.sort((a, b) => (a[id] > b[id] ? -1 : 1));
    return setSortState({ ...sortState, isSorted: true, sortedDatabase: sorted });
  };

  const sortStockCollections = (id) => {
    const dbCopy = [...cardSetDatabase];
    if (stockSortState.sortAsc) {
      const sorted = dbCopy.sort((a, b) => (a[id] > b[id] ? 1 : -1));
      return setStockSortState({ ...stockSortState, isSorted: true, sortedStockDatabase: sorted });
    }
    const sorted = dbCopy.sort((a, b) => (a[id] > b[id] ? -1 : 1));
    return setStockSortState({ ...stockSortState, isSorted: true, sortedStockDatabase: sorted });
  };

  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }

  return (
    <div className={classes.UserCardSetsPage}>
      <div className={classes.mainCard}>
        <div className={classes.menuBar}>
          <div className={classes.headerWrapper}>
            <h2 className={classes.headerText}>My Collections</h2>
          </div>
          {!isMobile && (
          <div className={classes.navWrapperOuter}>
            <div className={classes.navWrapperInner}>
              <Tabs
                value={value}
                onChange={handleChange}
                sx={{ width: '80%' }}
                centered
                className={classes.tabWrapper}
              >
                <Tab label="My Decks" sx={{ width: '40%' }} onClick={handleMyDecksClick} />
                <Tab label="Stock Decks" sx={{ width: '45%', marginLeft: 'auto' }} onClick={handleStockDecksClick} />
              </Tabs>
            </div>
          </div>
          )}
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
          {isMobile && (
          <div className={classes.navWrapperOuter}>
            <div className={classes.navWrapperInner}>
              <Tabs
                value={value}
                onChange={handleChange}
                sx={{ width: '100%' }}
                centered
                className={classes.tabWrapper}
              >
                <Tab label="My Decks" sx={{ width: '50%' }} onClick={handleMyDecksClick} />
                <Tab label="Stock Decks" sx={{ width: '50%', marginLeft: 'auto' }} onClick={handleStockDecksClick} />
              </Tabs>
            </div>
          </div>
          )}
          {!isMobile && (
          <>
            <div className={classes.setNameWrapper}>
              <div className={classes.sortClickWrapper} id="setName" onClick={handleSortClick}>
                <p className={classes.label}>Deck Name</p>
                {myDecksTab && (
                <div className={classes.sortIconWrapper}>
                  {sortState.sortId === 'setName' && sortState.sortAsc
                    ? <i className="fas fa-sort-up" />
                    : null}
                  {sortState.sortId === 'setName' && !sortState.sortAsc
                    ? <i className="fas fa-sort-down" />
                    : null}
                  {sortState.sortId !== 'setName' && <i className="fas fa-sort" />}
                </div>
                )}
                {stockDecksTab && (
                <div className={classes.sortIconWrapper}>
                  {stockSortState.sortId === 'setName' && stockSortState.sortAsc
                    ? <i className="fas fa-sort-up" />
                    : null}
                  {stockSortState.sortId === 'setName' && !stockSortState.sortAsc
                    ? <i className="fas fa-sort-down" />
                    : null}
                  {stockSortState.sortId !== 'setName' && <i className="fas fa-sort" />}
                </div>
                )}
              </div>
            </div>
            <div className={classes.categoryWrapper}>
              <div className={classes.sortClickWrapper} id="category" onClick={handleSortClick}>
                <p className={classes.label}>Category</p>
                {myDecksTab && (
                <div className={classes.sortIconWrapper}>
                  {sortState.sortId === 'category' && sortState.sortAsc
                    ? <i className="fas fa-sort-up" />
                    : null}
                  {sortState.sortId === 'category' && !sortState.sortAsc
                    ? <i className="fas fa-sort-down" />
                    : null}
                  {sortState.sortId !== 'category' && <i className="fas fa-sort" />}
                </div>
                )}
                {stockDecksTab && (
                <div className={classes.sortIconWrapper}>
                  {stockSortState.sortId === 'category' && stockSortState.sortAsc
                    ? <i className="fas fa-sort-up" />
                    : null}
                  {stockSortState.sortId === 'category' && !stockSortState.sortAsc
                    ? <i className="fas fa-sort-down" />
                    : null}
                  {stockSortState.sortId !== 'category' && <i className="fas fa-sort" />}
                </div>
                )}
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
          </>
          )}
        </div>
        {userCardSetDatabase
          ? (
            <div className={classes.itemsWrapperOuter}>
              <div className={classes.itemsWrapper}>
                {myDecksTab && sortState.sortedDatabase.length !== 0 ? (
                  <>
                    { !filterState.isFiltered && sortState.sortedDatabase.length > 0
                      ? sortState.sortedDatabase.map((userCardSet, index) => (
                        <UserCollectionCardDetails
                          key={userCardSet.setName}
                          category={userCardSet.category}
                          iconClass={userCardSet.iconClass}
                          mastery={userCardSet.mastery}
                          setName={userCardSet.setName}
                          totalCards={userCardSet.cards.length}
                          roundState={roundState}
                          setRoundState={setRoundState}
                          setCurrentCardSetName={setCurrentCardSetName}
                          url={`/my-collections/${userCardSet.id}`}
                          fetchUserCardSets={fetchUserCardSets}
                          resetUserCollectionsState={resetUserCollectionsState}
                          cardNumber={index}
                          isAnimatingCardDetails={isAnimatingCardDetails}
                          setIsAnimatingCardDetails={setIsAnimatingCardDetails}
                          isMobile={isMobile}
                        />
                      ))
                      : filterState.filtered.map((userCardSet, index) => (
                        <UserCollectionCardDetails
                          key={userCardSet.setName}
                          category={userCardSet.category}
                          iconClass={userCardSet.iconClass}
                          mastery={userCardSet.mastery}
                          setName={userCardSet.setName}
                          totalCards={userCardSet.cards.length}
                          roundState={roundState}
                          setRoundState={setRoundState}
                          setCurrentCardSetName={setCurrentCardSetName}
                          url={`/my-collections/${userCardSet.id}`}
                          fetchUserCardSets={fetchUserCardSets}
                          resetUserCollectionsState={resetUserCollectionsState}
                          cardNumber={index}
                          isAnimatingCardDetails={isAnimatingCardDetails}
                          setIsAnimatingCardDetails={setIsAnimatingCardDetails}
                          isMobile={isMobile}
                        />
                      ))}
                  </>
                )
                  : (
                    <>
                      {!stockDecksTab && (
                      <EmptyDecksBlock />
                      )}
                    </>
                  )}
                {stockDecksTab && (
                <>
                  { !filterState.isFiltered && stockSortState.sortedStockDatabase.length > 0
                    ? stockSortState.sortedStockDatabase.map((cardSet, index) => (
                      <UserCollectionCardDetails
                        key={cardSet.setName}
                        cardSetToSave={cardSet}
                        category={cardSet.category}
                        iconClass={cardSet.iconClass}
                        mastery={cardSet.mastery}
                        setName={cardSet.setName}
                        totalCards={cardSet.cards.length}
                        roundState={roundState}
                        setRoundState={setRoundState}
                        setCurrentCardSetName={setCurrentCardSetName}
                        url={`/collections/${cardSet.id}`}
                        fetchUserCardSets={fetchUserCardSets}
                        resetUserCollectionsState={resetUserCollectionsState}
                        cardNumber={index}
                        isAnimatingCardDetails={isAnimatingCardDetails}
                        setIsAnimatingCardDetails={setIsAnimatingCardDetails}
                        isMobile={isMobile}
                      />
                    ))
                    : filterState.filtered.map((cardSet, index) => (
                      <UserCollectionCardDetails
                        key={cardSet.setName}
                        cardSetToSave={cardSet}
                        category={cardSet.category}
                        iconClass={cardSet.iconClass}
                        mastery={cardSet.mastery}
                        setName={cardSet.setName}
                        totalCards={cardSet.cards.length}
                        roundState={roundState}
                        setRoundState={setRoundState}
                        setCurrentCardSetName={setCurrentCardSetName}
                        url={`/collections/${cardSet.id}`}
                        fetchUserCardSets={fetchUserCardSets}
                        resetUserCollectionsState={resetUserCollectionsState}
                        cardNumber={index}
                        isAnimatingCardDetails={isAnimatingCardDetails}
                        setIsAnimatingCardDetails={setIsAnimatingCardDetails}
                        isMobile={isMobile}
                      />
                    ))}
                </>
                )}
              </div>
            </div>
          ) : (
            <div className={classes.itemsWrapperOuter}>
              <div className={classes.itemsWrapper}>
                <div className={classes.loadingSpinnerWrapper}>
                  <PuffLoader color="rgba(0, 0, 0, 0.7)" size="3rem" loading />
                </div>
              </div>
            </div>
          )}
        <div className={classes.dividerEnd} />
        <div className={classes.viewingButtonWrapper}>
          <ButtonBottom
            icon={<EditIcon />}
            handleButtonClick={handleEditDecksClick}
            tooltipText="Edit Your Collections"
            isHighlighted={sortState.sortedDatabase.length === 0}
          />
        </div>
      </div>
    </div>
  );
}

export default withStyles(styles)(UserCollectionsPage);
