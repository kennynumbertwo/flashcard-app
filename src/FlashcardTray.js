import React, { useState } from 'react';
import { withStyles } from '@material-ui/styles';
import Flashcard from './Flashcard';

const styles = {
  root: {
    border: '1px solid black',
    height: '100vh',
    width: '100vw',
    display: 'flex',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

function FlashcardTray(props) {
  const [flashcards, setFlashcards] = useState([
    { question: 'What is my favorite color?', answer: 'Black' },
    { question: "What is my pet's name?", answer: 'Mika' },
    { question: "What's my age again?", answer: 34 },
    { question: 'How may jackets do you own?', answer: 12 },
  ]);
  // const [reviewedCards, setReviewedCards] = useState([]);
  const [currentFlashcard, setCurrentFlashcard] = useState(0);
  const [flashcardsEmpty, setFlashcardsEmpty] = useState(false);

  const drawCard = () => {
    const updatedFlashcards = [...flashcards];
    // setReviewedCards([...reviewedCards, updatedFlashcards[currentFlashcard]]);
    updatedFlashcards.splice(currentFlashcard, 1);
    setFlashcards(updatedFlashcards);
    if (flashcards.length === 1) {
      setFlashcardsEmpty(true);
    }
    const randomCard = Math.floor(Math.random() * flashcards.length);
    setCurrentFlashcard(randomCard);
  };

  const { classes } = props;

  return (
    <div className={classes.root}>
      {/* Things to show in the tray
        - Name of the flashcard category
        - n / total cards
        - Flashcard
      */}
      <p>{flashcardsEmpty ? 'The End' : flashcards[currentFlashcard].question}</p>
      <Flashcard />
      <button type="button" onClick={drawCard}>Draw Card</button>
    </div>
  );
}

export default withStyles(styles)(FlashcardTray);
