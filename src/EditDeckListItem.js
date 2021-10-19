import React from 'react';
import { withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

const styles = {
  EditDeckListCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '95%',
    height: '50px',
    padding: '0px 0px 0px 0px',
    margin: '5px 40px 5px 20px',
    borderRadius: '10px',
    boxShadow: '0px 1px 5px 1px rgba(0, 0, 0, 0.1)',
    color: 'rgba(0, 0, 0, 0.7)',
    backgroundColor: 'white',
    fontSize: '0.9rem',
    transition: 'all .2s',
    textDecoration: 'none',
    '& i': {
      // transition: 'all .12s',
    },
    '& p': {

    },
    '&:hover': {
      cursor: 'pointer',
      color: 'rgba(7, 177, 77, 1)',
      boxShadow: '0px 2px 5px 1px rgba(0, 0, 0, 0.3)',
    },
  },
  labelWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    margin: '0px 10px 0px 0px',
  },
  info: {

  },
  EditDeckListItemIcon: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
  },
};

function EditDeckListItem(props) {
  const { classes, subCategory, url, updateCardSetName, category, setName, totalCards } = props;
  return (
    <Link
      className={classes.EditDeckListCard}
      to={url}
      onClick={updateCardSetName && (() => updateCardSetName(subCategory))}
    >
      <div className={classes.labelWrapper}>
        <p className={classes.label}>Set Name:</p>
        <p className={classes.info}>{setName}</p>
      </div>
      <div className={classes.labelWrapper}>
        <p className={classes.label}>Sub Category:</p>
        <p className={classes.info}>{subCategory}</p>
      </div>
      <div className={classes.labelWrapper}>
        <p className={classes.label}>Category:</p>
        <p className={classes.info}>{category}</p>
      </div>
      <div className={classes.labelWrapper}>
        <p className={classes.label}>Total Cards:</p>
        <p className={classes.info}>{totalCards}</p>
      </div>
      <div className={classes.labelWrapper}>
        <p className={classes.label}>Icon:</p>
        <div className={classes.EditDeckListItemIcon}>
          <i className={props.iconClass} />
        </div>
      </div>
      <div className={classes.buttonWrapper}>
        <button type="button">Edit Deck</button>
        <button type="button">Add Cards</button>
      </div>
    </Link>
  );
}

export default withStyles(styles)(EditDeckListItem);
