import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

function Modal(props) {
  const [animatingOut, setAnimatingOut] = useState(false);
  const {
    isShowing,
    hide,
    messageText,
    buttonText,
    buttonAction,
    secondButton,
    secondButtonText,
  } = props;

  const handleButtonClick = () => {
    buttonAction();
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
              <div className="modalMessage">{messageText}</div>
              {secondButton
                ? (
                  <div>
                    <button className="closeModalDeny" onClick={handleButtonClick} type="button">{secondButtonText}</button>
                    <button className="closeModalAccept" onClick={handleButtonClick} type="button">{buttonText}</button>
                  </div>
                )
                : <button className="closeModal" onClick={handleButtonClick} type="button">{buttonText}</button>}
            </div>
          </div>
        </React.Fragment>, document.body,
      ));
  }
  return null;
}

export default Modal;
