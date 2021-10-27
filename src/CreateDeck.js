import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { doc, setDoc, updateDoc } from 'firebase/firestore/lite';
import Divider from '@mui/material/Divider';
import IconList from './IconList';
import IconCard from './IconCard';
import db from './firebase.config';

const styles = {
  CreateDeckWrapper: {
    marginTop: '24px',
    display: 'flex',
    width: '100%',
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    // border: '1px solid black',
  },
  CreateDeckCard: {
    display: 'flex',
    padding: '0px 0px 0px 0px',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    width: '800px',
    height: '500px',
    backgroundColor: 'white',
    borderRadius: '5px',
    boxShadow: '0px 5px 10px 3px rgba(0, 0, 0, 0.3)',
  },
  headerTextWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100px',
    paddingTop: '5px',
  },
  mainContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '300px',
    width: '100%',
  },
  mainContentLeft: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    height: '300px',
    marginLeft: '3%',
    // border: '1px solid black',
    width: '50%',
  },
  mainContentRight: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    width: '50%',
    height: '100%',
    marginRight: '3%',
    // border: '1px solid black',
  },
  nameWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0px 0px 0px 0px',
    flexDirection: 'column',
    // border: '1px solid black',
    width: '100%',
    height: '150px',
  },
  nameLabel: {
    fontSize: '1rem',
    fontWeight: '400',
  },
  categoryWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    // border: '1px solid black',
    width: '100%',
    height: '100px',
  },
  categoryLabel: {
    fontSize: '1rem',
    fontWeight: '400',
  },
  iconLabel: {
    display: 'flex',
    fontSize: '1.2rem',
    fontWeight: '500',
    justifyContent: 'center',
    alignItems: 'center',
    // border: '1px solid black',
    height: '40px',
    width: '100%',
  },
  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    // border: '1px solid black',
    width: '100%',
  },
  iconWrapperInner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
    // boxShadow: '0px 2px 2px 2px rgba(0, 0, 0, 0.3)',
    border: '1px groove rgba(0, 0, 0, 0.2)',
    // borderStyle: 'inset',
    borderRadius: '10px',
    width: '175px',
    height: '125px',
  },
  saveWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '450px',
    height: '100px',
    // border: '1px solid black',
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    textDecoration: 'none',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: '1rem',
    fontWeight: '300',
    background: 'rgba(0, 0, 0, 0.6)',
    width: '100px',
    height: '40px',
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
  dividerLine: {
    display: 'flex',
    alignSelf: 'center',
    height: '1px',
    width: '85%',
    borderBottom: '1px solid rgba(0, 0, 0, 0.4)',
  },
};

function CreateDeck(props) {
  // Destructured props from DrawerNav
  const { classes, isLoggedIn, uid, fetchUserCardSets } = props;
  // State
  const [isShowingIconList, setIsShowingIconList] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState('');
  const [selectedIconClass, setSelectedIconClass] = useState('');
  // Text Inputs
  const [deckFields, setDeckFields] = useState({
    setName: '',
    category: '',
    iconClass: '',
    id: '',
    owner: uid,
    cards: '',
    mastery: {},
  });

  useEffect(() => {
    setDeckFields({ ...deckFields,
      id: deckFields.setName.replace(/\s+/g, '-').toLowerCase(),
      iconClass: selectedIconClass,
    });
  }, [deckFields.setName, selectedIconClass]);

  const handleShowIcons = () => {
    setIsShowingIconList(!isShowingIconList);
  };

  const handleChange = (e) => {
    setDeckFields({ ...deckFields, [e.target.id]: e.target.value });
  };

  const handleSaveDeck = async () => {
    const userRef = doc(db, 'users', uid);
    await setDoc(userRef, { [deckFields.id]: deckFields }, { merge: true });
    setDeckFields({
      setName: '',
      category: '',
      iconClass: '',
      id: '',
      owner: uid,
      cards: '',
      mastery: {},
    });
    setSelectedIcon('');
    setSelectedIconClass('');
    fetchUserCardSets();
  };

  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }
  if (isShowingIconList) {
    return (
      <IconList
        selectedIcon={selectedIcon}
        setSelectedIcon={setSelectedIcon}
        setSelectedIconClass={setSelectedIconClass}
        handleShowIcons={handleShowIcons}
      />
    );
  }
  return (
    <div className={classes.CreateDeckWrapper}>
      <div className={classes.CreateDeckCard}>
        <div className={classes.headerTextWrapper}>
          <h2>Create Deck</h2>
        </div>
        <span className={classes.dividerLine} />
        <div className={classes.mainContent}>
          <div className={classes.mainContentLeft}>
            <div className={classes.nameWrapper}>
              {/* <h4 className={classes.nameLabel}>Set the new deck name:</h4> */}
              <TextField id="setName" label="Deck Name" variant="standard" onChange={handleChange} value={deckFields.setName} />
            </div>
            <div className={classes.categoryWrapper}>
              {/* <h4 className={classes.categoryLabel}>Set the new deck category:</h4> */}
              <TextField id="category" label="Category" variant="standard" onChange={handleChange} value={deckFields.category} />
            </div>
          </div>
          <Divider orientation="vertical" />
          <div className={classes.mainContentRight}>
            <h4 className={classes.iconLabel}>Icon</h4>
            <div className={classes.iconWrapper}>
              <div className={classes.iconWrapperInner}>
                {selectedIcon !== ''
                  ? (
                    <div className={classes.iconSelected}>
                      <IconCard
                        iconClass={selectedIconClass}
                        iconName={selectedIcon}
                        selectedIconAction={handleShowIcons}
                        isSelectionButton
                      />
                    </div>
                  )
                  : (
                    <IconCard
                      iconClass="far fa-times-circle"
                      iconName="Not Selected"
                      selectedIconAction={handleShowIcons}
                      isSelectionButton
                    />
                  )}
              </div>

            </div>
          </div>
        </div>
        <span className={classes.dividerLine} />
        <div className={classes.saveWrapper}>
          <button onClick={handleSaveDeck} className={classes.button} type="button">Save Deck</button>
        </div>
      </div>
      {/* <AddCardForm uid={uid} fetchUserCardSets={fetchUserCardSets} /> */}
    </div>
  );
}

export default withStyles(styles)(CreateDeck);
