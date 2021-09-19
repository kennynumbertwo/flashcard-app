import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import { collection, getDocs } from 'firebase/firestore/lite';
import Flashcard from './Flashcard';
import DrawerNav from './DrawerNav';
import useToggle from './hooks/useToggle';
import styles from './styles/FlashcardTrayStyles';
import db from './firebase.config';

function FlashcardTray(props) {
  const [flashcards, setFlashcards] = useState({});
  const [shuffledDeck, setShuffledDeck] = useState([]);
  const [deckLength, setDeckLength] = useState(1);
  const [cardCount, setCardCount] = useState(0);
  const [showAnswer, toggleShowAnswer] = useToggle(false);
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    fetchCards();
    setLoading(false);
  }, []);

  const fetchCards = async () => {
    let cardArray = [];
    const cardSet = collection(db, 'cardSets');
    const cardData = await getDocs(cardSet);
    cardData.docs.map(card => cardArray.push([...cardArray, card.data()]));
    return setFlashcards(...cardArray[0]);
  };

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

  const drawCard = () => {
    setCardCount(cardCount + 1);
    if (showAnswer) {
      toggleShowAnswer();
    }
  };

  const start = () => {
    setCardCount(0);
    setDeckLength(flashcards.cards.length);
    const shuffled = (shuffleDeck(flashcards.cards));
    setShuffledDeck(shuffled);
    setStarted(true);
  };

  const startOver = () => {
    setCardCount(0);
    setDeckLength(flashcards.cards.length);
    const shuffled = (shuffleDeck(flashcards.cards));
    setShuffledDeck(shuffled);
  };

  const { classes } = props;
  const { cards, setName } = flashcards;

  if (loading) {
    return <h1>loading data...</h1>;
  }

  return (
    <div className={classes.root}>
      <DrawerNav />
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
    </div>
  );
}

export default withStyles(styles)(FlashcardTray);
