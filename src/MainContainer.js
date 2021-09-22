import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore/lite';
import DrawerNav from './DrawerNav';
import db from './firebase.config';
import useToggle from './hooks/useToggle';

function MainContainer() {
  const [cardSetDatabase, setCardSetDatabase] = useState([]);
  const [cardCollections, setCardCollections] = useState([]);
  const [selectedSet, setselectedSet] = useState(0);
  const [currentCardSetName, setCurrentCardSetName] = useState('');
  const [isShowingModal, toggleModal] = useToggle(false);
  const [loading, setLoading] = useState(true);

  // Fetches cards from Firebase on first render and set's them to the cardSetDatabase
  useEffect(() => {
    fetchCards();
    setLoading(false);
  }, []);

  // Sets flashcards to the selectedSet
  useEffect(() => {
    getCardCollections();
    // getFlashcards(selectedSet);
  }, [cardSetDatabase, selectedSet]);

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
    return (setCurrentCardSetName(nameToFind));
  };

  const findCardSet = () => {
    let indexToSet;
    cardSetDatabase.forEach(cardSet => {
      if (cardSet.id === currentCardSetName.toLowerCase()) {
        indexToSet = cardSetDatabase.indexOf(cardSet);
      }
    });
    toggleModal();
    return setselectedSet(indexToSet);
  };

  return (
    <div>
      <DrawerNav
        cardSetDatabase={cardSetDatabase}
        cardCollections={cardCollections}
        updateCardSetName={updateCardSetName}
        currentCardSetName={currentCardSetName}
        selectedSet={selectedSet}
        loading={loading}
        isShowingModal={isShowingModal}
        toggleModal={toggleModal}
        findCardSet={findCardSet}
      />
    </div>
  );
}

export default MainContainer;
