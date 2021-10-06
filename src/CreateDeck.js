import React, { useState } from 'react';
import { withStyles } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import IconList from './IconList';

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
  const [isShowingIconList, setIsShowingIconList] = useState(true);

  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }
  return (
    <div className={classes.createDeckWrapper}>
      {isShowingIconList && (
        <IconList />
      )}
    </div>
  );
}

export default withStyles(styles)(CreateDeck);
