import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore/lite';
import { withStyles } from '@material-ui/core';
import DrawerNav from './DrawerNav';
import db from './firebase.config';

const styles = {
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: 'var(--background-primary)',
  },
};

function MainContainer(props) {
  const [cardSetDatabase, setCardSetDatabase] = useState([]);
  const [cardCollections, setCardCollections] = useState([]);
  const [currentCardSetName, setCurrentCardSetName] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetches cards from Firebase on first render and set's them to the cardSetDatabase
  useEffect(() => {
    fetchStockCards();
    setLoading(false);
  }, []);

  // Sets flashcards to the selectedSetIndex
  useEffect(() => {
    setCardCollections(getCardCollections(cardSetDatabase));
  }, [cardSetDatabase]);

  // Function to fetch the Firebase DB and set it to cardSetDatabase
  const fetchStockCards = async () => {
    let cardArray = [];
    const cardSet = collection(db, 'stockDecks');
    const cardData = await getDocs(cardSet);
    cardData.docs.map(card => cardArray.push(card.data()));
    return setCardSetDatabase(cardArray);
  };

  // Gets the data structure needed to display the categories within the DrawerNav
  const getCardCollections = (arr) => {
    let collections = [];
    arr.forEach(cardSet => {
      const index = collections
        .findIndex(element => element.category === cardSet.category);
      if (index < 0) {
        collections.push({
          category: cardSet.category,
          iconClass: cardSet.iconClass,
          setNames: [{ cardSetName: cardSet.setName, cardSetId: cardSet.id }],
          categoryId: `${cardSet.category.toLowerCase().replace(/\s+/g, '-')}`,
        });
      } else {
        let updatedCollections = [...collections];
        updatedCollections[index].setNames
          .push({ cardSetName: cardSet.setName, cardSetId: cardSet.id });
        collections = updatedCollections;
      }
    });
    collections.sort((a, b) => (a.category > b.category ? 1 : -1));
    return collections;
  };

  const updateCardSetName = (nameToFind) => (setCurrentCardSetName(nameToFind));

  const { classes } = props;
  return (
    <div className={classes.root}>
      <DrawerNav
        fetchStockCards={fetchStockCards}
        cardSetDatabase={cardSetDatabase}
        cardCollections={cardCollections}
        updateCardSetName={updateCardSetName}
        currentCardSetName={currentCardSetName}
        setCurrentCardSetName={setCurrentCardSetName}
        getCardCollections={getCardCollections}
        loading={loading}
      />
    </div>
  );
}

export default withStyles(styles)(MainContainer);
