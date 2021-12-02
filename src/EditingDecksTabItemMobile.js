import React from 'react';
import { withStyles } from '@material-ui/core';
import ProgressBarVert from './ProgressBarVert';
import Modal from './Modal';

const styles = {
  EditingDecksTabItemMobile: {
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
    '&:hover': {
      boxShadow: '0px 1px 2px 1px rgba(0, 0, 0, 0.1)',
    },
  },
  mobileTopWrapper: {
    width: '100%',
    height: '210px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: '5px',
    // border: '1px solid red',
  },
  mobileBottomWrapper: {
    width: '100%',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // border: '1px solid red',
  },
  mobileSetNameWrapper: {
    width: '100%',
    height: '20%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // border: '1px solid black',
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
    // border: '1px solid black',
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
    // flexDirection: 'column',
    // border: '1px solid black',
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
    // flexDirection: 'column',
    // border: '1px solid black',
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
    // flexDirection: 'column',
    // border: '1px solid black',
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
    // border: '1px solid black',
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
    borderRadius: '2px',
    '&.disabled': {
      backgroundColor: 'var(--button-primary-disabled)',
      '&:hover': {
        cursor: 'default',
        backgroundColor: 'var(--button-primary-disabled)',
      },
    },
    '&:hover': {
      background: 'var(--button-accept-primary)',
      transition: 'all 0.4s ease 0s',
      cursor: 'pointer',
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
    borderRadius: '2px',
    '&.disabled': {
      backgroundColor: 'var(--button-primary-disabled)',
      '&:hover': {
        cursor: 'default',
        backgroundColor: 'var(--button-primary-disabled)',
      },
    },
    '&:hover': {
      background: 'var(--button-accept-primary)',
      transition: 'all 0.4s ease 0s',
      cursor: 'pointer',
    },
  },
  mobileButtonLink: {
    textDecoration: 'none',
  },
};

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
