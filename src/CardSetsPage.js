import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core';
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

function CardSets(props) {
  const [selectedSetNames, setSelectedSetNames] = useState([]);
  const { classes, cardCollections, selectedCollection, updateCardSetName } = props;
  useEffect(() => {
    getSetNames();
  }, [cardCollections]);

  const getSetNames = () => {
    let pendingSetNames = [];
    cardCollections.forEach(collection => {
      if (collection.subCategoryId === selectedCollection) {
        pendingSetNames = collection.setNames;
      }
    });
    return setSelectedSetNames(pendingSetNames);
  };

  return (
    <div className={classes.root}>
      {selectedSetNames.map(setName => (
        <CollectionCard
          cardText={setName.cardSetName}
          key={setName.cardSetId}
          url={`/collections/${selectedCollection}/${setName.cardSetId}`}
          updateCardSetName={updateCardSetName}
        />
      ))}
    </div>
  );
}

export default withStyles(styles)(CardSets);
