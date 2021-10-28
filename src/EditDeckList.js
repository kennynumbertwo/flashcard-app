import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import EditDeckListItem from './EditDeckListItem';
import styles from './styles/EditDeckListStyles';

const ITEM_HEIGHT = 48;
const options = ['Set Name', 'Category', 'Total Cards'];

function EditDeckList(props) {
  // State for EditDeckList
  const [sortState, setSortState] = useState({
    sortedDatabase: [],
    isSorted: false,
  });
  const [isAddingCards, setIsAddingCards] = useState(false);

  // State for Material UI Dropdown
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedFilter, setSelectedFilter] = useState('');
  const open = Boolean(anchorEl);

  // Destructured Props
  const {
    classes,
    userCardSetDatabase,
    isLoggedIn,
    setEditDeckState,
    uid,
    addUserDatabaseSet,
    deleteUserDatabaseSet,
    fetchUserCardSets,
  } = props;

  // Fetches latest database from Firestore
  useEffect(() => {
    fetchUserCardSets();
  }, []);

  // Sorts the database by setName, if it exists
  useEffect(() => {
    if (userCardSetDatabase) { sortBySetName(); }
  }, [userCardSetDatabase]);

  // Click handler for the Material UI sort dropdown
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close handler for the Material UI sort dropdown
  const handleClose = (e) => {
    if (e.target.role === 'menuitem') {
      if (e.target.innerText === 'Set Name') {
        sortBySetName();
      }
      if (e.target.innerText === 'Category') {
        sortBycategory();
      }
      if (e.target.innerText === 'Total Cards') {
        sortByTotalCards();
      }
      setSelectedFilter(e.target.innerText);
    }
    setAnchorEl(null);
  };

  //  <---------------  Sort functions for Material UI Dropdown   --------------->
  const sortBySetName = () => {
    const dbCopy = [...userCardSetDatabase];
    const sortedByName = dbCopy.sort((a, b) => (a.setName > b.setName ? 1 : -1));
    return setSortState({ isSorted: true, sortedDatabase: sortedByName });
  };

  const sortBycategory = () => {
    const dbCopy = [...userCardSetDatabase];
    const sortedBycategory = dbCopy.sort(
      (a, b) => (a.category > b.category ? 1 : -1),
    );
    return setSortState({ isSorted: true, sortedDatabase: sortedBycategory });
  };

  const sortByTotalCards = () => {
    const dbCopy = [...userCardSetDatabase];
    const sortedByTotalCards = dbCopy.sort(
      (a, b) => (a.cards.length < b.cards.length ? 1 : -1),
    );
    return setSortState({ isSorted: true, sortedDatabase: sortedByTotalCards });
  };
  //  ^---------------  End functions for Material UI Dropdown   ---------------^

  // Click handler for the Add Cards button
  const handleAddClick = () => {
    setIsAddingCards(!isAddingCards);
  };

  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }

  return (
    <div className={classes.EditDeckList}>
      <div className={classes.menuBar}>
        <h2>My Collections</h2>
        <button className={classes.button} type="button" onClick={handleAddClick}>Add Cards</button>
        <div className={classes.sortWrapper}>
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
            Sort
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
            {options.map((option) => (
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
          <p className={classes.label}>Set Name:</p>
        </div>
        <div className={classes.categoryWrapper}>
          <p className={classes.label}>Category:</p>
        </div>
        <div className={classes.iconWrapper}>
          <p className={classes.label}>Icon:</p>
        </div>
        <div className={classes.masteryWrapper}>
          <p className={classes.label}>Mastery:</p>
        </div>
        <div className={classes.totalCardsWrapper}>
          <p className={classes.label}>Total Cards:</p>
        </div>
        <div className={classes.actionsWrapper}>
          <p className={classes.label}>Actions:</p>
        </div>
      </div>
      { sortState.isSorted
        ? sortState.sortedDatabase.map(userCardSet => (
          <EditDeckListItem
            key={userCardSet.id}
            userCardSet={userCardSet}
            totalCards={userCardSet.cards.length}
            setEditDeckState={setEditDeckState}
            uid={uid}
            addUserDatabaseSet={addUserDatabaseSet}
            deleteUserDatabaseSet={deleteUserDatabaseSet}
            fetchUserCardSets={fetchUserCardSets}
            isAddingCards={isAddingCards}
          />
        ))
        : userCardSetDatabase.map(userCardSet => (
          <EditDeckListItem
            key={userCardSet.id}
            userCardSet={userCardSet}
            totalCards={userCardSet.cards.length}
            setEditDeckState={setEditDeckState}
            uid={uid}
            addUserDatabaseSet={addUserDatabaseSet}
            deleteUserDatabaseSet={deleteUserDatabaseSet}
            fetchUserCardSets={fetchUserCardSets}
            isAddingCards={isAddingCards}
          />
        ))}
    </div>
  );
}

export default withStyles(styles)(EditDeckList);
