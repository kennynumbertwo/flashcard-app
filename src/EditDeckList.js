import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Divider from '@mui/material/Divider';
import EditDeckListItem from './EditDeckListItem';
import IconCard from './IconCard';
import icons from './icons';

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
    // border: '1px solid black',
    height: '50px',
    width: ITEM_WIDTH,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  sortWrapper: {
    marginLeft: 'auto',
  },
  divider: {
    height: '1px',
    width: ITEM_WIDTH,
    borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
    margin: '0px 0px 15px 0px',
    boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.1)',
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
  const { classes, userCardSetDatabase, userCardCollections, isLoggedIn } = props;

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
        <div className={classes.divider} />
        {sortState.sortedDatabase.map(userCardSet => (
          <EditDeckListItem
            key={userCardSet.id}
            category={userCardSet.category}
            subCategory={userCardSet.subCategory}
            iconClass={userCardSet.subCategoryClass}
            setName={userCardSet.setName}
            totalCards={userCardSet.cards.length}
            url={`/my-collections/${userCardSet.subCategoryId}`}
          />
        ))}
      </div>
    );
  }
  return (
    <div className={classes.EditDeckList}>
      <div className={classes.menuBar}>
        <h2>Edit Decks</h2>
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
      <div className={classes.divider} />
      {userCardSetDatabase.map(userCardSet => (
        <EditDeckListItem
          key={userCardSet.id}
          category={userCardSet.category}
          subCategory={userCardSet.subCategory}
          iconClass={userCardSet.subCategoryClass}
          setName={userCardSet.setName}
          totalCards={userCardSet.cards.length}
          url={`/my-collections/${userCardSet.subCategoryId}`}
        />
      ))}
    </div>
  );
}

export default withStyles(styles)(EditDeckList);
