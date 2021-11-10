import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core';
import { doc, setDoc } from 'firebase/firestore/lite';
import TextField from '@mui/material/TextField';
import db from './firebase.config';
import IconListModal from './IconListModal';
import IconCard from './IconCard';
import styles from './styles/EditCollectionsItemBlankStyles';

function EditCollectionsItemBlank(props) {
  // State for the IconListModal
  const [isShowingIconList, setIsShowingIconList] = useState(false);
  const [isAnimatingModal, setIsAnimatingModal] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState('');
  const [selectedIconClass, setSelectedIconClass] = useState('');
  const [deckFields, setDeckFields] = useState({
    setName: '',
    category: '',
    iconClass: '',
    id: '',
    owner: props.uid,
    cards: '',
    mastery: {},
  });

  // Destructured Props
  const {
    classes,
    uid,
    fetchUserCardSets,
    setIsAddingDeck,
    setOpenSnackbar,
    setSnackbarMessage,
  } = props;

  useEffect(() => {
    setDeckFields({ ...deckFields,
      id: deckFields.setName.replace(/\s+/g, '-').toLowerCase(),
      iconClass: selectedIconClass,
    });
  }, [deckFields.setName, selectedIconClass]);

  // Click handler for the Add Cards button
  const handleCancelClick = () => {
    setIsAddingDeck(false);
  };

  // Click handler for showing the IconListModal when Editing Deck
  const handleShowIcons = () => {
    setIsShowingIconList(!isShowingIconList);
    setIsAnimatingModal(true);
  };

  // Click handler for hiding the IconListModal
  const handleHideIcons = () => {
    setIsAnimatingModal(false);
    setTimeout(() => {
      setIsShowingIconList(!isShowingIconList);
    }, 140);
  };

  const handleSaveDeck = async () => {
    const userRef = doc(db, 'users', uid);
    await setDoc(userRef, { [deckFields.id]: deckFields }, { merge: true });
    fetchUserCardSets();
    setIsAddingDeck(false);
    setOpenSnackbar(true);
    setSnackbarMessage('Deck Added');
  };

  const handleChange = (e) => {
    setDeckFields({ ...deckFields, [e.target.id]: e.target.value });
  };

  return (
    <div className={classes.EditCollectionsItemBlankCard}>
      {isShowingIconList && (
        <IconListModal
          selectedIcon={selectedIcon}
          setSelectedIcon={setSelectedIcon}
          setSelectedIconClass={setSelectedIconClass}
          handleShowIcons={handleShowIcons}
          handleHideIcons={handleHideIcons}
          isAnimatingModal={isAnimatingModal}
        />
      )}
      <div className={classes.setNameWrapperInput}>
        <TextField
          label="Set Name"
          id="setName"
          value={deckFields.setName}
          onChange={handleChange}
          size="small"
        />
      </div>
      <div className={classes.categoryWrapperInput}>
        <TextField
          label="Category"
          id="category"
          value={deckFields.category}
          onChange={handleChange}
          size="small"
        />
      </div>
      <div className={classes.iconWrapperEditing}>
        {selectedIconClass === '' ? (
          <div className={classes.EditCollectionsItemBlankIcon}>
            <IconCard
              iconClass="far fa-times-circle"
              iconName={selectedIcon}
              selectedIconAction={handleShowIcons}
              isEditDeckButton
            />
          </div>
        )
          : (
            <div className={classes.EditCollectionsItemBlankIcon}>
              <IconCard
                iconClass={selectedIconClass}
                iconName={selectedIcon}
                selectedIconAction={handleShowIcons}
                isEditDeckButton
              />
            </div>
          )}
      </div>
      <div className={classes.masteryWrapper}>
        <p className={classes.info}>-</p>
      </div>
      <div className={classes.totalCardsWrapper}>
        <p className={classes.info}>-</p>
      </div>
      <div className={classes.buttonWrapper}>
        <button className={classes.buttonCancel} type="button" onClick={handleCancelClick}>Cancel</button>
      </div>
      <div className={classes.buttonWrapper}>
        <button className={classes.buttonSave} type="button" onClick={handleSaveDeck}>Save</button>
      </div>
    </div>
  );
}

export default withStyles(styles)(EditCollectionsItemBlank);
