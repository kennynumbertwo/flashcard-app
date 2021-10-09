import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore/lite';
import IconList from './IconList';
import IconCard from './IconCard';
import db from './firebase.config';

const styles = {
  AddCardFormWrapper: {
    marginTop: '24px',
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid black',
  },
  AddCardFormCard: {
    display: 'flex',
    padding: '20px 30px 20px 30px',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    width: '1000px',
    height: '700px',
    backgroundColor: 'white',
    borderRadius: '5px',
    boxShadow: '0px 5px 10px 3px rgba(0, 0, 0, 0.3)',
  },
};

function AddCardForm(props) {
  // Destructured props from DrawerNav
  const { classes, isLoggedIn, uid } = props;
  // State
  const [isShowingIconList, setIsShowingIconList] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState('');
  const [selectedIconClass, setSelectedIconClass] = useState('');
  // Text Inputs
  const [cardFields, setCardFields] = useState({
    question: '',
    answer: '',
    altText: '',
    cardSetIconClass: '',
    id: 'fender-guitars',
  });

  useEffect(() => {
    setCardFields({ ...cardFields,
      cardSetIconClass: selectedIconClass,
    });
  }, [selectedIconClass]);

  const handleShowIcons = () => {
    setIsShowingIconList(!isShowingIconList);
  };

  const handleChange = (e) => {
    setCardFields({ ...cardFields, [e.target.id]: e.target.value });
  };

  const handleSaveCard = async () => {
    const userRef = doc(db, 'users', uid);
    const updateString = `${cardFields.id}.cards`;
    await updateDoc(userRef, { [updateString]: arrayUnion(cardFields) });
  };

  const handleDeleteCard = async () => {
    const userRef = doc(db, 'users', uid);
    const updateString = `${cardFields.id}.cards`;
    await updateDoc(userRef, { [updateString]: arrayRemove([0]) });
  };

  if (isShowingIconList) {
    return (
      <IconList
        selectedIcon={selectedIcon}
        setSelectedIcon={setSelectedIcon}
        setSelectedIconClass={setSelectedIconClass}
        handleShowIcons={handleShowIcons}
      />
    );
  }
  return (
    <div className={classes.AddCardFormDeckWrapper}>
      <div className={classes.AddCardFormCard}>
        <TextField id="question" label="Question" variant="standard" onChange={handleChange} value={cardFields.question} />
        <TextField id="answer" label="Answer" variant="standard" onChange={handleChange} value={cardFields.answer} />
        <TextField id="altText" label="Alt Text" variant="standard" onChange={handleChange} value={cardFields.altText} />

        <div className={classes.selectIconWrapper}>
          <IconCard
            iconClass={selectedIconClass}
            iconName={selectedIcon}
          />
          <button onClick={handleShowIcons} type="button">Select Icon</button>
          <button onClick={handleSaveCard} type="button">Save Card</button>
          <button onClick={handleDeleteCard} type="button">Delete Card</button>
        </div>
      </div>
    </div>
  );
}

export default withStyles(styles)(AddCardForm);
