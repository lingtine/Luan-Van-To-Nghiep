import { IconButton } from "@material-tailwind/react";
import React from "react";
import { createPortal } from "react-dom";
import { CiCircleRemove } from "react-icons/ci";

interface SlideDrawerProps {
  children: React.ReactNode;
  onClose: Function;
  status: boolean;
}

const SlideDrawer: React.FC<SlideDrawerProps> = ({
  children,
  onClose,
  status,
}) => {
  const content = (
    <>
      <div
        onClick={() => {
          onClose();
        }}
        className="absolute  inset-0 bg-gray-300 opacity-80 z-50"
      ></div>
      <div className="absolute  inset-y-0  min-w-[80%] bg-white z-50">
        <div className="flex justify-center h-full flex-col items-center">
          {children}
        </div>
        <div className="absolute right-5 top-5">
          <IconButton
            className=" text-2xl"
            onClick={() => {
              onClose();
            }}
          >
            <CiCircleRemove />
          </IconButton>
        </div>
      </div>
    </>
  );

  return (
    <>
      {createPortal(
        content,
        document.querySelector("#nav-mobie") as HTMLElement
      )}
    </>
  );
};

export default SlideDrawer;
