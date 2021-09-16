import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import Flashcard from './Flashcard';
import DrawerNav from './DrawerNav';
import styles from './styles/FlashcardTrayStyles';

function FlashcardTray(props) {
  const [flashcards, setFlashcards] = useState(
    {
      setName: 'React',
      cards: [
        { question: 'What is my favorite color?', answer: 'Black' },
        { question: "What is my pet's name?", answer: 'Mika' },
        { question: "What's my age again?", answer: 34 },
        { question: 'How may jackets do you own?', answer: 12 },
      ],
    },
  );
  const [shuffledDeck, setShuffledDeck] = useState([]);
  const [cardCount, setCardCount] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [shuffling, setShuffling] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let shuffled = shuffleDeck(flashcards.cards);
    setShuffledDeck([...shuffled]);
    if (!mounted) {
      setMounted(true);
    }
  }, [shuffling]);

  const drawCard = () => {
    setCardCount(cardCount + 1);
    setShowAnswer(false);
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

  const startOver = () => {
    setCardCount(0);
    setShuffling(shuffling + 1);
  };

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  const { classes } = props;
  const { cards, setName } = flashcards;
  const totalCards = cards.length;

  return (
    <div className={classes.root}>
      <DrawerNav />
      <h2>{setName}</h2>
      <h4>Card {cardCount + 1} of {totalCards}</h4>
      <div className={classes.FlashcardContainer}>
        <Flashcard
          question={mounted && shuffledDeck[cardCount].question}
          answer={mounted && shuffledDeck[cardCount].answer}
          showAnswer={showAnswer}
        />
      </div>
      <div className={classes.buttonContainer}>
        <Button
          className={classes.showButton}
          variant="contained"
          onClick={toggleAnswer}
        >{showAnswer ? 'Hide Answer' : 'Show Answer'}

        </Button>
        {(cardCount + 1) !== totalCards
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
