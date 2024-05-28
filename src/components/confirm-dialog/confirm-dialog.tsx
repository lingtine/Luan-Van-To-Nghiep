import React from "react";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

export interface IContentConfirm {
  id: string;
  title: string;
  content: string;
}
interface IConfirmDialog {
  data?: IContentConfirm;
  setData: (data?: IContentConfirm) => void;
  handleConfirm: () => void;
}

export const ConfirmDialog: React.FC<IConfirmDialog> = ({
  data,
  setData,
  handleConfirm,
}) => {
  return (
    <>
      <Dialog open={!!data} handler={setData}>
        {data && <DialogHeader>{data.title}</DialogHeader>}
        {data && <DialogBody>{data.content}</DialogBody>}
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => {
              setData();
            }}
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
