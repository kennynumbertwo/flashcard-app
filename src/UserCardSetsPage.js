import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import CollectionCard from './CollectionCard';

const styles = {
  root: {
    marginTop: '64px',
    padding: '0px 50px 10px 50px',
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
};

function UserCardSetsPage(props) {
  const [selectedSetNames, setSelectedSetNames] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const { classes, userCardCollections, selectedCollection, updateCardSetName, isLoggedIn } = props;
  useEffect(() => {
    getSetNames();
  }, [userCardCollections]);

  const getSetNames = () => {
    let pendingSetNames = [];
    userCardCollections.forEach(collection => {
      if (collection.subCategoryId === selectedCollection) {
        pendingSetNames = collection.setNames;
        setSelectedClass(collection.subCategoryClass);
      }
    });
    return setSelectedSetNames(pendingSetNames);
  };
  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }
  return (
    <div className={classes.root}>
      {selectedSetNames.map(setName => (
        <CollectionCard
          cardText={setName.cardSetName}
          key={setName.cardSetId}
          url={`/my-collections/${selectedCollection}/${setName.cardSetId}`}
          updateCardSetName={updateCardSetName}
          iconClass={selectedClass}
        />
      ))}
    </div>
  );
}

export default withStyles(styles)(UserCardSetsPage);
