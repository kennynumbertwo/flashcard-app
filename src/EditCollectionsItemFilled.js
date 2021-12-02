import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core';
import { doc, setDoc } from 'firebase/firestore/lite';
import TextField from '@mui/material/TextField';
import db from './firebase.config';
import IconListModal from './IconListModal';
import IconCard from './IconCard';
import ProgressBarVert from './ProgressBarVert';
import styles from './styles/EditCollectionsItemBlankStyles';

function EditCollectionsItemFilled(props) {
  // Destructured Props
  const {
    classes,
    uid,
    userCardSet,
    fetchUserCardSets,
    setOpenSnackbar,
    setSnackbarMessage,
    isMobile,
    selectedIcon,
    setSelectedIcon,
    setSelectedIconClass,
    selectedIconClass,
    totalCards,
    mastery,
    setIsEditing,
    setNameInput,
    updateSetNameInput,
    categoryInput,
    updateCategoryInput,
  } = props;
  const { setName } = userCardSet;
  // State for the IconListModal

  const [isShowingIconList, setIsShowingIconList] = useState(false);
  const [isAnimatingModal, setIsAnimatingModal] = useState(false);

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [setNameInput, categoryInput]);

  const handleKeydown = (e) => {
    if (e.key === 'Enter') {
      handleSaveDeck();
    }
    if (e.key === 'Escape') {
      handleCancelClick();
    }
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

  // Click handler for the Cancel Button
  const handleCancelClick = () => {
    setIsEditing(false);
  };

  // Click handler for the Save button when editing a deck
  const handleSaveDeck = async () => {
    setOpenSnackbar(true);
    setSnackbarMessage('Deck Saved');
    let updatedCardSet = {
      ...userCardSet,
      setName: setNameInput,
      category: categoryInput,
      id: setNameInput.replace(/\s+/g, '-').toLowerCase(),
      iconClass: selectedIconClass,
    };
    if (updatedCardSet.cards.length) {
      let updatedCards = [];
      updatedCardSet.cards.forEach(card => {
        card = { ...card,
          setName: setNameInput,
          category: categoryInput,
          iconClass: selectedIconClass,
        };
        updatedCards.push(card);
      });
      updatedCardSet = { ...updatedCardSet, cards: updatedCards };
    }
    try {
      const userRef = doc(db, 'users', uid);
      await setDoc(userRef, { [updatedCardSet.id]: updatedCardSet }, { merge: true });
      if (updatedCardSet.setName !== setName) {
        const updateString = `${setName.toLowerCase().replace(/\s+/g, '-')}`;
        await updateDoc(
          userRef, { [updateString]: deleteField() },
        );
      }
    } catch (error) {
      console.log(error);
    }
    setIsEditing(false);
    fetchUserCardSets();
  };

  if (isMobile) {
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
            value={setNameInput}
            onChange={updateSetNameInput}
            size="small"
          />
        </div>
        <div className={classes.categoryWrapperInput}>
          <TextField
            label="Category"
            id="category"
            value={categoryInput}
            onChange={updateCategoryInput}
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
              <div className={classes.EditCollectionsItemIcon}>
                <IconCard
                  iconClass={selectedIconClass}
                  iconName={selectedIcon}
                  selectedIconAction={handleShowIcons}
                  isEditDeckButton
                />
              </div>
            )}
          <p className={classes.iconLabelMobile}>Icon</p>
        </div>
        <div className={classes.bottomWrapper}>
          <div className={classes.buttonWrapper}>
            <button className={classes.buttonCancel} type="button" onClick={handleCancelClick}>Cancel</button>
          </div>
          <div className={classes.buttonWrapper}>
            <button className={classes.buttonSave} type="button" onClick={handleSaveDeck}>Save</button>
          </div>
        </div>
      </div>
    );
  }
  if (!isMobile) {
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
            value={setNameInput}
            onChange={updateSetNameInput}
            size="small"
          />
        </div>
        <div className={classes.categoryWrapperInput}>
          <TextField
            label="Category"
            id="category"
            value={categoryInput}
            onChange={updateCategoryInput}
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
              <div className={classes.EditCollectionsItemIcon}>
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
          <div className={classes.masteryWrapperInner}>
            {mastery && mastery.masteryPercentage ? (
              <ProgressBarVert progressPercent={mastery.masteryPercentage} width={12} height={25} />)
              : <ProgressBarVert progressPercent={0} width={12} height={25} />}
            <p className={classes.masteryInfo}>{mastery && mastery.masteryPercentage ? `${mastery.masteryPercentage}%` : '-'}</p>
          </div>
        </div>
        <div className={classes.totalCardsWrapper}>
          <p className={classes.info}>{totalCards}</p>
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
}

export default withStyles(styles)(EditCollectionsItemFilled);
