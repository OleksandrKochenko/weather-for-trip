import { createPortal } from 'react-dom';
import './styles.css';
import { useEffect } from 'react';

const modalRoot = document.querySelector('#root-modal');

export const Modal = ({ onClose, title, children }) => {
  const handleKeyDown = event => {
    event.key === 'Escape' && onClose();
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  return createPortal(
    <div
      className="modal_overlay"
      onClick={e => {
        if (e.currentTarget !== e.target) return;
        onClose();
      }}
    >
      <div className="modal_window">
        <div className="modal_title">
          <span>{title}</span>
          <svg
            onClick={onClose}
            className="close_btn"
            xmlns="http://www.w3.org/2000/svg"
            height="14pt"
            viewBox="0 0 392 392"
            width="14pt"
          >
            <path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0" />
          </svg>
        </div>
        <div className="modal_body">{children}</div>
        <div className="modal_controls">
          <button className="cancel_btn" type="button">
            Cancel
          </button>
          <button className="save_btn" type="button">
            Save
          </button>
        </div>
      </div>
    </div>,
    modalRoot
  );
};
