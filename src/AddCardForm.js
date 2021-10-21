import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore/lite';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
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
  const { classes, isLoggedIn, uid, fetchUserCardSets, editDeckState } = props;
  // State
  const [isShowingIconList, setIsShowingIconList] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState('');
  const [selectedIconClass, setSelectedIconClass] = useState('');
  // Snackbar
  const [open, setOpen] = React.useState(false);
  // Text Inputs
  const [cardFields, setCardFields] = useState({
    question: '',
    answer: '',
    subCategoryClass: editDeckState.deckToAddCards.subCategoryClass,
    setName: editDeckState.deckToAddCards.setName,
    category: editDeckState.deckToAddCards.category,
    subCategory: editDeckState.deckToAddCards.subCategory,
  });

  // useEffect(() => {
  //   setCardFields({ ...cardFields,
  //     subCategoryClass: selectedIconClass,
  //   });
  // }, [selectedIconClass]);

  const handleShowIcons = () => {
    setIsShowingIconList(!isShowingIconList);
  };

  const handleChange = (e) => {
    setCardFields({ ...cardFields, [e.target.id]: e.target.value });
  };

  const handleSaveCard = async () => {
    const userRef = doc(db, 'users', uid);
    const updateString = `${editDeckState.deckToAddCards.setName.toLowerCase().replace(/\s+/g, '-')}.cards`;
    await updateDoc(userRef, { [updateString]: arrayUnion(cardFields) });
    setOpen(true);
    setCardFields({ question: '', answer: '', subCategoryClass: '' });
    fetchUserCardSets();
  };

  const handleDeleteCard = async () => {
    const userRef = doc(db, 'users', uid);
    const updateString = `${editDeckState.deckToAddCards.replace(/\s+/g, '-')}.cards`;
    await updateDoc(userRef, { [updateString]: arrayRemove([0]) });
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

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

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
            disabled
          />
          <button onClick={handleShowIcons} type="button">Select Icon</button>
          <button onClick={handleSaveCard} type="button">Save Card</button>
          <button onClick={handleDeleteCard} type="button">Delete Card</button>
        </div>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message="Card Added!"
        action={action}
      />
    </div>

  );
}

export default withStyles(styles)(AddCardForm);
