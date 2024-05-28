import React from "react";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

interface IConfirmDialog {
  isOpen: boolean;
  setIsOpen: () => void;
  handleConfirm: () => void;
  title?: string;
  content?: string;
}

export const ConfirmDialog: React.FC<IConfirmDialog> = ({
  isOpen,
  setIsOpen,
  handleConfirm,
  title,
  content,
}) => {
  return (
    <>
      <Dialog open={isOpen} handler={setIsOpen}>
        {title && <DialogHeader>{title}</DialogHeader>}
        {content && <DialogBody>{content}</DialogBody>}
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={setIsOpen}
            className="mr-1"
          >
            <span>Hủy</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleConfirm}>
            <span>Xác nhận</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};
