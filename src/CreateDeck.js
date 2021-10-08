import React, { useState } from 'react';
import { withStyles } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import IconList from './IconList';
import IconCard from './IconCard';

const styles = {
  CreateDeckWrapper: {
    marginTop: '24px',
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid black',
  },
  CreateDeckCard: {
    display: 'flex',
    padding: '20px 30px 20px 30px',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    width: '1000px',
    height: '700px',
    backgroundColor: 'white',
    borderRadius: '5px',
    boxShadow: '0px 5px 10px 3px rgba(0, 0, 0, 0.3)',
  },
};

function CreateDeck(props) {
  // Destructured props from DrawerNav
  const { classes, isLoggedIn, uid } = props;
  const [isShowingIconList, setIsShowingIconList] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState('');
  const [selectedIconClass, setSelectedIconClass] = useState('');
  // Text Inputs
  const [deckFields, setDeckFields] = useState({
    setName: '',
    subCategory: '',
    category: '',
    subCategoryClass: '',
    id: '',
    owner: uid,
  });

  const handleShowIcons = () => {
    setIsShowingIconList(!isShowingIconList);
  };

  const handleChange = (e) => {
    setDeckFields({ ...deckFields, [e.target.id]: e.target.value });
  };

  const handleSaveDeck = () => {
    let newId = deckFields.setName.replace(/\s+/g, '-').toLowerCase();
    setDeckFields({ ...deckFields, id: newId, subCategoryClass: selectedIconClass });
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
        <TextField id="setName" label="Deck Name" variant="standard" onChange={handleChange} />
        <TextField id="subCategory" label="Sub Category" variant="standard" onChange={handleChange} />
        <TextField id="category" label="Category" variant="standard" onChange={handleChange} />
        <div className={classes.selectIconWrapper}>
          <IconCard
            iconClass={selectedIconClass}
            iconName={selectedIcon}
            disabled
          />
          <button onClick={handleShowIcons} type="button">Select Icon</button>
          <button onClick={handleSaveDeck} type="button">Save Deck</button>
        </div>
      </div>
    </div>
  );
}

export default withStyles(styles)(CreateDeck);
