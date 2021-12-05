import React from 'react';
import { withStyles } from '@material-ui/core';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import Zoom from '@mui/material/Zoom';

const ITEM_HEIGHT = 48;

const styles = {

};

function CategoryFilter(props) {
  const {
    open,
    handleClose,
    filterOptions,
    anchorEl,
    setAnchorEl,
    filterState,
    selectedFilter,
  } = props;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <Tooltip TransitionComponent={Zoom} title="Filter by Category">
        <Button
          sx={{
            backgroundColor: 'rgba(250, 250, 250, 0.0)',
            color: anchorEl !== null ? 'var(--text-accept)' : 'var(--text-primary)',
            height: '35px',
            width: '30px',
            '& span': {
              width: '40px',
              marginLeft: 'auto',
              marginRight: 'auto',
            },
            '&:hover': {
              backgroundColor: 'rgba(250, 250, 250, 0.0)',
            },
          }}
          id="demo-customized-button"
          aria-controls="demo-customized-menu"
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          variant="contained"
          disableElevation
          onClick={handleClick}
        >
          <i className="fas fa-filter" sx={{ fontSize: '0.8rem' }} />
        </Button>
      </Tooltip>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 5.5,
            zIndex: 1,
          },
        }}
      >
        {filterState.showClearFilter && (
        <MenuItem key="clear-filter" onClick={() => handleClose('Clear Filter')}>
          Clear Filter
        </MenuItem>
        )}
        {filterOptions.map((option) => (
          <MenuItem key={option} selected={option === selectedFilter} onClick={() => handleClose(option)}>
            {option}
          </MenuItem>
        ))}
        {filterOptions.length === 0 && <MenuItem key="no-decks">No Decks</MenuItem>}
      </Menu>
    </>
  );
}

export default withStyles(styles)(CategoryFilter);
