import React, { useState } from 'react';
import { withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { doc, updateDoc, deleteField, setDoc } from 'firebase/firestore/lite';
import TextField from '@mui/material/TextField';
import useInputState from './hooks/useInputState';
import db from './firebase.config';
import IconListModal from './IconListModal';
import IconCard from './IconCard';
import styles from './styles/EditDeckListItemStyles';

function EditDeckListItem(props) {
  // State for editing an individual deck
  const [isEditing, setIsEditing] = useState(false);
  const [setNameInput, updateSetNameInput, setInputValue] = useInputState(props.setName);
  const [categoryInput, updateCategoryInput, setCategoryValue] = useInputState(props.category);
  // State for the IconListModal
  const [isShowingIconList, setIsShowingIconList] = useState(false);
  const [isAnimatingModal, setIsAnimatingModal] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState('');
  const [selectedIconClass, setSelectedIconClass] = useState(props.userCardSet.iconClass);

  // Destructured Props
  const {
    classes,
    totalCards,
    setEditDeckState,
    uid,
    deleteUserDatabaseSet,
    userCardSet,
    fetchUserCardSets,
    isAddingCards,
  } = props;
  const { setName, category, iconClass, mastery } = userCardSet;

  // Click handler for the Edit Deck button
  const handleEditClick = () => {
    setIsEditing(!isEditing);
    setInputValue(setName);
    setCategoryValue(category);
    setSelectedIconClass(iconClass);
  };

  // Click handler for the Add Cards button
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
    }, 230);
  };

  // Click handler for the Save button when editing a deck
  const handleSaveClick = async () => {
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
            defaultValue={setName}
            value={setNameInput}
            onChange={updateSetNameInput}
            size="small"
          />
        </div>
        <div className={classes.categoryWrapperInput}>
          <TextField
            label="Category"
            id="outlined-size-small"
            defaultValue={category}
            value={categoryInput}
            onChange={updateCategoryInput}
            size="small"
          />
        </div>
        <div className={classes.iconWrapperEditing}>
          <div className={classes.EditingDeckListItemIcon}>
            <IconCard
              iconClass={selectedIconClass}
              iconName={selectedIcon}
              selectedIconAction={handleShowIcons}
              isEditDeckButton
            />
          </div>
        </div>
        <div className={classes.masteryWrapper}>
          <p className={classes.info}>100%</p>
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
  if (isAddingCards) {
    return (
      <div className={classes.EditDeckListCard}>
        <div className={classes.setNameWrapper}>
          <p className={classes.info}>{setName}</p>
        </div>
        <div className={classes.categoryWrapper}>
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
          <button className={classes.button} type="button" onClick={handleEditClick}>Add Cards</button>
        </div>
        <div className={classes.buttonWrapper}>
          <button className={classes.button} type="button" onClick={handleAddClick}>Delete Cards</button>
        </div>
      </div>
    );
  }
  return (
    <div className={classes.EditDeckListCard}>
      <div className={classes.setNameWrapper}>
        <p className={classes.info}>{setName}</p>
      </div>
      <div className={classes.categoryWrapper}>
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
        <button className={classes.button} type="button" onClick={handleEditClick}>Edit Deck</button>
      </div>
      <div className={classes.buttonWrapper}>
        <button className={classes.button} type="button" onClick={handleDeleteClick}>Delete</button>
      </div>
    </div>
  );
}

export default withStyles(styles)(EditDeckListItem);
