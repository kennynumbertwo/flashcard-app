import React from 'react';
import { withStyles } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import CollectionCard from './CollectionCard';

const styles = {
  CollectionsPageWrapperOuter: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  CollectionsPageWrapperInner: {
    marginTop: '64px',
    padding: '0px 50px 10px 50px',
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: '1500px',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

function CollectionsPage(props) {
  const { classes, cardCollections, isLoggedIn } = props;
  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }
  return (
    <div className={classes.CollectionsPageWrapperOuter}>
      <div className={classes.CollectionsPageWrapperInner}>
        {cardCollections.map(cardCollection => (
          <CollectionCard
            key={cardCollection.subCategoryId}
            subCategoryId={cardCollection.subCategoryId}
            cardText={cardCollection.subCategory}
            iconClass={cardCollection.subCategoryClass}
            setNames={cardCollection.setNames}
            url={`/collections/${cardCollection.subCategoryId}`}
          />
        ))}
      </div>
    </div>
  );
}

export default withStyles(styles)(CollectionsPage);
