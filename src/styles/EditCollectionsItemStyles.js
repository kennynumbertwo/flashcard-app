import sizes from './sizes';

export default {
  EditCollectionsItemCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '98.53%',
    height: '50px',
    padding: '0px 0px 0px 0px',
    margin: '5px 0px 0px 0px',
    // borderRadius: '3px',
    color: 'var(--text-primary)',
    backgroundColor: 'var(--background-collection-item)',
    fontSize: '1rem',
    transition: 'all .2s',
    textDecoration: 'none',
    border: '1px solid rgba(0, 0, 0, 0.08)',
    animationName: '$card-item-slide',
    animationDuration: props => (`${props.index * 70}ms`),
    animationTimingFunction: 'ease-in-out',
    animationIterationCount: '1',
    '&:hover': {
      border: '1px solid rgba(0, 0, 0, 0.2)',
      // boxShadow: '0px 1px 2px 1px rgba(0, 0, 0, 0.1)',
    },
  },
  '@keyframes card-item-slide': {
    '0%': {
      transform: 'translateY(50%)',
      opacity: 0,
    },
    '50%': {
      opacity: 0.1,
    },
    '100%': {
      transform: 'translateY(0%)',
      opacity: 1,
    },
  },
  setNameWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '25%',
    height: '50px',
    padding: '0px 0px 0px 22px',
    '& p': {
      whiteSpace: 'no-wrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  },
  setNameWrapperInput: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '25%',
    height: '50px',
    padding: '0px 0px 0px 0px',
    '& .MuiInputBase-root.MuiOutlinedInput-root': {
      borderRadius: '2px',
    },
  },
  categoryWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '25%',
    height: '50px',
    padding: '0px 0px 0px 22px',
    '& p': {
      whiteSpace: 'no-wrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  },
  categoryWrapperInput: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '25%',
    height: '50px',
    padding: '0px 0px 0px 0px',
    '& .MuiInputBase-root.MuiOutlinedInput-root': {
      borderRadius: '2px',
      '&: focus': {
        border: '5px solid red',
      },
    },
  },
  label: {
    margin: '0px 10px 0px 0px',
  },
  masteryWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '10%',
    height: '50px',
  },
  masteryWrapperInner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '50px',
    height: '50px',
  },
  masteryInfo: {
    padding: '0px 0px 0px 8px',
  },
  totalCardsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '10%',
    height: '50px',
  },
  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '10%',
    height: '50px',
  },
  iconWrapperEditing: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '10%',
    height: '50px',
  },
  EditCollectionsItemIcon: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
  },
  EditingCollectionsItemIcon: {
    height: '40px',
    width: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    border: '1px solid rgba(0, 0, 0, 0.3)',
    borderRadius: '2px',
    '&:hover': {
      border: '1px solid rgba(0, 0, 0, 0.7)',
    },
  },
  buttonWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '50px',
    width: '10%',
  },
  buttonWrapperSingle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '50px',
    width: '20%',
  },
  buttonWrapperSingleInner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '50px',
    width: '50%',
    [sizes.down('lg')]: {
      width: '80%',
    },
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'var(--text-light)',
    textDecoration: 'none',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: 'var(--button-fontSize-primary)',
    fontWeight: '500',
    background: 'var(--button-primary)',
    width: '80%',
    height: '30px',
    border: 'none',
    transition: 'all 0.4s ease 0s',
    borderRadius: '5px',
    '&:hover': {
      background: 'var(--button-accept-primary)',
      transition: 'all 0.4s ease 0s',
      cursor: 'pointer',
    },
  },
  deleteButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'var(--text-light)',
    textDecoration: 'none',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: 'var(--button-fontSize-primary)',
    fontWeight: '500',
    background: 'var(--button-primary)',
    width: '80%',
    height: '30px',
    border: 'none',
    transition: 'all 0.4s ease 0s',
    borderRadius: '5px',
    '&:hover': {
      background: 'var(--button-deny-light)',
      transition: 'all 0.4s ease 0s',
      cursor: 'pointer',
    },
  },
  buttonCancel: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'var(--text-light)',
    textDecoration: 'none',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: 'var(--button-fontSize-primary)',
    fontWeight: '500',
    background: 'var(--button-deny-primary)',
    width: '80%',
    height: '30px',
    border: 'none',
    transition: 'all 0.4s ease 0s',
    borderRadius: '5px',
    '&:hover': {
      background: 'var(--button-deny-light)',
      transition: 'all 0.4s ease 0s',
      cursor: 'pointer',
    },
  },
  buttonSave: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'var(--text-light)',
    textDecoration: 'none',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: 'var(--button-fontSize-primary)',
    fontWeight: '500',
    background: 'var(--button-accept-primary)',
    width: '80%',
    height: '30px',
    border: 'none',
    transition: 'all 0.4s ease 0s',
    borderRadius: '5px',
    '&:hover': {
      background: 'var(--button-accept-light)',
      transition: 'all 0.4s ease 0s',
      cursor: 'pointer',
    },
  },
  buttonLink: {
    textDecoration: 'none',
  },

};
