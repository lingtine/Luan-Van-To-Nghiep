import { Button, Rating } from "@material-tailwind/react";
import { useRef, useState } from "react";

const CommentForm = () => {
  const [value, setValue] = useState(5);
  const [comment, setComment] = useState("");

  const inputRef = useRef(null);

  const handleSubmit = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setComment("");
    setValue(5);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white">
          Bình luận
        </h2>
      </div>
      <form className="flex gap-4">
        <span className="flex items-center gap-4">
          <Rating
            value={value}
            onChange={(currentValue) => {
              setValue(currentValue);
            }}
          />
        </span>
        <div className="w-[100%] py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <label className="sr-only">Your comment</label>
          <textarea
            value={comment}
            id="comment"
            rows={6}
            className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
            placeholder="Nhập bình luận..."
            required
            ref={inputRef}
            onChange={(event) => setComment(event.target.value)}
          ></textarea>
        </div>
        <div className="text-right basis-1/12">
          <Button
            type="submit"
            size="lg"
            className="px-6 py-2 font-medium text-center text-white bg-primary-3-700 rounded-lg focus:ring-4
            focus:ring-primary-3-200 dark:focus:ring-primary-3-900 hover:bg-primary-3-800
            items-center"
          >
            Gửi
          </Button>
        </div>
      </form>
    </>
  );
};

export default CommentForm;
