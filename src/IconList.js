import React, { useState } from 'react';
import { withStyles } from '@material-ui/core';
import icons from './icons';
import IconCard from './IconCard';

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

function IconList(props) {
  const { classes } = props;
  return (
    <div className={classes.IconListWrapper}>
      <div className={classes.IconListCard}>
        {icons.map(icon => (
          <IconCard
            iconClass={icon.class}
            iconName={icon.name}
            iconFilter={icon.filter}
          />
        ))}
      </div>
    </div>
  );
}

export default withStyles(styles)(IconList);
