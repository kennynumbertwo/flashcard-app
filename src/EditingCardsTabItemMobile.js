import React from 'react';
import { withStyles } from '@material-ui/core';
import ProgressBarVert from './ProgressBarVert';

const styles = {
  EditingCardsTabItemMobile: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    width: '92.5%',
    padding: '0px 0px 0px 0px',
    margin: '15px 0px 0px 0px',
    color: 'var(--text-primary)',
    backgroundColor: 'var(--background-white)',
    fontSize: '.9rem',
    transition: 'all .2s',
    textDecoration: 'none',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    animationName: '$card-details-slide',
    animationDuration: props => (`${props.cardNumber * 100}ms`),
    animationTimingFunction: 'ease-in-out',
    animationIterationCount: props => (props.isAnimatingCardDetails ? 1 : 0),
  },
  mobileTopWrapper: {
    width: '100%',
    height: '210px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: '5px',
  },
  mobileBottomWrapper: {
    width: '100%',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mobileSetNameWrapper: {
    width: '100%',
    height: '20%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mobileSetNameLabel: {
    fontWeight: '500',
    padding: '0px 10px 0px 0px',
    margin: '0px 0px 0px 0px',
  },
  mobileSetName: {
    padding: '0px 0px 0px 0px',
    margin: '0px 0px 0px 0px',
  },
  mobileCategoryWrapper: {
    width: '100%',
    height: '20%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryLabel: {
    padding: '0px 10px 0px 0px',
    margin: '0px 0px 0px 0px',
    fontWeight: '500',
  },
  mobileCategory: {
    padding: '0px 0px 0px 0px',
    margin: '0px 0px 0px 0px',
  },
  iconLabel: {
    padding: '0px 20px 0px 0px',
    margin: '0px 0px 0px 0px',
    fontWeight: '500',
  },
  mobileIconWrapper: {
    width: '100%',
    height: '20%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& i': {
      fontSize: '1.4rem',
    },
  },
  mobileMasteryDisplayWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  mobileMasteryBar: {
    paddingBottom: '10px',
    border: '1px solid black',
  },
  mobileMasteryWrapper: {
    width: '100%',
    height: '20%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mobileMasteryLabel: {
    fontWeight: '500',
    padding: '0px 20px 0px 0px',
    margin: '0px 0px 0px 0px',
  },
  mobileMasteryInfo: {
    padding: '0px 0px 0px 10px',
    margin: '0px 0px 0px 0px',
  },
  mobileCardsWrapper: {
    width: '100%',
    height: '20%',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  mobileCardsLabel: {
    fontWeight: '500',
    padding: '0px 10px 0px 0px',
  },
  mobileButtonWrapper: {
    width: '100%',
    height: '15%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mobileButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    textDecoration: 'none',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: 'var(--button-fontSize-primary)',
    fontWeight: '500',
    background: 'var(--button-primary)',
    width: '125px',
    height: '35px',
    border: 'none',
    transition: 'all 0.4s ease 0s',
    marginLeft: '5px',
    borderRadius: '5px',
    '&.disabled': {
      backgroundColor: 'var(--button-primary-disabled)',
    },
  },
  mobileDeleteButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    textDecoration: 'none',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: 'var(--button-fontSize-primary)',
    fontWeight: '500',
    background: 'var(--button-primary)',
    width: '125px',
    height: '35px',
    border: 'none',
    marginRight: '5px',
    transition: 'all 0.4s ease 0s',
    borderRadius: '5px',
    '&.disabled': {
      backgroundColor: 'var(--button-primary-disabled)',
    },
  },
  mobileButtonLink: {
    textDecoration: 'none',
  },
};

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
