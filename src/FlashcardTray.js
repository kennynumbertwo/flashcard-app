import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import { collection, getDocs } from 'firebase/firestore/lite';
import Flashcard from './Flashcard';
import DrawerNav from './DrawerNav';
import useToggle from './hooks/useToggle';
import styles from './styles/FlashcardTrayStyles';
import db from './firebase.config';
import Modal from './Modal';

function FlashcardTray(props) {
  const [cardSetDatabase, setCardSetDatabase] = useState([]);
  const [cardCollections, setCardCollections] = useState([]);
  const [flashcards, setFlashcards] = useState([]);
  const [shuffledDeck, setShuffledDeck] = useState([]);
  const [deckLength, setDeckLength] = useState(1);
  const [cardCount, setCardCount] = useState(0);
  const [showAnswer, toggleShowAnswer] = useToggle(false);
  const [isShowingModal, toggleModal] = useToggle(false);
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [selectedSet, setselectedSet] = useState(0);

  // Fetches cards from Firebase on first render and set's them to the cardSetDatabase
  useEffect(() => {
    fetchCards();
    setLoading(false);
  }, []);

  // Sets flashcards to the selectedSet
  useEffect(() => {
    getCardCollections();
    getFlashcards(selectedSet);
  }, [cardSetDatabase, selectedSet]);

  // Function to fetch the Firebase DB and set it to cardSetDatabase
  const fetchCards = async () => {
    let cardArray = [];
    const cardSet = collection(db, 'cardSets');
    const cardData = await getDocs(cardSet);
    cardData.docs.map(card => cardArray.push(card.data()));
    return setCardSetDatabase(cardArray);
  };

  // Set the specified flashcard deck, if it exists
  const getFlashcards = (index) => {
    let flashcardsToSet = [];
    if (cardSetDatabase[index]) {
      flashcardsToSet = cardSetDatabase[index].cards;
    }
    return (setFlashcards(flashcardsToSet));
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

  // Finds the cardSet selected from the DrawerNav
  const findCardSet = (e) => {
    const nameToFind = e.target.textContent.toLowerCase();
    let indexToSet;
    cardSetDatabase.forEach(cardSet => {
      if (cardSet.id === nameToFind) {
        indexToSet = cardSetDatabase.indexOf(cardSet);
      }
    });
    toggleModal();
    return setselectedSet(indexToSet);
  };

  // Function to shuffle the deck
  const shuffleDeck = (array) => {
    let m = array.length;
    let t;
    let i;
    // While there remain elements to shuffle…
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
  };

  // Function to see the next card in shuffledDeck
  const drawCard = () => {
    setCardCount(cardCount + 1);
    if (showAnswer) {
      toggleShowAnswer();
    }
  };

  // Initializes the selected deck
  const start = () => {
    setCardCount(0);
    setDeckLength(flashcards.length);
    const shuffled = (shuffleDeck(flashcards));
    setShuffledDeck(shuffled);
    setStarted(true);
  };

  // Reshuffles the deck once you've drawn all cards
  const startOver = () => {
    setCardCount(0);
    setDeckLength(flashcards.length);
    const shuffled = (shuffleDeck(flashcards));
    setShuffledDeck(shuffled);
  };

  const { classes } = props;
  const { setName } = flashcards;

  if (loading) {
    return <h1>loading data...</h1>;
  }

  return (
    <div className={classes.root}>

      <DrawerNav
        cardSetDatabase={cardSetDatabase}
        cardCollections={cardCollections}
        findCardSet={findCardSet}
      />
      <h2>{setName}</h2>
      {started && <h4>Card {cardCount + 1} of {deckLength}</h4>}
      <div className={classes.FlashcardContainer}>
        {started
          ? (
            <Flashcard
              question={shuffledDeck[cardCount].question}
              answer={shuffledDeck[cardCount].answer}
              showAnswer={showAnswer}
            />
          )
          : (
            <Button
              className={classes.startButton}
              variant="contained"
              type="button"
              onClick={start}
            >
              Start
            </Button>
          )}
      </div>
      {started
      && (
      <div className={classes.buttonContainer}>
        <Button
          className={classes.showButton}
          variant="contained"
          onClick={toggleShowAnswer}
        >{showAnswer ? 'Hide Answer' : 'Show Answer'}

        </Button>
        {(cardCount + 1) !== deckLength
          ? (
            <Button
              className={classes.nextButton}
              variant="contained"
              type="button"
              onClick={drawCard}
            >
              Next Question
            </Button>
          )
          : (
            <Button
              className={classes.startOverButton}
              variant="contained"
              color="secondary"
              type="button"
              onClick={startOver}
            >
              Start Over
            </Button>
          )}
      </div>
      )}
      <Modal
        isShowing={isShowingModal}
        hide={toggleModal}
      />
    </div>
  );
}

export default withStyles(styles)(FlashcardTray);
