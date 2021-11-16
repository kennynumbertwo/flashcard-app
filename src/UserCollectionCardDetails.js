import React from 'react';
import { withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ProgressBarVert from './ProgressBarVert';
import styles from './styles/UserCollectionsCardDetailsStyles';

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
  } = props;

  const [cardQuantity, setCardQuantity] = React.useState(totalCards);

  const handleStart = () => {
    setRoundState({ cardQuantity });
    setCurrentCardSetName(setName);
    resetUserCollectionsState();
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
            <>
              {totalCards !== 0 ? (
                <Link className={classes.buttonLink} to={url}>
                  <button className={classes.button} type="button" onClick={handleStart}>Start</button>
                </Link>
              ) : (
                <button className={`${classes.button} disabled`} type="button">Start</button>
              )}
            </>
          )}

      </div>

    </div>
  );
}

export default withStyles(styles)(UserCollectionCardDetails);
