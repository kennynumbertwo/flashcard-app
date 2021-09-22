import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

function Modal({ isShowing, hide }) {
  const [animatingOut, setAnimatingOut] = useState(false);

  const handleButtonClick = () => {
    setAnimatingOut(true);
    let timer = setTimeout(() => {
      hide();
      setAnimatingOut(false);
    }, 200);
    return () => clearTimeout(timer);
  };

  if (isShowing) {
    return (
      ReactDOM.createPortal(
        <React.Fragment>
          <div className={animatingOut ? 'modalOverlay fadeOut' : 'modalOverlay'}>
            <div className={animatingOut ? 'modalContainer slideOut' : 'modalContainer'}>
              <div className="modalMessage">THIS IS A MODAL</div>
              <button className="closeModal" onClick={handleButtonClick} type="button">OK</button>
            </div>
          </div>
        </React.Fragment>, document.body,
      ));
  }
  return null;
}

export default Modal;
