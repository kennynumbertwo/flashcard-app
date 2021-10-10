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

function UserCollectionsPage(props) {
  const { classes, userCardCollections, isLoggedIn } = props;
  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }
  return (
    <div className={classes.root}>
      {userCardCollections.map(userCardCollection => (
        <CollectionCard
          key={userCardCollection.subCategoryId}
          subCategoryId={userCardCollection.subCategoryId}
          category={userCardCollection.category}
          cardText={userCardCollection.subCategory}
          iconClass={userCardCollection.subCategoryClass}
          setNames={userCardCollection.setNames}
          url={`/my-collections/${userCardCollection.subCategoryId}`}
        />
      ))}
    </div>
  );
}

export default withStyles(styles)(UserCollectionsPage);
