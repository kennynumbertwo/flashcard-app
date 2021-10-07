import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import IconCard from './IconCard';
import icons from './icons';

const ITEM_HEIGHT = 48;

const styles = {
  root: {
    color: 'red',
  },
  IconListWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    // border: '1px solid black',
    // backgroundColor: 'rgba(0, 0 ,0 , .2)',
  },
  IconListCard: {
    display: 'flex',
    padding: '20px 30px 20px 30px',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    width: '1000px',
    height: '700px',
    backgroundColor: 'white',
    borderRadius: '5px',
    boxShadow: '0px 5px 10px 3px rgba(0, 0, 0, 0.3)',
  },
  filterWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItem: 'center',
    // border: '1px solid black',
    paddingBottom: '0px',
    width: '98%',
  },
  iconsWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItem: 'center',
    width: '100%',
    height: '600px',
    // border: '1px solid black',
  },
  pageNavWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '50px',
    // border: '1px solid black',

  },
  pageNavArrowWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '35px',
    width: '35px',
    padding: '0px 0px 0px 0px',
    margin: '0px 15px 0px 15px',
    // border: '1px solid black',
    borderRadius: '50px',
    transition: 'all .5s',
    color: 'rgba(0, 0, 0, .6)',
    '& i': {
      transition: 'all .5s',
    },
    '&:hover': {
      cursor: 'pointer',
      color: 'rgba(7, 177, 77, 1)',
      boxShadow: '0px 2px 5px 1px rgba(0, 0, 0, 0.3)',
    },
  },
};

const getIconNames = (iconList) => {
  let filters = [];
  iconList.forEach(icon => {
    if (!filters.includes(icon.filter)) {
      filters.push(icon.filter);
    }
  });
  filters.sort((a, b) => (a > b ? 1 : -1));
  return filters;
};

const options = getIconNames(icons);

const pageNum = Math.ceil(icons.length / 40);

const getPageList = (array) => {
  let pageArray = [];
  for (let i = 0; i < pageNum; i++) {
    let page = [...array.slice((i * 40), ((i + 1) * 40))];
    pageArray.push(page);
  }
  return pageArray;
};

const pageList = getPageList(icons);

function IconList(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [showPageNum, setShowPageNum] = useState(0);
  const [filteredArray, setFilteredArray] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const open = Boolean(anchorEl);
  const { classes } = props;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const filterPage = (array, filter) => {
    let filtered = [];
    array.forEach(icon => {
      if (icon.filter === filter) {
        filtered.push(icon);
      }
    });
    return filtered;
  };

  const handleRightClick = () => {
    if (showPageNum < pageNum - 1) {
      setShowPageNum(showPageNum + 1);
    }
  };

  const handleLeftClick = () => {
    if (showPageNum > 0) {
      setShowPageNum(showPageNum - 1);
    }
  };

  const handleClose = (e) => {
    if (e.target.role === 'menuitem') {
      if (e.target.innerText === 'Clear Filter') {
        setSelectedFilter('');
        setIsFiltered(false);
      } else {
        let selected = filterPage(icons, e.target.innerText);
        selected.sort((a, b) => (a.name > b.name ? 1 : -1));
        setFilteredArray(selected);
        setSelectedFilter(e.target.innerText);
        setIsFiltered(true);
      }
    }
    setAnchorEl(null);
  };

  return (
    <div className={classes.IconListWrapper}>
      <div className={classes.IconListCard}>
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
            Filter
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
        <div className={classes.iconsWrapper}>
          {!isFiltered && pageList[showPageNum].map(icon => (
            <IconCard
              key={icon.name}
              iconClass={icon.class}
              iconName={icon.name}
              iconFilter={icon.filter}
            />
          ))}
          {isFiltered && filteredArray.map(icon => (
            <IconCard
              key={icon.name}
              iconClass={icon.class}
              iconName={icon.name}
              iconFilter={icon.filter}
            />
          ))}
        </div>
        <div className={classes.pageNavWrapper}>
          <div className={classes.pageNavArrowWrapper}>
            <ChevronLeftIcon fontSize="large" onClick={handleLeftClick} />
          </div>
          <div className={classes.pageNavArrowWrapper}>
            <ChevronRightIcon fontSize="large" onClick={handleRightClick} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default withStyles(styles)(IconList);
