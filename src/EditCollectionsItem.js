import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core';
import { doc, updateDoc, deleteField } from 'firebase/firestore/lite';
import useInputState from './hooks/useInputState';
import db from './firebase.config';
import styles from './styles/EditCollectionsItemStyles';
import EditingDecksTabItem from './EditingDecksTabItem';
import EditingCardsTabItem from './EditingCardsTabItem';
import EditingDecksTabItemMobile from './EditingDecksTabItemMobile';
import EditingCardsTabItemMobile from './EditingCardsTabItemMobile';
import EditCollectionsItemFilled from './EditCollectionsItemFilled';

function EditCollectionsItem(props) {
  // State for editing an individual deck
  const [isEditing, setIsEditing] = useState(false);
  const [setNameInput, updateSetNameInput, setInputValue] = useInputState(props.setName);
  const [categoryInput, updateCategoryInput, setCategoryValue] = useInputState(props.category);

  // State for the IconListModal
  const [selectedIcon, setSelectedIcon] = useState('');
  const [selectedIconClass, setSelectedIconClass] = useState(props.userCardSet.iconClass);
  const [isShowingModal, setIsShowingModal] = useState(false);

  // Destructured Props
  const {
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
    deleteDeckFilter,
    handleAddCardClick,
    setIsAddingCard,
    isMobile,
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
    deleteDeckFilter(setName);
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
      setIsAddingCard(false);
      setIsViewingCardsState({ isViewing: false, cardSet: {}, setName: '' });
      setIsAnimatingCardItem(true);
    }
  };

  if (isEditing) {
    return (
      <EditCollectionsItemFilled
        uid={uid}
        isMobile={isMobile}
        setNameInput={setNameInput}
        updateSetNameInput={updateSetNameInput}
        categoryInput={categoryInput}
        updateCategoryInput={updateCategoryInput}
        selectedIcon={selectedIcon}
        selectedIconClass={selectedIconClass}
        setSelectedIconClass={setSelectedIconClass}
        setOpenSnackbar={setOpenSnackbar}
        setSnackbarMessage={setSnackbarMessage}
        setSelectedIcon={setSelectedIcon}
        mastery={mastery}
        totalCards={totalCards}
        fetchUserCardSets={fetchUserCardSets}
        setIsEditing={setIsEditing}
        userCardSet={userCardSet}
      />
    );
  }
  if (isEditingCardsTab) {
    return (
      <>
        {isMobile && (
        <EditingCardsTabItemMobile
          userCardSet={userCardSet}
          handleViewCardsClick={handleViewCardsClick}
          handleAddCardClick={handleAddCardClick}
          isViewingCardsState={isViewingCardsState}
          isShowingModal={isShowingModal}
          isMobile={isMobile}
          totalCards={totalCards}
        />
        )}
        {!isMobile && (
        <EditingCardsTabItem
          userCardSet={userCardSet}
          handleViewCardsClick={handleViewCardsClick}
          handleAddCardClick={handleAddCardClick}
          isViewingCardsState={isViewingCardsState}
          isShowingModal={isShowingModal}
          isMobile={isMobile}
          totalCards={totalCards}
        />
        )}
      </>
    );
  }
  if (isEditingDecksTab) {
    return (
      <>
        {isMobile && (
        <EditingDecksTabItemMobile
          userCardSet={userCardSet}
          handleDeleteClick={handleDeleteClick}
          handleDeleteConfirm={handleDeleteConfirm}
          handleEditClick={handleEditClick}
          handleModalHide={handleModalHide}
          isShowingModal={isShowingModal}
          isMobile={isMobile}
          totalCards={totalCards}
        />
        )}
        {!isMobile && (
        <EditingDecksTabItem
          userCardSet={userCardSet}
          handleDeleteClick={handleDeleteClick}
          handleDeleteConfirm={handleDeleteConfirm}
          handleEditClick={handleEditClick}
          handleModalHide={handleModalHide}
          isShowingModal={isShowingModal}
          isMobile={isMobile}
          totalCards={totalCards}
        />
        )}
      </>
    );
  }
}

export default withStyles(styles)(EditCollectionsItem);
