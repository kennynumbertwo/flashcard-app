import React from 'react';
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

function CollectionsPage(props) {
  const { classes, cardCollections, isLoggedIn } = props;
  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }
  return (
    <div className={classes.root}>
      {cardCollections.map(cardCollection => (
        <CollectionCard
          key={cardCollection.subCategoryId}
          subCategoryId={cardCollection.subCategoryId}
          category={cardCollection.category}
          cardText={cardCollection.subCategory}
          iconClass={cardCollection.subCategoryClass}
          setNames={cardCollection.setNames}
          url={`/collections/${cardCollection.subCategoryId}`}
        />
      ))}
    </div>
  );
}

export default withStyles(styles)(CollectionsPage);
