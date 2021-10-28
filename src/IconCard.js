import React from 'react';
import { withStyles } from '@material-ui/core';

const styles = {
  IconCardOuter: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: props => (props.isEditDeckButton ? '50px' : '110px'),
    height: props => (props.isEditDeckButton ? '50px' : '110px'),

  },
  IconCardInner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: props => (props.isEditDeckButton ? '50px' : '95px'),
    height: props => (props.isEditDeckButton ? '50x' : '95px'),
    color: 'rgba(0, 0, 0, .6)',
    borderRadius: '10px',
    transition: 'all .2s',
    '& i': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all .12s',
      fontSize: props => (props.isEditDeckButton ? '1.5rem' : '36px'),
      margin: '0px 0px 0px 0px',
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
      boxShadow: props => (!props.isEditDeckButton && '0px 2px 5px 1px rgba(0, 0, 0, 0.3)'),
    },
  },
  IconCardInnerSelected: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
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
    handleHideIcons,
  } = props;

  const handleClick = () => {
    setSelectedIcon(iconName);
    setSelectedIconClass(iconClass);
    handleHideIcons();
  };

  if (props.disabled) {
    return (
      <div className={classes.IconCardDisplay}>
        <i className={iconClass} />
        <p>{iconName}</p>
      </div>
    );
  }
  if (props.isEditDeckButton) {
    return (
      <div className={classes.IconCardOuter}>
        <div className={classes.IconCardInner} onClick={props.selectedIconAction}>
          <i className={iconClass} />
        </div>
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
