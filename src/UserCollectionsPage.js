import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import UserCollectionCardDetails from './UserCollectionCardDetails';

const ITEM_HEIGHT = 48;
const ITEM_WIDTH = 1050;

const styles = {
  UserCardSetsPage: {
    display: 'flex',
    justifyContent: 'flext-start',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    maxHeight: '100%',
    margin: '64px 0px 0px 0px',
  },
  mainCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    width: '1100px',
    height: '825px',
    padding: '15px 0px 0px 0px',
    margin: '0px 0px 0px 0px',
    borderRadius: '2px',
    boxShadow: '0px 1px 5px 1px rgba(0, 0, 0, 0.1)',
    // color: 'var(--text-primary)',
    backgroundColor: 'var(--background-collection-main)',
    fontSize: '1rem',
    fontWeight: '400',
  },
  menuBar: {
    height: '50px',
    width: ITEM_WIDTH,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  headerWrapper: {
    height: '50px',
    width: '20%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: '10px',
  },
  navWrapperOuter: {
    height: '50px',
    width: '60%',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  navWrapperInner: {
    height: '50px',
    width: '60%',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    '& .MuiTab-root.MuiTab-textColorPrimary.Mui-selected': {
      color: 'var(--tab-primary)',
    },
    '& .MuiTabs-indicator': {
      backgroundColor: 'var(--tab-primary)',
    },
  },
  filterWrapper: {
    height: '50px',
    width: '20%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: '10px',
    marginLeft: 'auto',
  },
  divider: {
    height: '1px',
    width: ITEM_WIDTH,
    borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
    margin: '0px 0px 5px 0px',
    padding: '0px 0px 2px 0px',
    // boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.1)',
  },
  dividerEnd: {
    height: '1px',
    width: '1020px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
    margin: '0px 0px 5px 0px',
    padding: '4px 0px 2px 0px',
    // boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.1)',
  },
  headerCardWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: ITEM_WIDTH,
    height: '60px',
    backgroundColor: 'white',
  },
  headerCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '1000px',
    height: '55px',
    padding: '0px 0px 0px 0px',
    margin: '0px 0px 0px 0px',
    borderRadius: '5px',
    color: 'rgba(0, 0, 0, 0.7)',
    backgroundColor: 'var(--background-white)',
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  setNameWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '25%',
    height: '50px',
    padding: '0px 0px 0px 15px',
    '& p': {
      whiteSpace: 'no-wrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  },
  categoryWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '25%',
    height: '50px',
    padding: '0px 0px 0px 15px',
  },
  masteryWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '10%',
    height: '50px',
  },
  totalCardsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '10%',
    height: '50px',
  },
  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '10%',
    height: '50px',
  },
  sortIconWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '30px',
    height: '100%',
    paddingBottom: '2px',
  },
  sortClickWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  actionsWrapper: {
    height: '50px',
    width: '20%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemsWrapper: {
    backgroundColor: 'var(--background-collection-container)',
    height: '670px',
    overflow: 'scroll',
    flexDirection: 'column',
    display: 'flex',
    alignItems: 'center',
    border: '2px solid rgba(0, 0, 0, 0.04)',
    width: '1020px',
    borderRadius: '6px',
  },
};

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

  const {
    classes,
    cardSetDatabase,
    userCardSetDatabase,
    isLoggedIn,
    roundState,
    setRoundState,
    setCurrentCardSetName,
    fetchUserCardSets,
    handleDrawerClose,
  } = props;

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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
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

  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }

  return (
    <div className={classes.UserCardSetsPage}>
      <div className={classes.mainCard}>

        <div className={classes.menuBar}>
          <div className={classes.headerWrapper}>
            <h2>Run Decks</h2>
          </div>
          <div className={classes.navWrapperOuter}>
            <div className={classes.navWrapperInner}>
              <Tabs
                value={value}
                onChange={handleChange}
                sx={{ width: '80%' }}
                centered
              >
                <Tab label="My Decks" sx={{ width: '40%' }} onClick={handleMyDecksClick} />
                <Tab label="Stock Decks" sx={{ width: '45%', marginLeft: 'auto' }} onClick={handleStockDecksClick} />
              </Tabs>
            </div>
          </div>
          <div className={classes.filterWrapper}>
            <Button
              sx={{
                backgroundColor: 'rgba(250, 250, 250, 0.0)',
                color: 'rgba(0, 0, 0, 0.6)',
                height: '35px',
                '&:hover': {
                  backgroundColor: 'rgba(250, 250, 250, 0.0)',
                  color: 'rgba(0, 0, 0, 0.8)',
                },
              }}
              id="demo-customized-button"
              aria-controls="demo-customized-menu"
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              variant="contained"
              disableElevation
              onClick={handleClick}
              endIcon={<KeyboardArrowDownIcon />}
            >
              Category Filter
            </Button>
            <Menu
              id="long-menu"
              MenuListProps={{
                'aria-labelledby': 'long-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 5.5,
                  width: '20ch',
                },
              }}
            >
              {filterState.showClearFilter && (
              <MenuItem key="clear-filter" onClick={handleClose}>
                Clear Filter
              </MenuItem>
              )}
              {filterOptions.map((option) => (
                <MenuItem key={option} selected={option === selectedFilter} onClick={handleClose}>
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </div>
        </div>
        <div className={classes.divider} />
        <div className={classes.headerCard}>
          <div className={classes.setNameWrapper}>
            <div className={classes.sortClickWrapper} id="setName" onClick={handleSortClick}>
              <p className={classes.label}>Set Name</p>
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
        </div>
        <div className={classes.itemsWrapper}>
          {myDecksTab && (
          <>
            { !filterState.isFiltered && sortState.sortedDatabase.length > 0
              ? sortState.sortedDatabase.map(userCardSet => (
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
                  handleDrawerClose={handleDrawerClose}
                />
              ))
              : filterState.filtered.map(userCardSet => (
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
                  handleDrawerClose={handleDrawerClose}
                />
              ))}
          </>
          )}
          {stockDecksTab && (
          <>
            { !filterState.isFiltered && stockSortState.sortedStockDatabase.length > 0
              ? stockSortState.sortedStockDatabase.map(cardSet => (
                <UserCollectionCardDetails
                  key={cardSet.setName}
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
                  handleDrawerClose={handleDrawerClose}
                />
              ))
              : filterState.filtered.map(cardSet => (
                <UserCollectionCardDetails
                  key={cardSet.setName}
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
                  handleDrawerClose={handleDrawerClose}
                />
              ))}
          </>
          )}
        </div>
        <div className={classes.dividerEnd} />
      </div>
    </div>
  );
}

export default withStyles(styles)(UserCollectionsPage);
