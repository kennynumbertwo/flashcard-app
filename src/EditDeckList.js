import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import EditDeckListItem from './EditDeckListItem';

const styles = {
  EditDeckList: {
    display: 'flex',
    justifyContent: 'flext-start',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    margin: '64px 0px 0px 0px',
  },
};

function EditDeckList(props) {
  const [userSetNames, setUserSetNames] = useState([]);
  const { classes, userCardCollections, isLoggedIn } = props;

  const getUserSetNames = () => {
    let pendingSetNames = [];
    userCardCollections.forEach(collection => {
      collection.setNames.forEach(set => {
        console.log(set);
      });
      // if (collection.subCategoryId === selectedCollection) {
      //   pendingSetNames = collection.setNames;
      // }
    });
    // return setUserSetNames(pendingSetNames);
  };

  getUserSetNames();

  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }
  return (
    <div className={classes.EditDeckList}>
      {userCardCollections.map(userCardCollection => (
        <EditDeckListItem
          key={userCardCollection.subCategoryId}
          subCategoryId={userCardCollection.subCategoryId}
          category={userCardCollection.category}
          subCategory={userCardCollection.subCategory}
          iconClass={userCardCollection.subCategoryClass}
          setNames={userCardCollection.setNames}
          url={`/my-collections/${userCardCollection.subCategoryId}`}
        />
      ))}
    </div>
  );
}

export default withStyles(styles)(EditDeckList);
