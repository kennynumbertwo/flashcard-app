import React, { useState } from 'react';
import { withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { doc, updateDoc, deleteField, setDoc } from 'firebase/firestore/lite';
import TextField from '@mui/material/TextField';
import useInputState from './hooks/useInputState';
import db from './firebase.config';

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
  masteryWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20%',
    height: '50px',
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
  buttonCancel: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    textDecoration: 'none',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: '.8rem',
    fontWeight: '500',
    background: 'rgba(245, 0, 86, 0.6)',
    width: '80px',
    height: '30px',
    border: '1.5px solid rgba(245, 0, 86, 0.6)',
    transition: 'all 0.4s ease 0s',
    borderRadius: '5px',
    '&:hover': {
      background: 'rgba(245, 0, 86, 0.9)',
      borderColor: 'rgba(245, 0, 86, 0.9)',
      transition: 'all 0.4s ease 0s',
      cursor: 'pointer',
    },
  },
  buttonSave: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    textDecoration: 'none',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: '.8rem',
    fontWeight: '500',
    background: 'rgba(7, 177, 77, 0.6)',
    width: '80px',
    height: '30px',
    border: '1.5px solid rgba(7, 177, 77, 0.8)',
    transition: 'all 0.4s ease 0s',
    borderRadius: '5px',
    '&:hover': {
      background: 'rgba(7, 177, 77, 0.8)',
      borderColor: 'rgba(7, 177, 77, 0.8)',
      transition: 'all 0.4s ease 0s',
      cursor: 'pointer',
    },
  },
  buttonLink: {
    textDecoration: 'none',
  },
};

function EditDeckListItem(props) {
  const {
    classes,
    category,
    setName,
    totalCards,
    iconClass,
    setEditDeckState,
    mastery,
    uid,
    addUserDatabaseSet,
    deleteUserDatabaseSet,
    userCardSet,
    fetchUserCardSets,
  } = props;

  const [isEditing, setIsEditing] = useState(false);
  const [setNameInput, updateSetNameInput, resetSetName, setInputValue] = useInputState(setName);
  const [
    categoryInput, updateCategoryInput, resetCategory, setCategoryValue] = useInputState(category);

  const handleEditClick = () => {
    // setEditDeckState({
    //   deckToEdit: {
    //     setName,
    //     category,
    //     iconClass,
    //     totalCards,
    //     mastery,
    //   },
    //   deckToAddCards: {} });
    setIsEditing(!isEditing);
    setInputValue(setName);
    setCategoryValue(category);
  };

  const handleAddClick = () => {
    setEditDeckState({
      deckToAddCards: {
        setName,
        category,
        iconClass,
        totalCards,
        mastery,
      },
      deckToEdit: {},
    });
  };

  const handleSaveClick = async () => {
    let updatedCardSet = {
      ...userCardSet,
      setName: setNameInput,
      category: categoryInput,
      id: setNameInput.replace(/\s+/g, '-').toLowerCase(),
    };
    if (updatedCardSet.cards.length) {
      let updatedCards = [];
      updatedCardSet.cards.forEach(card => {
        card = { ...card, setName: setNameInput, category: categoryInput };
        updatedCards.push(card);
      });
      updatedCardSet = { ...updatedCardSet, cards: updatedCards };
    }
    const userRef = doc(db, 'users', uid);
    await setDoc(userRef, { [updatedCardSet.id]: updatedCardSet }, { merge: true });
    if (updatedCardSet.setName !== setName) {
      const updateString = `${setName.toLowerCase().replace(/\s+/g, '-')}`;
      await updateDoc(
        userRef, { [updateString]: deleteField() },
      );
    }
    setIsEditing(!isEditing);
    fetchUserCardSets();
  };

  const handleDeleteClick = async () => {
    const userRef = doc(db, 'users', uid);
    const updateString = `${setName.toLowerCase().replace(/\s+/g, '-')}`;
    deleteUserDatabaseSet(setName);
    await updateDoc(
      userRef, { [updateString]: deleteField() },
    );
  };

  if (isEditing) {
    return (
      <div className={classes.EditDeckListCard}>
        <div className={classes.labelWrapper}>
          <TextField
            label="Set Name"
            id="outlined-size-small"
            defaultValue={setName}
            value={setNameInput}
            onChange={updateSetNameInput}
            size="small"
          />
        </div>
        <div className={classes.labelWrapper}>
          <TextField
            label="Category"
            id="outlined-size-small"
            defaultValue={category}
            value={categoryInput}
            onChange={updateCategoryInput}
            size="small"
          />
        </div>
        <div className={classes.iconWrapper}>
          <div className={classes.EditDeckListItemIcon}>
            <i className={iconClass} />
          </div>
        </div>
        <div className={classes.masteryWrapper}>
          <p className={classes.info}>100%</p>
        </div>
        <div className={classes.totalCardsWrapper}>
          <p className={classes.info}>{totalCards}</p>
        </div>
        <div className={classes.buttonWrapper}>
          {/* <Link className={classes.buttonLink} to={`edit-deck/${setName.toLowerCase()}`}> */}
          <button className={classes.buttonCancel} type="button" onClick={handleEditClick}>Cancel</button>
          {/* </Link> */}
        </div>
        <div className={classes.buttonWrapper}>
          <button className={classes.buttonSave} type="button" onClick={handleSaveClick}>Save</button>
        </div>
        <div className={classes.buttonWrapper}>
          <button className={classes.button} type="button" onClick={handleDeleteClick}>Delete</button>
        </div>
      </div>
    );
  }
  return (
    <div className={classes.EditDeckListCard}>
      <div className={classes.labelWrapper}>
        <p className={classes.info}>{setName}</p>
      </div>
      <div className={classes.labelWrapper}>
        <p className={classes.info}>{category}</p>
      </div>
      <div className={classes.iconWrapper}>
        <div className={classes.EditDeckListItemIcon}>
          <i className={iconClass} />
        </div>
      </div>
      <div className={classes.masteryWrapper}>
        <p className={classes.info}>100%</p>
      </div>
      <div className={classes.totalCardsWrapper}>
        <p className={classes.info}>{totalCards}</p>
      </div>
      <div className={classes.buttonWrapper}>
        {/* <Link className={classes.buttonLink} to={`edit-deck/${setName.toLowerCase()}`}> */}
        <button className={classes.button} type="button" onClick={handleEditClick}>Edit Deck</button>
        {/* </Link> */}
      </div>
      <div className={classes.buttonWrapper}>
        <Link className={classes.buttonLink} to={`edit-deck/${setName.toLowerCase()}/add-cards`}>
          <button className={classes.button} type="button" onClick={handleAddClick}>Add Cards</button>
        </Link>
      </div>
      <div className={classes.buttonWrapper}>
        <button className={classes.button} type="button" onClick={handleDeleteClick}>Delete</button>
      </div>
    </div>
  );
}

export default withStyles(styles)(EditDeckListItem);
