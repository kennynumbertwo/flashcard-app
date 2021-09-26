import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import styles from './styles/FlashcardTrayStyles';
import useToggle from './hooks/useToggle';
import Flashcard from './Flashcard';

function FlashcardTray(props) {
  const [flashcards, setFlashcards] = useState([]);
  const [shuffledDeck, setShuffledDeck] = useState([]);
  const [deckLength, setDeckLength] = useState(1);
  const [cardCount, setCardCount] = useState(0);
  const [showAnswer, toggleShowAnswer] = useToggle(false);
  const [started, setStarted] = useState(false);
  const [cardQuantity, setCardQuantity] = React.useState('');

  // Sets flashcards to the selectedSetIndex
  useEffect(() => {
    getFlashcards(props.selectedSetIndex);
    setDeckLength(flashcards.length);
    setCardQuantity('');
    setStarted(false);
  }, [props.cardSetDatabase, flashcards.length, props.selectedSetIndex]);

  // Set the specified flashcard deck, if it exists
  const getFlashcards = (index) => {
    let flashcardsToSet = [];
    if (props.cardSetDatabase[index]) {
      flashcardsToSet = props.cardSetDatabase[index].cards;
    }
    return (setFlashcards(flashcardsToSet));
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

  // Handles Card Quantity Input Change
  const handleChange = (event) => {
    setCardQuantity(event.target.value);
  };

  const getCardQuantity = (num) => {
    let cardQuantityArray = [];
    if (num < 30) {
      for (let i = 0; i < num; i++) {
        if ((i + 1) % 5 === 0) {
          cardQuantityArray.push(i + 1);
        }
      }
    } else {
      for (let i = 0; i < num; i++) {
        if ((i + 1) % 10 === 0) {
          cardQuantityArray.push(i + 1);
        }
      }
    }
    return cardQuantityArray;
  };

  const { classes, currentCardSetName } = props;

  return (
    <div className={classes.root}>
      {started && <h2>{currentCardSetName}</h2>}
      {started && <h4>Card {cardCount + 1} of {cardQuantity}</h4>}
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
            <di>
              <h4>How many cards would you like to use?</h4>
              <Box sx={{ minWidth: 50, maxWidth: 100 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Cart Quantity</InputLabel>
                  <Select
                    autoWidth
                    labelId="card-quantity-label-input"
                    id="card-quantity-label"
                    value={cardQuantity}
                    label="Card Quantity"
                    onChange={handleChange}
                  >
                    {getCardQuantity(deckLength).map(num => <MenuItem key={`cardQuantity${num}`} value={num}>{num}</MenuItem>)}
                    <MenuItem value={deckLength}>All Cards</MenuItem>

                  </Select>
                </FormControl>
              </Box>
              <Button
                className={classes.startButton}
                variant="contained"
                type="button"
                onClick={start}
                disabled={!cardQuantity}
              >
                Start
              </Button>
            </di>
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
        {(cardCount + 1) !== cardQuantity
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
    </div>
  );
}

export default withStyles(styles)(FlashcardTray);
