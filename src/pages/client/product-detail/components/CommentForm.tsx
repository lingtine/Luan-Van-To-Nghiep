import { Button, Rating, Textarea } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAddReviewProductMutation } from "redux/api/catalog/review";
import { useAppSelector } from "redux/store";
import { IAddReviewReq } from "redux/api/catalog/review";
import { ICustomerDetail } from "redux/api/types";
interface ICommentFormProps {
  isChild: boolean;
  productId: string;
}

const CommentForm = ({ productId }: ICommentFormProps) => {
  const [createReview, result] = useAddReviewProductMutation();

  const { user } = useAppSelector((state) => state.userSlice) as {
    user: ICustomerDetail;
  };

  const [dataForm, setDataForm] = useState<IAddReviewReq>({
    productId: productId,
    numberOfStar: 5,
    comment: "",
    attachments: new DataTransfer().files || null,
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (user) {
      createReview(dataForm);
    } else {
      toast.warning("Bạn cần đăng nhập để bình luận");
    }
  };

  // TODO: toast done
  useEffect(() => {
    if (result.isSuccess) {
      toast.success("Thao tác thành công");
    }
  }, [result.isSuccess]);

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDataForm(() => ({ ...dataForm, comment: event.target.value }));
  };

  const handleChangeStar = (currentStar: number) => {
    setDataForm(() => ({ ...dataForm, numberOfStar: currentStar }));
  };

  return (
    <form className="flex gap-4" onSubmit={(e) => handleSubmit(e)}>
      <div className="my-4 flex flex-col items-center w-full justify-between ">
        <div className="flex flex-row items-center justify-between w-full mb-4">
          {/* <img className="w-8 h-8" src={user.} alt={user.name} /> */}
          <span className="flex items-center gap-4">
            <Rating value={dataForm.numberOfStar} onChange={handleChangeStar} />
          </span>
        </div>
        <div className="flex flex-row items-start justify-between w-full gap-4">
          {
            <Textarea
              rows={3}
              resize={true}
              value={dataForm.comment}
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
