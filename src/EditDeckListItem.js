import React from 'react';
import { withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

const styles = {
  EditDeckListCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '1000px',
    height: '50px',
    padding: '0px 0px 0px 0px',
    margin: '5px 0px 5px 0px',
    borderRadius: '2px',
    // boxShadow: '0px 1px 5px 1px rgba(0, 0, 0, 0.1)',
    color: 'rgba(0, 0, 0, 0.7)',
    backgroundColor: 'rgba(250, 250, 250, 0)',
    fontSize: '1rem',
    transition: 'all .2s',
    textDecoration: 'none',
    '&:hover': {
      boxShadow: '0px 2px 5px 1px rgba(0, 0, 0, 0.3)',
      backgroundColor: 'white',
    },
  },
  labelWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20%',
    height: '50px',
  },
  label: {
    margin: '0px 10px 0px 0px',
  },
  totalCardsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '10%',
    height: '50px',
  },
  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '10%',
    height: '50px',
  },
  EditDeckListItemIcon: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
  },
  buttonWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '50px',
    width: '10%',
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    textDecoration: 'none',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: '.8rem',
    fontWeight: '500',
    background: 'rgba(0, 0, 0, 0.6)',
    width: '80px',
    height: '30px',
    border: '1.5px solid rgba(0, 0, 0, 0.0)',
    transition: 'all 0.4s ease 0s',
    borderRadius: '5px',
    '&:hover': {
      background: 'rgba(7, 177, 77, 0.7)',
      borderColor: 'rgba(7, 177, 77, 0.7)',
      transition: 'all 0.4s ease 0s',
      cursor: 'pointer',
    },
  },
};

function EditDeckListItem(props) {
  const { classes, subCategory, url, updateCardSetName, category, setName, totalCards } = props;
  return (
    <div className={classes.EditDeckListCard}>

      <div className={classes.labelWrapper}>
        <p className={classes.info}>{setName}</p>
      </div>
      <div className={classes.labelWrapper}>
        <p className={classes.info}>{subCategory}</p>
      </div>
      <div className={classes.labelWrapper}>
        <p className={classes.info}>{category}</p>
      </div>
      <div className={classes.totalCardsWrapper}>
        <p className={classes.info}>{totalCards}</p>
      </div>
      <div className={classes.iconWrapper}>
        <div className={classes.EditDeckListItemIcon}>
          <i className={props.iconClass} />
        </div>
      </div>
      <div className={classes.buttonWrapper}>
        <button className={classes.button} type="button">Edit Deck</button>
      </div>
      <div className={classes.buttonWrapper}>
        <button className={classes.button} type="button">Add Cards</button>
      </div>
    </div>
  );
}

export default withStyles(styles)(EditDeckListItem);
