import React from 'react';
import { withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const styles = {
  UserCollectionCardDetailsCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '1000px',
    height: '50px',
    padding: '0px 0px 0px 0px',
    margin: '5px 0px 5px 0px',
    borderRadius: '2px',
    color: 'rgba(0, 0, 0, 0.7)',
    backgroundColor: 'rgba(250, 250, 250, 0)',
    fontSize: '1rem',
    transition: 'all .2s',
    textDecoration: 'none',
    '&:hover': {
      boxShadow: '0px 2px 5px 1px rgba(0, 0, 0, 0.3)',
      backgroundColor: 'white',
    },
  },
  labelWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20%',
    height: '50px',
    // border: '1px solid black',
  },
  label: {
    margin: '0px 10px 0px 0px',
    // border: '1px solid black',
  },
  masteryWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20%',
    height: '50px',
    // border: '1px solid black',
  },
  totalCardsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '10%',
    height: '50px',
    // border: '1px solid black',
  },
  thisRoundWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '10%',
    height: '50px',
    // border: '1px solid black',
  },
  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '10%',
    height: '50px',
    // border: '1px solid black',
  },
  iconImage: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    // border: '1px solid black',
  },
  buttonWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '50px',
    width: '10%',
    // border: '1px solid black',
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
    background: 'rgba(0, 0, 0, 0.6)',
    width: '80px',
    height: '30px',
    border: '1.5px solid rgba(0, 0, 0, 0.0)',
    transition: 'all 0.4s ease 0s',
    borderRadius: '5px',
    '&:hover': {
      background: 'rgba(7, 177, 77, 0.7)',
      borderColor: 'rgba(7, 177, 77, 0.7)',
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
    setRoundState,
    setCurrentCardSetName,
    fetchUserCardSets,
    mastery,
    resetUserCollectionsState,
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

      <div className={classes.labelWrapper}>
        <p className={classes.info}>{setName}</p>
      </div>
      <div className={classes.labelWrapper}>
        <p className={classes.info}>{category}</p>
      </div>
      <div className={classes.iconWrapper}>
        <div className={classes.iconImage}>
          <i className={iconClass} />
        </div>
      </div>
      <div className={classes.labelWrapper}>
        {mastery.masteryPercentage
          ? <p className={classes.info}>{mastery.masteryPercentage}%</p>
          : <p>-</p>}
      </div>
      <div className={classes.totalCardsWrapper}>
        <p className={classes.info}>{totalCards}</p>
      </div>
      <div className={classes.thisRoundWrapper}>
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
        <Link className={classes.buttonLink} to={url}>
          <button className={classes.button} type="button" onClick={handleStart}>Start</button>
        </Link>
      </div>
    </div>
  );
}

export default withStyles(styles)(UserCollectionCardDetails);