export default {
  EditCollectionsItemBlankCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '1000px',
    height: '50px',
    padding: '0px 0px 0px 0px',
    margin: '5px 0px 0px 0px',
    borderRadius: '3px',
    color: 'var(--text-primary)',
    backgroundColor: 'var(--background-white)',
    fontSize: '1rem',
    transition: 'all .2s',
    textDecoration: 'none',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    '&:hover': {
      boxShadow: '0px 1px 2px 1px rgba(0, 0, 0, 0.1)',
    },
  },
  setNameWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '25%',
    height: '50px',
    padding: '0px 0px 0px 22px',
  },
  setNameWrapperInput: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '25%',
    height: '50px',
    padding: '0px 0px 0px 0px',
  },
  categoryWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '25%',
    height: '50px',
    padding: '0px 0px 0px 22px',
  },
  categoryWrapperInput: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '25%',
    height: '50px',
    padding: '0px 0px 0px 0px',
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
  EditDeckListItemIcon: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
  },
  EditCollectionsItemIcon: {
    height: '40px',
    width: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    border: '1px solid rgba(0, 0, 0, 0.3)',
    borderRadius: '5px',
    '&:hover': {
      border: '1px solid rgba(0, 0, 0, 0.7)',
    },
  },
  EditCollectionsItemBlankIcon: {
    height: '40px',
    width: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    border: '1px solid rgba(0, 0, 0, 0.3)',
    borderRadius: '5px',
    '& i': {
      color: 'rgba(0, 0, 0, 0.3)',
    },
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
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    textDecoration: 'none',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: '.8rem',
    fontWeight: '500',
    background: 'var(--button-primary)',
    width: '80px',
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
  buttonCancel: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    textDecoration: 'none',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: '.8rem',
    fontWeight: '500',
    background: 'var(--button-deny-primary)',
    width: '80px',
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
    color: 'white',
    textDecoration: 'none',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: '.8rem',
    fontWeight: '500',
    background: 'var(--button-accept-primary)',
    width: '80px',
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
