import React, { useState } from 'react';
import { withStyles } from '@material-ui/core';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
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
    padding: '20px 50px 20px 50px',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '600px',
    height: '750px',
    backgroundColor: 'white',
    borderRadius: '5px',
    boxShadow: '0px 5px 10px 3px rgba(0, 0, 0, 0.3)',
  },
};

const getIconNames = (iconList) => {
  let filters = ['Clear Filter'];
  iconList.forEach(icon => {
    if (!filters.includes(icon.filter)) {
      filters.push(icon.filter);
    }
  });
  filters.sort((a, b) => (a > b ? 1 : -1));
  return filters;
};

const options = getIconNames(icons);

function IconList(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedFilter, setSelectedFilter] = useState('');
  const open = Boolean(anchorEl);
  const { classes } = props;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    if (e.target.role === 'menuitem') {
      if (e.target.innerText === 'Clear Filter') {
        setSelectedFilter('');
      } else {
        setSelectedFilter(e.target.innerText);
      }
    }
    setAnchorEl(null);
  };
  return (
    <div className={classes.IconListWrapper}>
      <div>
        <Button
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            '&:hover': {
              backgroundColor: 'rgba(7, 177, 77, 1)',
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
              maxHeight: ITEM_HEIGHT * 4.5,
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
      <div className={classes.IconListCard}>
        {icons.map(icon => {
          let filtered;
          if (icon.filter === selectedFilter || selectedFilter === '') {
            filtered = (
              <IconCard
                key={icon.name}
                iconClass={icon.class}
                iconName={icon.name}
                iconFilter={icon.filter}
              />
            );
          }
          return filtered;
        })}
      </div>
    </div>
  );
}

export default withStyles(styles)(IconList);
