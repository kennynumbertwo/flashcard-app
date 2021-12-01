import React from 'react';
import { withStyles } from '@material-ui/core';
import EditCollectionsItemBlank from './EditCollectionsItemBlank';
import EditCollectionsItem from './EditCollectionsItem';

const styles = {
  // EditDecksWrapper: {
  //   display: 'flex',
  //   justifyContent: 'center',
  //   alignItems: 'flex-start',
  //   flexDirection: 'column',
  //   width: '100%',
  // },
};
function EditCollectionsEditDecks(props) {
  const {
    isAddingDeck,
    filterState,
    sortState,
    uid,
    deleteUserDatabaseSet,
    fetchUserCardSets,
    isEditingCardsTab,
    isEditingDecksTab,
    isViewingCardsState,
    setIsViewingCardsState,
    setOpenSnackbar,
    setSnackbarMessage,
    setIsAnimatingCardItem,
    setIsAddingDeck,
    deleteDeckFilter,
    isMobile,
  } = props;
  return (
    <>
      {isAddingDeck && (
      <EditCollectionsItemBlank
        key="new-deck"
        uid={uid}
        deleteUserDatabaseSet={deleteUserDatabaseSet}
        fetchUserCardSets={fetchUserCardSets}
        isAddingDeck={isAddingDeck}
        setIsAddingDeck={setIsAddingDeck}
        setOpenSnackbar={setOpenSnackbar}
        setSnackbarMessage={setSnackbarMessage}
      />
      )}
      {/* Renders the sorted database */}
      { !filterState.isFiltered && sortState.sortedDatabase.length > 0
        ? sortState.sortedDatabase.map((userCardSet, index) => (
          <EditCollectionsItem
            key={userCardSet.id}
            userCardSet={userCardSet}
            totalCards={userCardSet.cards.length}
            uid={uid}
            deleteUserDatabaseSet={deleteUserDatabaseSet}
            fetchUserCardSets={fetchUserCardSets}
            isAddingDeck={isAddingDeck}
            isEditingDecksTab={isEditingDecksTab}
            isEditingCardsTab={isEditingCardsTab}
            isViewingCardsState={isViewingCardsState}
            setIsViewingCardsState={setIsViewingCardsState}
            setOpenSnackbar={setOpenSnackbar}
            setSnackbarMessage={setSnackbarMessage}
            index={index}
            setIsAnimatingCardItem={setIsAnimatingCardItem}
            deleteDeckFilter={deleteDeckFilter}
            isMobile={isMobile}
          />
        ))
      // Renders the filtered database if isFiltered is true
        : filterState.filtered.map((userCardSet, index) => (
          <EditCollectionsItem
            key={userCardSet.id}
            userCardSet={userCardSet}
            totalCards={userCardSet.cards.length}
            uid={uid}
            deleteUserDatabaseSet={deleteUserDatabaseSet}
            fetchUserCardSets={fetchUserCardSets}
            isAddingDeck={isAddingDeck}
            isEditingDecksTab={isEditingDecksTab}
            isEditingCardsTab={isEditingCardsTab}
            isViewingCardsState={isViewingCardsState}
            setIsViewingCardsState={setIsViewingCardsState}
            setOpenSnackbar={setOpenSnackbar}
            setSnackbarMessage={setSnackbarMessage}
            index={index}
            setIsAnimatingCardItem={setIsAnimatingCardItem}
            deleteDeckFilter={deleteDeckFilter}
            isMobile={isMobile}
          />
        ))}
    </>
  );
}

export default withStyles(styles)(EditCollectionsEditDecks);
