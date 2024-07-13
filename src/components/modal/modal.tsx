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
        className="absolute inset-0 bg-black opacity-80 z-50 transition-all w-full h-full"
      ></div>
      <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2  p-6 bg-white z-50 h-fit w-fit rounded min-w-[600px]">
        <div className="flex flex-col justify-between ">
          {children}
          {actions && <div className="flex justify-end">{actions}</div>}
        </div>
      </div>
    </>,
    document.querySelector(".modal-container") as HTMLDivElement
  );
};

export default Modal;
