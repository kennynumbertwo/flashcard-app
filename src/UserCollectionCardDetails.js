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
    isMobile,
  } = props;

  const [cardQuantity, setCardQuantity] = React.useState(totalCards);

  // Click handler for starting a run on a deck
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

  // Function for setting the card quantity on a run
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

  if (isMobile) {
    return (
      <div className={classes.UserCollectionCardDetailsMobile}>
        <div className={classes.mobileTopWrapper}>
          <div className={classes.mobileSetNameWrapper}>
            <p className={classes.mobileSetNameLabel}>Deck Name:</p>
            <p className={classes.mobileSetName}>{setName}</p>
          </div>
          <div className={classes.mobileCategoryWrapper}>
            <p className={classes.categoryLabel}>Category:</p>
            <p className={classes.mobileCategory}>{category}</p>
          </div>
          <div className={classes.mobileIconWrapper}>
            <p className={classes.iconLabel}>Icon:</p>
            <i className={iconClass} />
          </div>
          <div className={classes.mobileMasteryWrapper}>
            <p className={classes.mobileMasteryLabel}>Mastery:</p>
            <div className={classes.mobileMasteryDisplayWrapper}>
              {mastery && mastery.masteryPercentage ? (
                <ProgressBarVert progressPercent={mastery.masteryPercentage} width={10} height={20} margin="0px 0px 3px 0px" />)
                : <ProgressBarVert progressPercent={0} width={10} height={20} margin="0px 0px 3px 0px" />}
              <p className={classes.mobileMasteryInfo}>{mastery && mastery.masteryPercentage ? `${mastery.masteryPercentage}%` : '-'}</p>
            </div>
          </div>
          <div className={classes.mobileCardsWrapper}>
            <p className={classes.mobileCardsLabel}>Cards:</p>
            <FormControl variant="standard" sx={{ m: 1.5, minWidth: 50 }}>
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
        </div>
        <div className={classes.mobileBottomWrapper}>
          <div className={classes.mobileButtonWrapper}>
            {stockDeck
              ? (
                <Link className={classes.mobileButtonLink} to={addingToCollection ? addSetUrl : url}>
                  <button className={classes.mobileButton} type="button" onClick={handleStart}>Start</button>
                </Link>
              )
              : (
                <>
                  {totalCards !== 0 ? (
                    <Link className={classes.mobileButtonLink} to={url}>
                      <button className={classes.mobileButton} type="button" onClick={handleStart}>Start</button>
                    </Link>
                  ) : (
                    <button className={`${classes.mobileButton} disabled`} type="button">Start</button>
                  )}
                </>
              )}
          </div>
        </div>
      </div>
    );
  }
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
