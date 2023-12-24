import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { IconButton } from "@material-tailwind/react";

import { CiCircleRemove } from "react-icons/ci";

interface SlideBarAdminProps {
  children: React.ReactNode;
  onClose: Function;
  status: boolean;
}

const SlideBarAdmin: React.FC<SlideBarAdminProps> = ({
  onClose,
  children,
  status,
}) => {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);
  const content = (
    <>
      <div
        onClick={() => {
          onClose();
        }}
        className="absolute  inset-0 bg-gray-300 opacity-80 z-50"
      ></div>
      <div className="absolute  inset-y-0  min-w-[80%] bg-white z-50 h-full">
        <div className="h-full">{children}</div>
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
        document.querySelector("#nav-mobie-admin") as HTMLElement
      )}
    </>
  );
};

export default SlideBarAdmin;
