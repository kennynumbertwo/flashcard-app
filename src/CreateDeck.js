import React, { useState } from 'react';
import { withStyles } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import IconList from './IconList';
import IconCard from './IconCard';

const styles = {
  createDeckWrapper: {
    marginTop: '24px',
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

function CreateDeck(props) {
  // Destructured props from DrawerNav
  const { classes, isLoggedIn } = props;
  const [isShowingIconList, setIsShowingIconList] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState('');
  const [selectedIconClass, setSelectedIconClass] = useState('');

  const handleShowIcons = () => {
    setIsShowingIconList(!isShowingIconList);
  };

  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }
  return (
    <div className={classes.createDeckWrapper}>
      <div className={classes.selectIconWrapper}>
        <IconCard
          iconClass={selectedIconClass}
          iconName={selectedIcon}
        />
        <button onClick={handleShowIcons} type="button">Show Icons</button>
      </div>
      {isShowingIconList && (
        <IconList
          selectedIcon={selectedIcon}
          setSelectedIcon={setSelectedIcon}
          setSelectedIconClass={setSelectedIconClass}
          handleShowIcons={handleShowIcons}
        />
      )}
    </div>
  );
}

export default withStyles(styles)(CreateDeck);
