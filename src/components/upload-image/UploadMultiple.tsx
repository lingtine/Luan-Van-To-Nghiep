import Button from "@mui/material/Button";
import Modal from "components/modal/modal";
import { RefObject, useRef, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { BsImage } from "react-icons/bs";
interface IUploadMultipleProps {
  handleUploadRelatedImages: Function;
  images?: string[];
}

const UploadMultiple = ({
  handleUploadRelatedImages,
  images,
}: IUploadMultipleProps) => {
  const [files, setFiles] = useState<FileList | undefined>();
  const [fileUrls, setFileUrls] = useState<string[]>(images || []);
  const [isOpen, setIsOpen] = useState(false);
  const [currentReview, setCurrentReview] = useState("");
  const inputRef: RefObject<HTMLInputElement> = useRef(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const urls: string[] = [];
      setFiles(e.target.files);
      files.forEach((x) => urls.push(URL.createObjectURL(x)));
      setFileUrls(urls);
      handleUploadRelatedImages(e.target.files);
    }
  };

  const handleUpload = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleOpen = (url: string) => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    setCurrentReview(url);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="border rounded-xl py-8 border-dashed border-blue-600">
        <div className="my-8 flex justify-center">
          <BsImage className="text-8xl" />
        </div>

        <div className="flex justify-center ">
          <input
            type="file"
            accept=".jpg, .jpeg, .png"
            name="Upload"
            id=""
            hidden
            multiple
            ref={inputRef}
            onChange={(e) => handleChange(e)}
          />
          <Button
            variant="contained"
            className="flex items-center gap-4"
            onClick={handleUpload}
          >
            <AiOutlineCloudUpload className="text-xl" />
            Tải lên hình ảnh sản phẩm
          </Button>
        </div>
      </div>
      {fileUrls.length > 0 && (
        <div className="flex overflow-x-scroll p-3">
          {fileUrls.map((url) => (
            <img
              className="w-20 h-20 ms-2"
              src={url}
              alt=""
              onClick={() => handleOpen(url)}
            />
          ))}
        </div>
      )}

      {isOpen && (
        <Modal onClose={handleClose}>
          <img src={currentReview} alt="" />
        </Modal>
      )}
    </>
  );
};

export default UploadMultiple;
