import React from 'react';
import { withStyles } from '@material-ui/core';
import ProgressBarVert from './ProgressBarVert';
import Modal from './Modal';
import styles from './styles/EditingDecksTabItemMobileStyles';

function EditingDecksTabItem(props) {
  const {
    classes,
    totalCards,
    userCardSet,
    handleDeleteClick,
    handleDeleteConfirm,
    handleEditClick,
    handleModalHide,
    isShowingModal,
  } = props;
  const { setName, category, iconClass, mastery } = userCardSet;

  return (
    <>
      <div className={classes.EditingDecksTabItemMobile}>
        <div className={classes.mobileTopWrapper}>
          <div className={classes.mobileSetNameWrapper}>
            <p className={classes.mobileSetNameLabel}>Deck Name:</p>
            <p className={classes.mobileSetName}>{setName}</p>
          </div>
          <div className={classes.mobileCategoryWrapper}>
            <p className={classes.categoryLabel}>Category:</p>
            <p className={classes.mobileCategory}>{category}</p>
          </div>
          <div className={classes.mobileIconWrapper}>
            <p className={classes.iconLabel}>Icon:</p>
            <i className={iconClass} />
          </div>
          <div className={classes.mobileMasteryWrapper}>
            <p className={classes.mobileMasteryLabel}>Mastery:</p>
            <div className={classes.mobileMasteryDisplayWrapper}>
              {mastery && mastery.masteryPercentage ? (
                <ProgressBarVert progressPercent={mastery.masteryPercentage} width={10} height={20} margin="0px 0px 3px 0px" />)
                : <ProgressBarVert progressPercent={0} width={10} height={20} margin="0px 0px 3px 0px" />}
              <p className={classes.mobileMasteryInfo}>{mastery && mastery.masteryPercentage ? `${mastery.masteryPercentage}%` : '-'}</p>
            </div>
          </div>
          <div className={classes.mobileCardsWrapper}>
            <p className={classes.mobileCardsLabel}>Total Cards:</p>
            <p className={classes.mobileCards}>{totalCards}</p>
          </div>
        </div>
        <div className={classes.mobileBottomWrapper}>
          <div className={classes.buttonWrapper}>
            <button className={classes.mobileDeleteButton} type="button" onClick={handleDeleteClick}>Delete</button>
          </div>
          <div className={classes.buttonWrapper}>
            <button className={classes.mobileButton} type="button" onClick={handleEditClick}>Edit Deck</button>
          </div>
        </div>
      </div>
      <Modal
        isShowing={isShowingModal}
        buttonText={<i className="fas fa-thumbs-up" style={{ fontSize: '1.2rem' }} />}
        secondButton
        secondButtonText={<i className="fas fa-thumbs-down" style={{ fontSize: '1.2rem' }} />}
        messageText={`Are you sure you want to delete the ${setName} deck from your collection?`}
        buttonAction={handleDeleteConfirm}
        hide={handleModalHide}
      />
    </>
  );
}

export default withStyles(styles)(EditingDecksTabItem);
