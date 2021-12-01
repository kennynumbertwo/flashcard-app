import React from 'react';
import { withStyles } from '@material-ui/core';
import ProgressBarVert from './ProgressBarVert';
import Modal from './Modal';
import styles from './styles/EditCollectionsItemStyles';

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
    <div className={classes.EditCollectionsItemCard}>
      <div className={classes.setNameWrapper}>
        <p className={classes.info}>{setName}</p>
      </div>
      <div className={classes.categoryWrapper}>
        <p className={classes.info}>{category}</p>
      </div>
      <div className={classes.iconWrapper}>
        <div className={classes.EditCollectionsItemIcon}>
          <i className={iconClass} />
        </div>
      </div>
      <div className={classes.masteryWrapper}>
        <div className={classes.masteryWrapperInner}>
          {mastery && mastery.masteryPercentage ? (
            <ProgressBarVert progressPercent={mastery.masteryPercentage} width={12} height={25} />)
            : <ProgressBarVert progressPercent={0} width={12} height={25} />}
          <p className={classes.masteryInfo}>{mastery && mastery.masteryPercentage ? `${mastery.masteryPercentage}%` : '-'}</p>
        </div>
      </div>
      <div className={classes.totalCardsWrapper}>
        <p className={classes.info}>{totalCards}</p>
      </div>
      <div className={classes.buttonWrapper}>
        <button className={classes.deleteButton} type="button" onClick={handleDeleteClick}>Delete</button>
      </div>
      <div className={classes.buttonWrapper}>
        <button className={classes.button} type="button" onClick={handleEditClick}>Edit Deck</button>
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
    </div>
  );
}

export default withStyles(styles)(EditingDecksTabItem);
