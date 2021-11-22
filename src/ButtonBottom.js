import React from 'react';
import { withStyles } from '@material-ui/core';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';

const styles = {
  buttonBottomWrapper: {
    backgroundColor: props => (props.isHighlighted ? 'var(--button-accept-primary)' : 'var(--button-primary)'),
    fontFamily: 'inherit',
    fontWeight: '500',
    height: '40px',
    width: '120px',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    fontSize: '1.8rem',
    borderRadius: '4px',
    border: 'none',
    color: 'var(--text-button-light)',
    transition: 'all 0.4s ease 0s',
    '& p': {
      fontSize: '.9rem',
      margin: '0px 0px 0px 0px',
    },
    '&:hover': {
      backgroundColor: 'var(--button-accept-primary)',
      transition: 'all 0.4s ease 0s',
      cursor: 'pointer',
    },
    '&.highlighted': {
      animation: '1500ms ease-in-out infinite $buttonHighlight',
    },
  },

  '@keyframes buttonHighlight': {
    '0%': {
      backgroundColor: 'var(--button-accept-light)',
    },
    '50%': {
      backgroundColor: 'var(--button-accept-primary)',
    },

    '100%': {
      backgroundColor: 'var(--button-accept-light)',
    },
  },
};

function ButtonBottom(props) {
  const { classes, icon, handleButtonClick, tooltipText, isHighlighted } = props;
  return (
    <Tooltip TransitionComponent={Zoom} title={tooltipText}>
      <button className={`${classes.buttonBottomWrapper} ${isHighlighted && 'highlighted'}`} onClick={handleButtonClick} type="button">
        {icon}
      </button>
    </Tooltip>
  );
}

export default withStyles(styles)(ButtonBottom);
