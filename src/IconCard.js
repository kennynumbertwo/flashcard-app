import React from 'react';
import { withStyles } from '@material-ui/core';
import styles from './styles/IconCardStyles';

function IconCard(props) {
  const {
    classes,
    iconClass,
    iconName,
    selectedIcon,
    setSelectedIcon,
    setSelectedIconClass,
    handleHideIcons,
    isMobile,
  } = props;

  // Click handler for selecting an icon
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
        {!isMobile && (
          <p>{iconName}</p>
        )}
      </div>
      )}
      {selectedIcon !== iconName && (
      <div className={classes.IconCardInner} onClick={handleClick}>
        <i className={iconClass} />
        {!isMobile && (
          <p>{iconName}</p>
        )}
      </div>
      )}
    </div>

  );
}

export default withStyles(styles)(IconCard);
