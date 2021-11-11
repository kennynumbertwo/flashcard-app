import React from 'react';
import { withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ProgressBarVert from './ProgressBarVert';

const styles = {
  UserCollectionCardDetailsCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '1000px',
    height: '50px',
    padding: '0px 0px 0px 0px',
    margin: '5px 0px 0px 0px',
    borderRadius: '3px',
    color: 'var(--text-primary)',
    backgroundColor: 'var(--background-white)',
    fontSize: '1rem',
    transition: 'all .2s',
    textDecoration: 'none',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    '&:hover': {
      boxShadow: '0px 1px 2px 1px rgba(0, 0, 0, 0.1)',
    },
  },
  setNameWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '25%',
    height: '50px',
    padding: '0px 0px 0px 22px',
    '& p': {
      whiteSpace: 'no-wrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  },
  categoryWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '25%',
    height: '50px',
    padding: '0px 0px 0px 22px',
    '& p': {
      whiteSpace: 'no-wrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  },
  label: {
    margin: '0px 10px 0px 0px',
  },
  masteryWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '10%',
    height: '50px',
  },
  masteryWrapperInner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '50px',
    height: '50px',
  },
  masteryInfo: {
    padding: '0px 0px 0px 8px',
  },
  totalCardsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '10%',
    height: '50px',
  },
  cardsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '10%',
    height: '50px',
  },
  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '10%',
    height: '50px',
  },
  iconImage: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
  },
  buttonWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '50px',
    width: '20%',
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    textDecoration: 'none',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: '.8rem',
    fontWeight: '500',
    background: 'var(--button-primary)',
    width: '80px',
    height: '30px',
    border: 'none',
    transition: 'all 0.4s ease 0s',
    borderRadius: '5px',
    '&:hover': {
      background: 'var(--button-accept-primary)',
      transition: 'all 0.4s ease 0s',
      cursor: 'pointer',
    },
  },
  buttonLink: {
    textDecoration: 'none',
  },
};

function UserCollectionCardDetails(props) {
  const {
    classes,
    category,
    setName,
    totalCards,
    iconClass,
    url,
    addSetUrl,
    setRoundState,
    setCurrentCardSetName,
    fetchUserCardSets,
    mastery,
    resetUserCollectionsState,
    stockDeck,
    handleDrawerClose,
  } = props;

  const [cardQuantity, setCardQuantity] = React.useState(totalCards);

  const handleStart = () => {
    setRoundState({ cardQuantity });
    setCurrentCardSetName(setName);
    resetUserCollectionsState();
    handleDrawerClose();
    fetchUserCardSets();
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

  return (
    <div className={classes.UserCollectionCardDetailsCard}>
      <div className={classes.setNameWrapper}>
        <p className={classes.info}>{setName}</p>
      </div>
      <div className={classes.categoryWrapper}>
        <p className={classes.info}>{category}</p>
      </div>
      <div className={classes.iconWrapper}>
        <div className={classes.iconImage}>
          <i className={iconClass} />
        </div>
      </div>
      <div className={classes.masteryWrapper}>
        <div className={classes.masteryWrapperInner}>
          {mastery && mastery.masteryPercentage ? (
            <ProgressBarVert progressPercent={mastery.masteryPercentage} width={12} height={25} />)
            : <ProgressBarVert progressPercent={0} width={12} height={25} />}
          <p className={classes.masteryInfo}>{mastery && mastery.masteryPercentage ? `${mastery.masteryPercentage}%` : '-'}</p>
        </div>
      </div>
      <div className={classes.cardsWrapper}>
        <FormControl variant="standard" sx={{ m: 2, minWidth: 75 }}>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={cardQuantity}
            onChange={handleChange}
            displayEmpty
          >
            {getCardQuantity(totalCards)
              .map(num => <MenuItem key={`cardQuantity${num}`} value={num}>{num}</MenuItem>)}
            <MenuItem value={totalCards}>{totalCards}</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className={classes.buttonWrapper}>
        {stockDeck
          ? (
            <Link className={classes.buttonLink} to={addingToCollection ? addSetUrl : url}>
              <button className={classes.button} type="button" onClick={handleStart}>Start</button>
            </Link>
          )
          : (
            <Link className={classes.buttonLink} to={url}>
              <button className={classes.button} type="button" onClick={handleStart}>Start</button>
            </Link>
          )}

      </div>

    </div>
  );
}

export default withStyles(styles)(UserCollectionCardDetails);
