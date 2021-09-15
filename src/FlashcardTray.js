import React, { useState } from 'react';
import { withStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import Flashcard from './Flashcard';
import DrawerNav from './DrawerNav';

const styles = {
  root: {
    border: '1px solid black',
    height: '100vh',
    width: '100vw',
    display: 'flex',
    backgroundColor: '#f0f7f7',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    '& button': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  FlashcardContainer: {

  },
  buttonContainer: {
    height: '100px',
    width: '25vw',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  nextButton: {
    width: '160px',
    backgroundColor: 'rgba(7, 177, 77, 0.9)',
    color: 'white',
    '&:hover': {
      backgroundColor: 'rgba(7, 177, 77, 0.7)',
    },
  },
  showButton: {
    width: '160px',
  },
  startOverButton: {
    width: '160px',
  },
};

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
  const [usedIndexes, setUsedIndexes] = useState([]);
  const [currentFlashcard, setCurrentFlashcard] = useState(0);
  const [cardCount, setCardCount] = useState(1);
  const [flashcardsEmpty, setFlashcardsEmpty] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const drawCard = () => {
    const newIndex = Math.floor(Math.random() * flashcards.cards.length);
    let checking = [...usedIndexes];
    if (checking.includes(newIndex)) {
      drawCard();
    } else {
      setCurrentFlashcard(newIndex);
      checking = [...checking, newIndex];
      if (checking.length === flashcards.cards.length) {
        setFlashcardsEmpty(true);
      }
      if (cardCount !== flashcards.cards.length) {
        setCardCount(cardCount + 1);
      }
      setShowAnswer(false);
      setUsedIndexes(checking);
    }
  };

  const startOver = () => {
    setUsedIndexes([]);
    setFlashcardsEmpty(false);
    setCardCount(1);
  };

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };
  const { classes } = props;
  const totalCards = flashcards.cards.length;
  return (
    <div className={classes.root}>
      <DrawerNav />
      <h2>{flashcards.setName}</h2>
      <h4>Card {cardCount} of {totalCards}</h4>
      <div className={classes.FlashcardContainer}>
        <Flashcard
          question={flashcards.cards[currentFlashcard].question}
          answer={flashcards.cards[currentFlashcard].answer}
          empty={flashcardsEmpty}
          showAnswer={showAnswer}
        />
      </div>
      <div className={classes.buttonContainer}>
        <Button
          className={classes.showButton}
          variant="contained"
          onClick={toggleAnswer}
          disabled={flashcardsEmpty}
        >{showAnswer ? 'Hide Answer' : 'Show Answer'}

        </Button>
        {!flashcardsEmpty
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
