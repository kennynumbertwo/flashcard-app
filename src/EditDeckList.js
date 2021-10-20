import React, { useState } from 'react';
import { withStyles } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import EditDeckListItem from './EditDeckListItem';

const ITEM_HEIGHT = 48;
const ITEM_WIDTH = 1050;

const options = ['Set Name', 'Sub Category', 'Category', 'Total Cards'];

const styles = {
  EditDeckList: {
    display: 'flex',
    justifyContent: 'flext-start',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    margin: '64px 0px 0px 0px',
  },
  menuBar: {
    height: '50px',
    width: ITEM_WIDTH,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  sortWrapper: {
    height: '50px',
    width: '20%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: '10px',
  },
  divider: {
    height: '1px',
    width: ITEM_WIDTH,
    borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
    margin: '0px 0px 15px 0px',
    boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.1)',
  },
  mainCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    width: '1050px',
    height: '85%',
    padding: '0px 0px 0px 0px',
    margin: '5px 0px 5px 0px',
    borderRadius: '2px',
    boxShadow: '0px 1px 5px 1px rgba(0, 0, 0, 0.1)',
    color: 'rgba(0, 0, 0, 0.7)',
    backgroundColor: 'rgba(250, 250, 250, 0.4)',
    fontSize: '1rem',
    fontWeight: 'bold',
    // border: '1px solid black',
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
    height: '60px',
    padding: '0px 0px 0px 0px',
    margin: '0px 0px 0px 0px',
    borderRadius: '2px',
    // boxShadow: '0px 1px 5px 1px rgba(0, 0, 0, 0.1)',
    color: 'rgba(0, 0, 0, 0.7)',
    backgroundColor: 'white',
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  labelWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20%',
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
};

function EditDeckList(props) {
  const [sortState, setSortState] = useState({
    sortedDatabase: [],
    isSorted: false,
  });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedFilter, setSelectedFilter] = useState('');
  const open = Boolean(anchorEl);
  const { classes, userCardSetDatabase, userCardCollections, isLoggedIn, setEditDeckState } = props;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    if (e.target.role === 'menuitem') {
      if (e.target.innerText === 'Set Name') {
        sortBySetName();
      }
      if (e.target.innerText === 'Sub Category') {
        sortBySubCategory();
      }
      if (e.target.innerText === 'Category') {
        sortByCategory();
      }
      if (e.target.innerText === 'Total Cards') {
        sortByTotalCards();
      }
      setSelectedFilter(e.target.innerText);
    }
    setAnchorEl(null);
  };

  const sortBySetName = () => {
    const dbCopy = [...userCardSetDatabase];
    const sortedByName = dbCopy.sort((a, b) => (a.setName > b.setName ? 1 : -1));
    return setSortState({ isSorted: true, sortedDatabase: sortedByName });
  };
  const sortBySubCategory = () => {
    const dbCopy = [...userCardSetDatabase];
    const sortedBySubCategory = dbCopy.sort(
      (a, b) => (a.subCategory > b.subCategory ? 1 : -1),
    );
    return setSortState({ isSorted: true, sortedDatabase: sortedBySubCategory });
  };
  const sortByCategory = () => {
    const dbCopy = [...userCardSetDatabase];
    const sortedByCategory = dbCopy.sort((a, b) => (a.category > b.category ? 1 : -1));
    return setSortState({ isSorted: true, sortedDatabase: sortedByCategory });
  };

  const sortByTotalCards = () => {
    const dbCopy = [...userCardSetDatabase];
    const sortedByTotalCards = dbCopy.sort(
      (a, b) => (a.totalCards > b.totalCards ? 1 : -1),
    );
    return setSortState({ isSorted: true, sortedDatabase: sortedByTotalCards });
  };

  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }
  if (sortState.isSorted) {
    return (
      <div className={classes.EditDeckList}>
        <div className={classes.menuBar}>
          <h2>Edit Decks</h2>
        </div>
        <div className={classes.divider} />
        <div className={classes.mainCard}>
          <div className={classes.headerCardWrapper}>

            <div className={classes.headerCard}>
              <div className={classes.labelWrapper}>
                <p className={classes.label}>Set Name:</p>
              </div>
              <div className={classes.labelWrapper}>
                <p className={classes.label}>Sub Category:</p>
              </div>
              <div className={classes.labelWrapper}>
                <p className={classes.label}>Category:</p>
              </div>
              <div className={classes.totalCardsWrapper}>
                <p className={classes.label}>Total Cards:</p>
              </div>
              <div className={classes.iconWrapper}>
                <p className={classes.label}>Icon:</p>
              </div>
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
                  <MenuItem onClick={handleClose}>Clear Filter</MenuItem>
                  {options.map((option) => (
                    <MenuItem
                      key={option}
                      selected={option === selectedFilter}
                      onClick={handleClose}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            </div>
          </div>
          <div className={classes.divider} />
          {sortState.sortedDatabase.map(userCardSet => (
            <EditDeckListItem
              key={userCardSet.id}
              category={userCardSet.category}
              subCategory={userCardSet.subCategory}
              iconClass={userCardSet.subCategoryClass}
              setName={userCardSet.setName}
              totalCards={userCardSet.cards.length}
              setEditDeckState={setEditDeckState}
              url={`/my-collections/${userCardSet.subCategoryId}`}
            />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className={classes.EditDeckList}>
      <div className={classes.menuBar}>
        <h2>Edit Decks</h2>
      </div>
      <div className={classes.divider} />
      <div className={classes.headerCard}>
        <div className={classes.labelWrapper}>
          <p className={classes.label}>Set Name:</p>
        </div>
        <div className={classes.labelWrapper}>
          <p className={classes.label}>Sub Category:</p>
        </div>
        <div className={classes.labelWrapper}>
          <p className={classes.label}>Category:</p>
        </div>
        <div className={classes.totalCardsWrapper}>
          <p className={classes.label}>Total Cards:</p>
        </div>
        <div className={classes.iconWrapper}>
          <p className={classes.label}>Icon:</p>
        </div>
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
            <MenuItem onClick={handleClose}>Clear Filter</MenuItem>
            {options.map((option) => (
              <MenuItem key={option} selected={option === selectedFilter} onClick={handleClose}>
                {option}
              </MenuItem>
            ))}
          </Menu>
        </div>
      </div>
      {userCardSetDatabase.map(userCardSet => (
        <EditDeckListItem
          key={userCardSet.id}
          category={userCardSet.category}
          subCategory={userCardSet.subCategory}
          iconClass={userCardSet.subCategoryClass}
          setName={userCardSet.setName}
          totalCards={userCardSet.cards.length}
          setEditDeckState={setEditDeckState}
          url={`/my-collections/${userCardSet.subCategoryId}`}
        />
      ))}
    </div>
  );
}

export default withStyles(styles)(EditDeckList);