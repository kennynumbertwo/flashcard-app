import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/styles';
import { Redirect } from 'react-router-dom';
import { doc, updateDoc } from 'firebase/firestore/lite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import styles from './styles/UserFlashcardTrayStyles';
import useToggle from './hooks/useToggle';
import Flashcard from './Flashcard';
import FlashcardStats from './FlashcardStats';
import FlashcardActions from './FlashcardActions';
import db from './firebase.config';

function UserFlashcardTray(props) {
  const [flashcards, setFlashcards] = useState([]);
  const [shuffledDeck, setShuffledDeck] = useState([]);
  const [cardQuantity, setCardQuantity] = React.useState(0);
  const [cardCount, setCardCount] = useState(0);
  const [cardAnimation, setCardAnimation] = useState('animateInFirst');
  const [showAnswer, toggleShowAnswer] = useToggle(false);
  const [currentMasteryRating, setCurrentMasteryRating] = useState(0);
  const [currentMasteryPercentage, setCurrentMasteryPercentage] = useState(0);
  const [starState, setstarState] = useState({
    starOne: true,
    starTwo: false,
    starThree: false,
  });
  const [isLoading, setIsLoading] = useState(true);

  const {
    classes,
    currentCardSetName,
    isLoggedIn,
    userCardSetDatabase,
    roundState,
    uid,
    fetchUserCardSets,
  } = props;

  // Sets flashcards to the currentCardSetName
  useEffect(() => {
    getFlashcards();
    if (flashcards) {
      const shuffled = (shuffleDeck([...flashcards]));
      setShuffledDeck(shuffled);
      setCardCount(0);
      setCardQuantity(roundState.cardQuantity);
      const masteryPercentage = getMasteryPercentage([...flashcards]);
      setCurrentMasteryPercentage(masteryPercentage);
    }
  }, [userCardSetDatabase, flashcards.length, currentCardSetName], isLoading);

  useEffect(() => {
    if (shuffledDeck.length > 0) {
      setIsLoading(false);
      setCurrentMasteryRating(shuffledDeck[cardCount].masteryRating);
    }
  }, [userCardSetDatabase, shuffledDeck, cardCount]);

  // Set the masteryRating to the current card's masteryRating
  useEffect(() => {
    if (currentMasteryRating === 2) {
      setstarState({ starOne: true, starTwo: true, starThree: true });
    }
    if (currentMasteryRating === 1) {
      setstarState({ starOne: true, starTwo: true, starThree: false });
    }
    if (currentMasteryRating === 0) {
      setstarState({ starOne: true, starTwo: false, starThree: false });
    }
  }, [currentMasteryRating]);

  // Set the specified flashcard deck, if it exists
  const getFlashcards = () => {
    let flashcardsToSet = [];
    if (userCardSetDatabase) {
      userCardSetDatabase.forEach(cardSet => {
        if (cardSet.id === currentCardSetName.toLowerCase().replace(/\s+/g, '-')) {
          flashcardsToSet = cardSet.cards;
        }
        return (setFlashcards(flashcardsToSet));
      });
    }
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
  const handleNextCard = () => {
    if ((cardCount + 1) !== cardQuantity) {
      setCardCount(cardCount + 1);
      setCardAnimation('animateOut');
      if (showAnswer) {
        toggleShowAnswer();
      }
      setTimeout(() => {
        setCardAnimation('animateIn');
      }, 100);
    }
  };

  // Function to see the next card in shuffledDeck
  const handlePreviousCard = () => {
    if (cardCount > 0) {
      setCardCount(cardCount - 1);
      setCardAnimation('animatePrevOut');
      if (showAnswer) {
        toggleShowAnswer();
      }
      setTimeout(() => {
        setCardAnimation('animatePrevIn');
      }, 100);
    }
  };

  // Function to toggle viewing the answer
  const handleShowAnswer = () => {
    toggleShowAnswer(!showAnswer);
  };

  // Reshuffles the deck once you've drawn all cards
  const handleStartOver = () => {
    setCardAnimation('animateStartOver');
    setTimeout(() => {
      setIsLoading(true);
      fetchUserCardSets();
      setCardAnimation('animateInFirst');
    }, 100);
  };

  const handleStarClick = (e) => {
    let shuffledCopy = [...shuffledDeck];
    let flashcardsCopy = [...flashcards];
    let flashcardRef = shuffledCopy[cardCount].cardNumber - 1;
    if (e.currentTarget.id === 'starOne') {
      setstarState({ starOne: true, starTwo: false, starThree: false });
      setCurrentMasteryRating(0);
      shuffledCopy[cardCount] = { ...shuffledCopy[cardCount], masteryRating: 0 };
      flashcardsCopy[flashcardRef] = { ...flashcardsCopy[flashcardRef], masteryRating: 0 };
    }
    if (e.currentTarget.id === 'starTwo') {
      setstarState({ starOne: true, starTwo: true, starThree: false });
      setCurrentMasteryRating(1);
      shuffledCopy[cardCount] = { ...shuffledCopy[cardCount], masteryRating: 1 };
      flashcardsCopy[flashcardRef] = { ...flashcardsCopy[flashcardRef], masteryRating: 1 };
    }
    if (e.currentTarget.id === 'starThree') {
      setstarState({ starOne: true, starTwo: true, starThree: true });
      setCurrentMasteryRating(2);
      shuffledCopy[cardCount] = { ...shuffledCopy[cardCount], masteryRating: 2 };
      flashcardsCopy[flashcardRef] = { ...flashcardsCopy[flashcardRef], masteryRating: 2 };
    }
    setShuffledDeck(shuffledCopy);
    setFlashcards(flashcardsCopy);
    updateMasteryRating(flashcardsCopy);
    const mastery = getTotalMasteryRating(flashcardsCopy);
    const masteryPercentage = getMasteryPercentage(flashcardsCopy);
    setCurrentMasteryPercentage(masteryPercentage);
    updateMastery(mastery);
  };

  const getTotalMasteryRating = (array) => {
    let totalMasteryRating = 0;
    array.forEach(flashcard => {
      totalMasteryRating += flashcard.masteryRating;
    });
    let percentage = Math.floor((totalMasteryRating / (array.length * 2)) * 100);
    const mastery = {
      masteryTotal: totalMasteryRating,
      masteryPotential: array.length * 2,
      masteryPercentage: percentage,
    };
    return mastery;
  };

  const getMasteryPercentage = (array) => {
    let totalMasteryRating = 0;
    array.forEach(flashcard => {
      totalMasteryRating += flashcard.masteryRating;
    });
    let percentage = Math.floor((totalMasteryRating / (array.length * 2)) * 100);
    return percentage;
  };

  const updateMasteryRating = async (updatedFlashcards) => {
    const userRef = doc(db, 'users', uid);
    const updateString = `${currentCardSetName.toLowerCase().replace(/\s+/g, '-')}.cards`;
    await updateDoc(
      userRef, { [updateString]: updatedFlashcards }, { merge: true },
    );
  };

  const updateMastery = async (mastery) => {
    const userRef = doc(db, 'users', uid);
    const updateString = `${currentCardSetName.toLowerCase().replace(/\s+/g, '-')}.mastery`;
    await updateDoc(
      userRef, { [updateString]: mastery }, { merge: true },
    );
  };

  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }
  if (isLoading) {
    return (
      <div>Loading</div>
    );
  }
  return (
    <div className={classes.root}>
      <div className={classes.flashcardStatsWrapper}>
        <FlashcardStats
          currentCardSetName={currentCardSetName}
          masteryRating={shuffledDeck[cardCount].masteryRating}
          currentMasteryPercentage={currentMasteryPercentage}
          cardCount={cardCount + 1}
          cardQuantity={cardQuantity}
          iconClass={flashcards[0].iconClass}
        />
      </div>
      <div className={`${classes.flashcardWrapper} ${cardAnimation}`}>
        {shuffledDeck.length > 0
        && (
          <div className={cardAnimation}>
            <Flashcard
              question={shuffledDeck[cardCount].question}
              answer={shuffledDeck[cardCount].answer}
              cardNumber={shuffledDeck[cardCount].cardNumber}
              showAnswer={showAnswer}
              masteryRating={shuffledDeck[cardCount].masteryRating}
              setstarState={setstarState}
            />
          </div>
        )}
      </div>
      <div className={classes.actionsWrapper}>
        <FlashcardActions
          handleStarClick={handleStarClick}
          handleStartOver={handleStartOver}
          handlePreviousCard={handlePreviousCard}
          handleNextCard={handleNextCard}
          handleShowAnswer={handleShowAnswer}
          cardCount={cardCount}
          cardQuantity={cardQuantity}
          starState={starState}
          height={100}
        />
      </div>
      <button className={classes.showAnswerButton} type="button">
        <VisibilityIcon fontSize="large" onClick={handleShowAnswer} />
      </button>
      <button className={classes.restartButton} type="button">
        <RestartAltIcon fontSize="medium" onClick={handleStartOver} />
      </button>
    </div>
  );
}

export default withStyles(styles)(UserFlashcardTray);
