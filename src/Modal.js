import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './styles/Modal.css';

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

  // Click handler for the modal Button Click
  const handleButtonClick = (e) => {
    if (e.currentTarget.id === 'accept' && buttonAction) {
      buttonAction();
    }
    setAnimatingOut(true);
    let timer = setTimeout(() => {
      setAnimatingOut(false);
      hide();
    }, 200);
    return () => clearTimeout(timer);
  };

  if (isShowing) {
    return (
      ReactDOM.createPortal(
        <React.Fragment>
          <div className={animatingOut ? 'modalOverlay modalFadeOut' : 'modalOverlay'}>
            <div className={animatingOut ? 'modalContainer modalSlideOut' : 'modalContainer'}>
              <div className="modalMessage">{messageText}</div>
              {secondButton
                ? (
                  <div className="secondButtonContainer">
                    <button id="deny" className="closeModalDeny" onClick={handleButtonClick} type="button">{secondButtonText}</button>
                    <button id="accept" className="closeModalAccept" onClick={handleButtonClick} type="button">{buttonText}</button>
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
