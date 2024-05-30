import { Button, Input, Rating, Textarea } from "@material-tailwind/react";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAddReviewProductMutation } from "redux/api/catalog/review";
import { useAppSelector } from "redux/store";

interface ICommentFormProps {
  isChild: boolean;
  productId: string;
}

const CommentForm = ({ isChild, productId }: ICommentFormProps) => {
  const [star, setStar] = useState(5);
  const [comment, setComment] = useState("");
  const [createReview, result] = useAddReviewProductMutation();

  const { accessToken } = useAppSelector((state) => state.authSlice);

  const [dataForm, setDataForm] = useState<{
    productId: string;
    numberOfStar: number;
    comment: string;
    attachments?: FileList;
  }>({
    productId: productId,
    numberOfStar: star,
    comment: comment,
    attachments: new DataTransfer().files || null,
  });

  const avatarSize = isChild ? 7 : 10;
  const textareaRows = 1;

  const avatarClassNames = `w-${avatarSize} h-${avatarSize} rounded-full`;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (!accessToken) {
      toast.warning("Bạn cần đăng nhập để trả lời bình luận");
    } else {
      event.preventDefault();
      setComment("");
      setStar(5);
      createReview(dataForm);
    }
  };

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setComment(event.target.value);
    setDataForm(() => ({ ...dataForm, comment: comment }));
  };

  const handleChangeStar = (currentStar: number) => {
    setStar(currentStar);
    setDataForm(() => ({ ...dataForm, numberOfStar: currentStar }));
  };

  return (
    <form className="flex gap-4" onSubmit={(e) => handleSubmit(e)}>
      <div className="my-4 flex flex-col items-center w-full justify-between ">
        <div className="flex flex-row items-center justify-between w-full mb-4">
          <img className={avatarClassNames} src="" alt="" />
          <span className="flex items-center gap-4">
            <Rating
              value={star}
              onChange={(currentValue) => handleChangeStar(currentValue)}
            />
          </span>
        </div>
        <div className="flex flex-row items-start justify-between w-full gap-4">
          {
            // isChild ? (
            //   <Input
            //     crossOrigin={"use-credentials"}
            //     variant="outlined"
            //     label="Bình luận"
            //   />
            // ) :
            <Textarea
              rows={textareaRows}
              resize={true}
              value={comment}
              onChange={(event) => handleCommentChange(event)}
              label="Bình luận"
              required
            />
          }

          <div className="text-right">
            <Button
              type="submit"
              size="sm"
              className="px-6 py-2 font-medium text-center text-white bg-primary-3-700 rounded-lg focus:ring-4
              focus:ring-primary-3-200 dark:focus:ring-primary-3-900 hover:bg-primary-3-800
                items-center"
            >
              Gửi
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
