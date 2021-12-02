import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import EditCollectionsCardItem from './EditCollectionsCardItem';
import EditCollectionsNewCard from './EditCollectionsNewCard';
import EditCollectionsItem from './EditCollectionsItem';

function CardsView(props) {
  const {
    userCardSetDatabase,
    uid,
    isViewingCardsState,
    setIsViewingCardsState,
    deleteUserDatabaseSet,
    fetchUserCardSets,
    isAddingDeck,
    isAddingCard,
    isEditingDecksTab,
    isEditingCardsTab,
    isAnimatingCardItem,
    setIsAnimatingCardItem,
    handleAddCardClick,
    setIsAddingCard,
    setOpenSnackbar,
    setSnackbarMessage,
    getTotalMasteryRating,
    getDeletedCardArray,
    isMobile,

  } = props;
  return (
    <>
      <EditCollectionsItem
        key={isViewingCardsState.cardSet.id}
        userCardSet={isViewingCardsState.cardSet}
        totalCards={isViewingCardsState.cardSet.cards.length}
        uid={uid}
        deleteUserDatabaseSet={deleteUserDatabaseSet}
        fetchUserCardSets={fetchUserCardSets}
        isAddingDeck={isAddingDeck}
        isEditingDecksTab={isEditingDecksTab}
        isEditingCardsTab={isEditingCardsTab}
        isViewingCardsState={isViewingCardsState}
        setIsViewingCardsState={setIsViewingCardsState}
        isAnimatingCardItem={isAnimatingCardItem}
        setIsAnimatingCardItem={setIsAnimatingCardItem}
        handleAddCardClick={handleAddCardClick}
        setIsAddingCard={setIsAddingCard}
        isMobile={isMobile}
      />
      {isAddingCard && (
      <EditCollectionsNewCard
        uid={uid}
        userCardSetDatabase={userCardSetDatabase}
        cardSet={isViewingCardsState.cardSet}
        fetchUserCardSets={fetchUserCardSets}
        setIsViewingCardsState={setIsViewingCardsState}
        setIsAddingCard={setIsAddingCard}
        isViewingCardsState={isViewingCardsState}
        getTotalMasteryRating={getTotalMasteryRating}
        setOpenSnackbar={setOpenSnackbar}
        setSnackbarMessage={setSnackbarMessage}
        isAnimatingCardItem={isAnimatingCardItem}
        setIsAnimatingCardItem={setIsAnimatingCardItem}
        handleAddCardClick={handleAddCardClick}
      />
      )}
      {isViewingCardsState.cardSet.cards && isViewingCardsState.cardSet.cards
        .map(card => (
          <EditCollectionsCardItem
            key={uuidv4()}
            uid={uid}
            userCardSetDatabase={userCardSetDatabase}
            cardSet={isViewingCardsState.cardSet}
            card={card}
            fetchUserCardSets={fetchUserCardSets}
            setIsViewingCardsState={setIsViewingCardsState}
            getDeletedCardArray={getDeletedCardArray}
            getTotalMasteryRating={getTotalMasteryRating}
            setOpenSnackbar={setOpenSnackbar}
            setSnackbarMessage={setSnackbarMessage}
            isAnimatingCardItem={isAnimatingCardItem}
            setIsAnimatingCardItem={setIsAnimatingCardItem}
          />
        ))}
    </>
  );
}

export default CardsView;
