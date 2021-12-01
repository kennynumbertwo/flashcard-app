import React from 'react';
import { withStyles } from '@material-ui/core';
import ProgressBarVert from './ProgressBarVert';
import styles from './styles/EditCollectionsItemStyles';

function EditingCardsTabItem(props) {
  const {
    classes,
    totalCards,
    userCardSet,
    isViewingCardsState,
    handleViewCardsClick,
    handleAddCardClick,
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
      {isViewingCardsState.isViewing
        ? (
          <>
            <div className={classes.buttonWrapper}>
              <button className={classes.button} type="button" onClick={handleViewCardsClick}>Hide Cards</button>
            </div>
            <div className={classes.buttonWrapper}>
              <button className={classes.button} type="button" onClick={handleAddCardClick}>Add Card</button>
            </div>
          </>
        )
        : (
          <div className={classes.buttonWrapperSingle}>
            <div className={classes.buttonWrapperSingleInner}>
              <button className={classes.button} type="button" onClick={handleViewCardsClick}>Edit Cards</button>
            </div>
          </div>
        )}
    </div>
  );
}

export default withStyles(styles)(EditingCardsTabItem);
