import React from 'react';
import { withStyles } from '@material-ui/core';
import ProgressBarVert from './ProgressBarVert';
import styles from './styles/EditingCardsTabItemMobileStyles';

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
    <>
      <div className={classes.EditingCardsTabItemMobile}>
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
          {isViewingCardsState.isViewing
            ? (
              <>
                <div className={classes.buttonWrapper}>
                  <button className={classes.mobileButton} type="button" onClick={handleViewCardsClick}>Hide Cards</button>
                </div>
                <div className={classes.buttonWrapper}>
                  <button className={classes.mobileButton} type="button" onClick={handleAddCardClick}>Add Card</button>
                </div>
              </>
            )
            : (
              <div className={classes.mobileButtonWrapperSingle}>
                <div className={classes.mobileButtonWrapperSingleInner}>
                  <button className={classes.mobileButton} type="button" onClick={handleViewCardsClick}>Edit Cards</button>
                </div>
              </div>
            )}
        </div>
      </div>
    </>
  );
}

export default withStyles(styles)(EditingCardsTabItem);
