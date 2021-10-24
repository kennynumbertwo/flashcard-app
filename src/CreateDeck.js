import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { doc, setDoc, updateDoc } from 'firebase/firestore/lite';
import IconList from './IconList';
import IconCard from './IconCard';
import db from './firebase.config';

const styles = {
  CreateDeckWrapper: {
    marginTop: '24px',
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid black',
  },
  CreateDeckCard: {
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

function CreateDeck(props) {
  // Destructured props from DrawerNav
  const { classes, isLoggedIn, uid, fetchUserCardSets } = props;
  // State
  const [isShowingIconList, setIsShowingIconList] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState('');
  const [selectedIconClass, setSelectedIconClass] = useState('');
  // Text Inputs
  const [deckFields, setDeckFields] = useState({
    setName: '',
    category: '',
    iconClass: '',
    id: '',
    owner: uid,
    cards: '',
  });

  useEffect(() => {
    setDeckFields({ ...deckFields,
      id: deckFields.setName.replace(/\s+/g, '-').toLowerCase(),
      iconClass: selectedIconClass,
    });
  }, [deckFields.setName, selectedIconClass]);

  const handleShowIcons = () => {
    setIsShowingIconList(!isShowingIconList);
  };

  const handleChange = (e) => {
    setDeckFields({ ...deckFields, [e.target.id]: e.target.value });
  };

  const handleSaveDeck = async () => {
    const userRef = doc(db, 'users', uid);
    await setDoc(userRef, { [deckFields.id]: deckFields }, { merge: true });
    fetchUserCardSets();
  };

  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }
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
    <div className={classes.CreateDeckWrapper}>
      <div className={classes.CreateDeckCard}>
        <h4>Pick a name for the new deck:</h4>
        <TextField id="setName" label="Deck Name" variant="standard" onChange={handleChange} value={deckFields.setName} />
        <TextField id="category" label="Category" variant="standard" onChange={handleChange} value={deckFields.category} />
        <div className={classes.selectIconWrapper}>
          <IconCard
            iconClass={selectedIconClass}
            iconName={selectedIcon}
            disabled
          />
          <button onClick={handleShowIcons} type="button">Select Icon</button>
          <button onClick={handleSaveDeck} type="button">Save Deck</button>
        </div>
      </div>
      {/* <AddCardForm uid={uid} fetchUserCardSets={fetchUserCardSets} /> */}
    </div>
  );
}

export default withStyles(styles)(CreateDeck);
