import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore/lite';
import { withStyles } from '@material-ui/core';
import DrawerNav from './DrawerNav';
import db from './firebase.config';
import useToggle from './hooks/useToggle';

const styles = {
  root: {

  },
};

function MainContainer(props) {
  const [cardSetDatabase, setCardSetDatabase] = useState([]);
  const [cardCollections, setCardCollections] = useState([]);
  const [pendingSetName, setPendingSetName] = useState('');
  const [selectedSetIndex, setselectedSetIndex] = useState(0);
  const [currentCardSetName, setCurrentCardSetName] = useState('');
  const [isShowingModal, toggleModal] = useToggle(false);
  const [loading, setLoading] = useState(true);

  // Fetches cards from Firebase on first render and set's them to the cardSetDatabase
  useEffect(() => {
    fetchCards();
    setLoading(false);
  }, []);

  // Sets flashcards to the selectedSetIndex
  useEffect(() => {
    getCardCollections();
    // getFlashcards(selectedSetIndex);
  }, [cardSetDatabase, selectedSetIndex]);

  useEffect(() => {
    findCardSet();
  }, [currentCardSetName]);

  // Function to fetch the Firebase DB and set it to cardSetDatabase
  const fetchCards = async () => {
    let cardArray = [];
    const cardSet = collection(db, 'cardSets');
    const cardData = await getDocs(cardSet);
    cardData.docs.map(card => cardArray.push(card.data()));
    return setCardSetDatabase(cardArray);
  };

  // Gets the data structure needed to display the categories within the DrawerNav
  const getCardCollections = () => {
    let collections = [];
    cardSetDatabase.forEach(cardSet => {
      const index = collections
        .findIndex(element => element.collectionName === cardSet.subCategory);
      if (index < 0) {
        collections.push({
          collectionName: cardSet.subCategory,
          categories: [cardSet.setName],
          id: `${cardSet.subCategory.replace(/\s+/g, '-')}` });
      } else {
        let updatedCollections = [...collections];
        updatedCollections[index].categories.push(cardSet.setName);
        collections = updatedCollections;
      }
    });
    return setCardCollections(collections);
  };

  const updateCardSetName = (e) => {
    const nameToFind = e.target.textContent;
    console.log(nameToFind);
    toggleModal();
    return (setPendingSetName(nameToFind));
  };

  const findCardSet = () => {
    let indexToSet;
    cardSetDatabase.forEach(cardSet => {
      if (cardSet.id === currentCardSetName.toLowerCase()) {
        indexToSet = cardSetDatabase.indexOf(cardSet);
      }
    });
    return setselectedSetIndex(indexToSet);
  };

  const confirmPendingSetName = () => {
    setCurrentCardSetName(pendingSetName);
    // toggleModal();
  };

  const denyPendingSetName = () => {
    setPendingSetName('');
    // toggleModal();
  };

  const { classes } = props;
  return (
    <div className={classes.root}>
      <DrawerNav
        cardSetDatabase={cardSetDatabase}
        cardCollections={cardCollections}
        updateCardSetName={updateCardSetName}
        currentCardSetName={currentCardSetName}
        findCardSet={findCardSet}
        selectedSetIndex={selectedSetIndex}
        pendingSetName={pendingSetName}
        confirmPendingSetName={confirmPendingSetName}
        denyPendingSetName={denyPendingSetName}
        loading={loading}
        isShowingModal={isShowingModal}
        toggleModal={toggleModal}
      />
    </div>
  );
}

export default withStyles(styles)(MainContainer);
