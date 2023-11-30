import { useEffect } from "react";
import ReactDOM from "react-dom";

import React from "react";

interface ModalProps {
  onClose: React.MouseEventHandler;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children, actions }) => {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      <div
        onClick={onClose}
        className="absolute inset-0 bg-gray-300 opacity-80 z-50"
      ></div>
      <div className="absolute inset-x-[28%] inset-y-40 p-10 bg-white z-50">
        <div className="flex flex-col justify-between h-full">
          {children}
          <div className="flex justify-end">{actions}</div>
        </div>
      </div>
    </>,
    document.querySelector(".modal-container") as HTMLDivElement
  );
};

export default Modal;
