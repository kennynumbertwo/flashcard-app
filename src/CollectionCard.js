import React from 'react';
import { withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '300px',
    height: '200px',
    padding: '0px 0px 0px 0px',
    margin: '10px 20px 20px 10px',
    borderRadius: '10px',
    boxShadow: '0px 5px 10px 3px rgba(0, 0, 0, 0.3)',
    color: 'rgba(0, 0, 0, 0.7)',
    backgroundColor: 'white',
    fontSize: '1.3rem',
    transition: 'all .2s',
    textDecoration: 'none',
    '& i': {
      transition: 'all .12s',
    },
    '&:hover': {
      cursor: 'pointer',
      color: 'rgba(7, 177, 77, 1)',
    },
  },
  CollectionCardIcon: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '5.5rem',
  },
  CollectionCardName: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '5px 0 25px',
    padding: 0,
  },
};

function CollectionCard(props) {
  const { classes, cardText, url, updateCardSetName } = props;
  return (
    <Link
      className={classes.root}
      to={url}
      onClick={updateCardSetName && (() => updateCardSetName(cardText))}
    >
      <div className={classes.CollectionCardIcon}>
        <i className={props.iconClass} />
      </div>
      <div>
        <h4 className={classes.CollectionCardName}>{cardText}</h4>
      </div>
    </Link>
  );
}

export default withStyles(styles)(CollectionCard);
