import React from 'react';
import { withStyles } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import CollectionCard from './CollectionCard';

const styles = {
  UserCollectionsPageWrapperOuter: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  UserCollectionsPageWrapperInner: {
    marginTop: '64px',
    padding: '0px 50px 10px 50px',
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: '1500px',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

function UserCollectionsPage(props) {
  const { classes, userCardCollections, isLoggedIn } = props;
  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }
  return (
    <div className={classes.UserCollectionsPageWrapperOuter}>
      <div className={classes.UserCollectionsPageWrapperInner}>
        {userCardCollections.map(userCardCollection => (
          <CollectionCard
            key={userCardCollection.subCategoryId}
            subCategoryId={userCardCollection.subCategoryId}
            cardText={userCardCollection.subCategory}
            iconClass={userCardCollection.subCategoryClass}
            setNames={userCardCollection.setNames}
            url={`/my-collections/${userCardCollection.subCategoryId}`}
          />
        ))}
      </div>
    </div>
  );
}

export default withStyles(styles)(UserCollectionsPage);
