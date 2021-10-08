import React from 'react';
import { withStyles } from '@material-ui/core';

const styles = {
  IconCardOuter: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    // border: '1px solid black',
    width: '110px',
    height: '110px',

  },
  IconCardInner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    // border: '1px solid black',
    width: '95px',
    height: '95px',
    color: 'rgba(0, 0, 0, .6)',
    borderRadius: '10px',
    transition: 'all .2s',
    '& i': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all .12s',
      fontSize: '36px',
      margin: '0px 0px 0px 0px',
      // border: '1px solid black',
      height: '60%',
    },
    '& p': {
      display: 'flex',
      padding: '0px 0px 0px 0px',
      margin: '0px 0px 0px 0px',
    },
    '&:hover': {
      cursor: 'pointer',
      color: 'rgba(7, 177, 77, 1)',
      boxShadow: '0px 2px 5px 1px rgba(0, 0, 0, 0.3)',
    },
  },
  IconCardInnerSelected: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    // border: '1px solid black',
    width: '95px',
    height: '95px',
    color: 'rgba(7, 177, 77, 1)',
    boxShadow: '0px 2px 5px 1px rgba(0, 0, 0, 0.3)',
    borderRadius: '10px',
    transition: 'all .2s',
    '& i': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all .12s',
      fontSize: '36px',
      margin: '0px 0px 0px 0px',
      // border: '1px solid black',
      height: '60%',
    },
    '& p': {
      display: 'flex',
      padding: '0px 0px 0px 0px',
      margin: '0px 0px 0px 0px',
    },
    '&:hover': {
      cursor: 'pointer',
    },
  },
  IconCardDisplay: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    // border: '1px solid black',
    width: '95px',
    height: '95px',
    color: 'rgba(0, 0, 0, .6)',
    borderRadius: '10px',
    transition: 'all .2s',
    '& i': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all .12s',
      fontSize: '36px',
      margin: '0px 0px 0px 0px',
      // border: '1px solid black',
      height: '60%',
    },
    '& p': {
      display: 'flex',
      padding: '0px 0px 0px 0px',
      margin: '0px 0px 0px 0px',
    },
  },
};

function IconCard(props) {
  const {
    classes,
    iconClass,
    iconName,
    selectedIcon,
    setSelectedIcon,
    setSelectedIconClass,
    handleShowIcons,
  } = props;

  const handleClick = () => {
    setSelectedIcon(iconName);
    setSelectedIconClass(iconClass);
    handleShowIcons();
  };

  if (props.disabled) {
    return (
      <div className={classes.IconCardDisplay}>
        <i className={iconClass} />
        <p>{iconName}</p>
      </div>
    );
  }
  return (
    <div className={classes.IconCardOuter}>
      {selectedIcon === iconName && (
      <div className={classes.IconCardInnerSelected} onClick={handleClick}>
        <i className={iconClass} />
        <p>{iconName}</p>
      </div>
      )}
      {selectedIcon !== iconName && (
      <div className={classes.IconCardInner} onClick={handleClick}>
        <i className={iconClass} />
        <p>{iconName}</p>
      </div>
      )}
    </div>

  );
}

export default withStyles(styles)(IconCard);
