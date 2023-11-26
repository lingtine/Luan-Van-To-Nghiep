import { useEffect } from "react";
import ReactDOM from "react-dom";

import React from "react";

interface ModalProps {
  onClose: React.MouseEventHandler;
  children: React.ReactNode;
  actions: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children, actions }) => {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return ReactDOM.createPortal(
    <div>
      <div onClick={onClose}></div>
      <div>
        <div>
          {children}
          <div>{actions}</div>
        </div>
      </div>
    </div>,
    document.querySelector(".modal-container") as HTMLDivElement
  );
};

export default Modal;
