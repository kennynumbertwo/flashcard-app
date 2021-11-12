import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core';
import { doc, updateDoc, deleteField, setDoc } from 'firebase/firestore/lite';
import TextField from '@mui/material/TextField';
import useInputState from './hooks/useInputState';
import db from './firebase.config';
import IconListModal from './IconListModal';
import IconCard from './IconCard';
import styles from './styles/EditCollectionsItemStyles';
import ProgressBarVert from './ProgressBarVert';
import Modal from './Modal';

function EditCollectionsItem(props) {
  // State for editing an individual deck
  const [isEditing, setIsEditing] = useState(false);
  const [setNameInput, updateSetNameInput, setInputValue] = useInputState(props.setName);
  const [categoryInput, updateCategoryInput, setCategoryValue] = useInputState(props.category);
  // State for the IconListModal
  const [isShowingIconList, setIsShowingIconList] = useState(false);
  const [isAnimatingModal, setIsAnimatingModal] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState('');
  const [selectedIconClass, setSelectedIconClass] = useState(props.userCardSet.iconClass);
  const [isShowingModal, setIsShowingModal] = useState(false);

  // Destructured Props
  const {
    classes,
    totalCards,
    uid,
    deleteUserDatabaseSet,
    userCardSet,
    fetchUserCardSets,
    isEditingDecksTab,
    isEditingCardsTab,
    setIsViewingCardsState,
    isViewingCardsState,
    setOpenSnackbar,
    setSnackbarMessage,
    setIsAnimatingCardItem,
  } = props;
  const { setName, category, iconClass, mastery } = userCardSet;

  // Click handler for the Edit Deck button
  const handleEditClick = () => {
    setIsEditing(!isEditing);
    setInputValue(setName);
    setCategoryValue(category);
    setSelectedIconClass(iconClass);
  };

  // Changes isEditing to false when tab changes
  useEffect(() => {
    if (!isEditingDecksTab) {
      setIsEditing(false);
    }
  }, [isEditingCardsTab]);

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

  // Click handler for the Save button when editing a deck
  const handleSaveClick = async () => {
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

  // Click handler for the Delete button
  const handleDeleteClick = async () => {
    setIsShowingModal(true);
  };

  // Click handler for the Delete button
  const handleDeleteConfirm = async () => {
    const userRef = doc(db, 'users', uid);
    const updateString = `${setName.toLowerCase().replace(/\s+/g, '-')}`;
    setOpenSnackbar(true);
    setSnackbarMessage('Deck Deleted');
    deleteUserDatabaseSet(setName);
    await updateDoc(
      userRef, { [updateString]: deleteField() },
    );
  };

  const handleModalHide = () => {
    setIsShowingModal(false);
  };

  // Click handler for the Delete button
  const handleViewCardsClick = () => {
    if (!isViewingCardsState.isViewing) {
      setIsAnimatingCardItem(true);
      setIsViewingCardsState({ isViewing: true, cardSet: { ...userCardSet }, setName });
    } else {
      setIsViewingCardsState({ isViewing: false, cardSet: {}, setName: '' });
      setIsAnimatingCardItem(true);
    }
  };

  if (isEditing) {
    return (
      <div className={classes.EditCollectionsItemCard}>
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
            id="outlined-size-small"
            value={setNameInput}
            onChange={updateSetNameInput}
            size="small"
          />
        </div>
        <div className={classes.categoryWrapperInput}>
          <TextField
            label="Category"
            id="outlined-size-small"
            value={categoryInput}
            onChange={updateCategoryInput}
            size="small"
          />
        </div>
        <div className={classes.iconWrapperEditing}>
          <div className={classes.EditingCollectionsItemIcon}>
            <IconCard
              iconClass={selectedIconClass}
              iconName={selectedIcon}
              selectedIconAction={handleShowIcons}
              isEditDeckButton
            />
          </div>
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
          <button className={classes.buttonCancel} type="button" onClick={handleEditClick}>Cancel</button>
        </div>
        <div className={classes.buttonWrapper}>
          <button className={classes.buttonSave} type="button" onClick={handleSaveClick}>Save</button>
        </div>
      </div>
    );
  }
  if (isEditingCardsTab) {
    return (
      <div className={classes.EditCollectionsItemCard}>
        <div className={classes.setNameWrapper}>
          <p className={classes.info}>{setName}</p>
        </div>
        <div className={classes.categoryWrapper}>
          <p className={classes.info}>{category}</p>
        </div>
        <div className={classes.iconWrapper}>
          <div className={classes.EditCollectionsItemIcon}>
            <i className={iconClass} />
          </div>
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
        <div className={classes.buttonWrapperSingle}>
          <button className={classes.button} type="button" onClick={handleViewCardsClick}>{isViewingCardsState.isViewing ? 'Hide Cards' : 'View Cards'}</button>
        </div>
      </div>
    );
  }
  if (isEditingDecksTab) {
    return (
      <div className={classes.EditCollectionsItemCard}>
        <div className={classes.setNameWrapper}>
          <p className={classes.info}>{setName}</p>
        </div>
        <div className={classes.categoryWrapper}>
          <p className={classes.info}>{category}</p>
        </div>
        <div className={classes.iconWrapper}>
          <div className={classes.EditCollectionsItemIcon}>
            <i className={iconClass} />
          </div>
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
          <button className={classes.button} type="button" onClick={handleEditClick}>Edit Deck</button>
        </div>
        <div className={classes.buttonWrapper}>
          <button className={classes.deleteButton} type="button" onClick={handleDeleteClick}>Delete</button>
        </div>
        <Modal
          isShowing={isShowingModal}
          buttonText={<i className="fas fa-thumbs-up" style={{ fontSize: '1.2rem' }} />}
          secondButton
          secondButtonText={<i className="fas fa-thumbs-down" style={{ fontSize: '1.2rem' }} />}
          messageText={`Are you sure you want to delete the ${setName} deck from your collection?`}
          buttonAction={handleDeleteConfirm}
          hide={handleModalHide}
        />
      </div>
    );
  }
}

export default withStyles(styles)(EditCollectionsItem);
