import React from 'react';
import { withStyles } from '@material-ui/core';

const styles = {
  IconCardOuter: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    // border: '1px solid black',
    width: '80px',
    height: '80px',
  },
  IconCardInner: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    // border: '1px solid black',
    width: '65px',
    height: '65px',
    borderRadius: '10px',
    transition: 'all .2s',
    '& i': {
      transition: 'all .12s',
      fontSize: '50px',
    },
    '&:hover': {
      cursor: 'pointer',
      color: 'rgba(7, 177, 77, 1)',
      boxShadow: '0px 2px 5px 1px rgba(0, 0, 0, 0.3)',
    },
  },
};

function IconCard(props) {
  const { classes, iconClass } = props;
  return (
    <div className={classes.IconCardOuter}>
      <div className={classes.IconCardInner}>
        <i className={iconClass} />
      </div>
    </div>

  );
}

export default withStyles(styles)(IconCard);
