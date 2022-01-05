import sizes from './sizes';

export default {
  IconListModal: {
    zIndex: '1201',
    position: 'fixed',
    left: '0',
    top: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    opacity: '1',
    '&.IconModalFadeIn': {
      animationName: '$IconModalFadeIn',
      animationIterationCount: '1',
      animationTimingFunction: 'ease-in',
      animationDuration: '0.15s',
    },
    '&.IconModalFadeOut': {
      animationName: '$IconModalFadeOut',
      animationIterationCount: '1',
      animationTimingFunction: 'ease-in',
      animationDuration: '0.15s',
    },
  },
  '@keyframes IconModalFadeIn': {
    '0%': {
      opacity: 0,
    },
    '100%': {
      opacity: 1,
    },
  },

  '@keyframes IconModalFadeOut': {
    '0%': {
      opacity: 1,
    },
    '100%': {
      opacity: 0,
    },
  },
  IconListWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  IconListCard: {
    display: 'flex',
    padding: '20px 30px 20px 30px',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    width: '1000px',
    height: '700px',
    backgroundColor: 'var(--background-white)',
    borderRadius: '5px',
    boxShadow: '0px 5px 10px 3px rgba(0, 0, 0, 0.3)',
    [sizes.down('sm')]: {
      height: '70vh',
      width: '90vw',
      padding: '20px 10px 20px 10px',

    },
  },
  filterWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItem: 'center',
    paddingBottom: '0px',
    width: '98%',
    '& svg': {
      color: 'var(--text-primary)',
      display: 'flex',
      marginRight: 'auto',
      alignSelf: 'center',
      transition: 'all .5s',
      '&:hover': {
        cursor: 'pointer',
        boxShadow: '0px 2px 5px 1px rgba(0, 0, 0, 0.3)',
      },
    },
  },

  iconsWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    height: '600px',
    [sizes.down('sm')]: {
      height: '100%',
    },
  },
  iconsWrapperOuter: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    height: '552px',
    [sizes.down('sm')]: {
      height: '100%',
    },
  },
  iconsWrapperInner: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    [sizes.down('sm')]: {
      height: '100%',
    },
  },

  pageNavWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '65px',
  },
  pageNavArrowWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '35px',
    width: '35px',
    padding: '0px 0px 0px 0px',
    margin: '0px 15px 0px 15px',
    borderRadius: '50px',
    transition: 'all .5s',
    color: 'var(--text-primary)',
    '& i': {
      transition: 'all .5s',
    },
    '&:hover': {
      cursor: 'pointer',
      color: 'var(--button-accept-primary)',
      boxShadow: '0px 2px 5px 1px rgba(0, 0, 0, 0.3)',
    },
  },
};
