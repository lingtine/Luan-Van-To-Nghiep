import { Button, IconButton } from "@material-tailwind/react";
import React, { RefObject } from "react";
import { useState, useRef } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { BsImage } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
interface UploadImageProps {
  onChange: (file: File) => void;
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

  if (!file) {
    content = (
      <div className="border rounded-xl py-8 border-dashed border-blue-600 h-full">
        <div className="my-8 flex justify-center">
          <BsImage className="text-8xl" />
        </div>

        <div className="flex justify-center ">
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
      </div>
    );
  } else {
    const url = URL.createObjectURL(file);

    content = (
      <div className="flex justify-between items-center p-4 border rounded-xl bg-blue-gray-50">
        <div className="flex gap-4 items-center ">
          <img className="w-20" alt={file.name} src={url} />
          <span>{file.name}</span>
        </div>
        <div>
          <IconButton color="red" onClick={handleRemove}>
            <MdDelete className="text-lg" />
          </IconButton>
        </div>
      </div>
    );
  }

  return <div className="rounded-md">{content}</div>;
};

export default UploadImage;
