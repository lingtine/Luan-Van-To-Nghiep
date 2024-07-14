import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { CiCircleRemove } from "react-icons/ci";

interface CommentNoneLoginProps {}

const CommentNoneLogin: React.FC<CommentNoneLoginProps> = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);
  return (
    <>
      <div className="flex flex-col gap-4 justify-center items-center">
        <h5>Bạn đánh giá sao về sản phẩm này?</h5>
        <div>
          <Button
            onClick={handleOpen}
            className="bg-primary hover:bg-primary-text-emphasis text-white"
          >
            Đánh giá ngay
          </Button>
        </div>
      </div>
      <Dialog open={open} handler={handleOpen} size="xs" className="relative">
        <CiCircleRemove
          onClick={handleOpen}
          className="absolute right-2 top-2 text-2xl"
        />
        <DialogHeader className="justify-center ">
          <span>TMember</span>
        </DialogHeader>
        <DialogBody>Vui lòng đăng nhập tài khoản để đánh giá.</DialogBody>
        <DialogFooter className="flex justify-center gap-4">
          <Link to={"/register"}>
            <Button className="max-w-32 w-full">Đăng kí</Button>
          </Link>
          <Link to={"/login"}>
            <Button className="bg-primary max-w-32 w-full">Đăng nhập</Button>
          </Link>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default CommentNoneLogin;
