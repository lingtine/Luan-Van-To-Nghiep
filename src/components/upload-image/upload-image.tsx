import {
  Input,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import React, { RefObject } from "react";
import { useState, useRef } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { BsImage } from "react-icons/bs";

import { CiCircleRemove } from "react-icons/ci";
interface UploadImageProps {
  onChange: Function;
}

const UploadImage: React.FC<UploadImageProps> = ({ onChange }) => {
  const [file, setFile] = useState<File>();

  const inputRef: RefObject<HTMLInputElement> = useRef(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      onChange(e.target.files[0]);
    }
  };
  const handleRemove = () => {
    const dt = new DataTransfer();

    if (inputRef.current) {
      inputRef.current.files = dt.files;
    }
    setFile(dt.files[0]);
    onChange(dt.files[0]);
  };

  const handleUpload = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  let content;

  if (file) {
    const url = URL.createObjectURL(file);
    content = (
      <>
        <figure className="w-full relative">
          <img
            className="h-full w-full rounded-xl object-cover object-center"
            src={url}
            alt={file.name}
          />

          <CiCircleRemove
            onClick={handleRemove}
            className="absolute top-0 right-0 text-2xl cursor-pointer"
          />
        </figure>
        <Typography variant="small" className="mt-2 text-center font-normal">
          {file.name}
        </Typography>
      </>
    );
  } else {
    content = (
      <div className="my-8 flex justify-center">
        <BsImage className="text-8xl" />
      </div>
    );
  }

  return (
    <div className="flex flex-col  rounded-md   justify-center ">
      <Typography variant="h4" className="my-4">
        Thêm Hình ảnh
      </Typography>
      <div>{content}</div>
      {!!file ? (
        <></>
      ) : (
        <div className="flex justify-center">
          <input
            className="border-none"
            ref={inputRef}
            hidden
            onChange={handleChange}
            accept=".jpg, .jpeg, .png"
            type="file"
          ></input>
          <Button
            color="blue"
            className="flex items-center gap-4"
            onClick={handleUpload}
          >
            <AiOutlineCloudUpload className="text-xl" />
            Tải hình ảnh lên
          </Button>
        </div>
      )}
    </div>
  );
};

export default UploadImage;
