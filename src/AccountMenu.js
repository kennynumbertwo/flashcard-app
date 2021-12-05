import * as React from 'react';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Divider from '@material-ui/core/Divider';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { withStyles } from '@material-ui/core';
import styles from './styles/AccountMenuStyles';

function AccountMenu(props) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = () => {
    setOpen(false);
    logoutUser();
    setOpen(false);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  const { classes, logoutUser, isLoggedIn, user } = props;

  if (isLoggedIn) {
    return (
      <div className={classes.accountMenuWrapper}>
        <Button
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          sx={{ width: '30px', height: '36px', minWidth: '36px', borderRadius: '50px' }}
        >
          <AccountCircleIcon className={classes.accountIcon} sx={{ fontSize: '1.9rem' }} />
        </Button>
        <Popper
          className={classes.popper}
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                    placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClickAway}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={() => handleListKeyDown}
                  >
                    {isLoggedIn && (
                      <div>
                        <div className={classes.signedInAsWrapper}>
                          <p className={classes.signedInAs}>Signed in as:</p>
                          <p className={classes.signedInAsEmail}>{user.email}</p>
                        </div>
                        <div className={classes.dividerWrapper}>
                          <Divider />
                        </div>
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                      </div>
                    )}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    );
  }
  return null;
}

export default withStyles(styles)(AccountMenu);
