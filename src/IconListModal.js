import React, { useState } from 'react';
import { withStyles } from '@material-ui/core';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import IconCard from './IconCard';
import icons from './icons';
import styles from './styles/IconListModalStyles';

const ITEM_HEIGHT = 48;

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

const iconPerPage = 40;

const pageNum = Math.ceil(icons.length / iconPerPage);

const getPageList = (array) => {
  let pageArray = [];
  for (let i = 0; i < pageNum; i++) {
    let page = [...array.slice((i * iconPerPage), ((i + 1) * iconPerPage))];
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

  // Destructured props from CreateDeck
  const {
    classes,
    selectedIcon,
    setSelectedIcon,
    setSelectedIconClass,
    handleHideIcons,
    isAnimatingModal,
    isMobile,
  } = props;

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
    <div className={`${classes.IconListModal} ${isAnimatingModal ? 'IconModalFadeIn' : 'IconModalFadeOut'}`}>
      <div className={classes.IconListCard}>
        <div className={classes.filterWrapper}>
          <CloseIcon onClick={handleHideIcons} />
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
                width: '30ch',
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
        <div className={classes.iconsWrapperOuter}>
          <div className={classes.iconsWrapperInner}>
            {!isFiltered && pageList[showPageNum].map(icon => (
              <IconCard
                key={icon.name}
                iconClass={icon.class}
                iconName={icon.name}
                iconFilter={icon.filter}
                selectedIcon={selectedIcon}
                setSelectedIcon={setSelectedIcon}
                setSelectedIconClass={setSelectedIconClass}
                handleHideIcons={handleHideIcons}
                isMobile={isMobile}
              />
            ))}
            {isFiltered && filteredArray.map(icon => (
              <IconCard
                key={icon.name}
                iconClass={icon.class}
                iconName={icon.name}
                iconFilter={icon.filter}
                selectedIcon={selectedIcon}
                setSelectedIcon={setSelectedIcon}
                setSelectedIconClass={setSelectedIconClass}
                handleHideIcons={handleHideIcons}
                isMobile={isMobile}
              />
            ))}
          </div>
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
