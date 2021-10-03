import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore/lite';
import { withStyles } from '@material-ui/core';
import DrawerNav from './DrawerNav';
import db from './firebase.config';

const styles = {
  root: {
    width: '100%',
    height: '100%',
    backgroundImage: 'linear-gradient(#f0f7f7, #e9f0f0)',
  },
};

function MainContainer(props) {
  const [cardSetDatabase, setCardSetDatabase] = useState([]);
  const [cardCollections, setCardCollections] = useState([]);
  const [pendingSetName, setPendingSetName] = useState('');
  const [selectedSetIndex, setselectedSetIndex] = useState(0);
  const [currentCardSetName, setCurrentCardSetName] = useState('');
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
        .findIndex(element => element.subCategory === cardSet.subCategory);
      if (index < 0) {
        collections.push({
          category: cardSet.category,
          subCategory: cardSet.subCategory,
          setNames: [{ cardSetName: cardSet.setName, cardSetId: cardSet.id }],
          subCategoryId: `${cardSet.subCategory.toLowerCase().replace(/\s+/g, '-')}`,
        });
      } else {
        let updatedCollections = [...collections];
        updatedCollections[index].setNames
          .push({ cardSetName: cardSet.setName, cardSetId: cardSet.id });
        collections = updatedCollections;
      }
    });
    return setCardCollections(collections);
  };

  const updateCardSetName = (nameToFind) => (setCurrentCardSetName(nameToFind));

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
  };

  const denyPendingSetName = () => {
    setPendingSetName('');
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
      />
    </div>
  );
}

export default withStyles(styles)(MainContainer);
