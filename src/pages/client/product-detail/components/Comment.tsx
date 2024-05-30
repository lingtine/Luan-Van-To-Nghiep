import { Button, Rating, Textarea } from "@material-tailwind/react";
import { useState } from "react";
import { toast } from "react-toastify";
import { IProductReview } from "redux/api/types";
import { useAppSelector } from "redux/store";

interface CommentProps {
  review: IProductReview;
}

const Comment = ({ review }: CommentProps) => {
  // const [editComment, setEditComment] = useState(review.comment ?? "");
  // const [isDisableEdit, setIsDisableEdit] = useState(true);
  // const [isOpenReply, setIsOpenReply] = useState(false);
  // const [reply, setReply] = useState("");
  // const { accessToken } = useAppSelector((state) => state.authSlice);
  // const { user } = useAppSelector((state) => state.userSlice);

  // const isOwner = user?.id === review.customerId;

  // const handleClick = () => {
  //   if (!accessToken) {
  //     toast.warning("Bạn cần đăng nhập để trả lời bình luận");
  //   } else {
  //     setIsOpenReply(true);
  //   }
  // };

  // const handleCancel = () => {
  //   setIsOpenReply(false);
  // };

  // const handleChangeEdit = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   setEditComment(event.target.value);
  // };

  // const replyInput = (
  //   <div className="mt-2 ml-4 flex gap-6 justify-between items-center">
  //     <img
  //       className="w-7 h-7 rounded-full "
  //       src={review.reviewUser.imageUrl}
  //       alt=""
  //     />
  //     <Textarea
  //       labelProps={{
  //         className: "hidden",
  //       }}
  //       value={reply}
  //       onChange={(event) => setReply(event.target.value)}
  //       rows={1}
  //       className="!overflow-hidden !resize-none !h-fit !min-h-fit !border !border-gray-300 bg-white
  //       text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent rounded-lg p-4 mt-4 disabled:bg-white"
  //     />
  //     <div className="text-right">
  //       <Button
  //         type="submit"
  //         size="sm"
  //         className="px-6 py-2 font-medium text-center text-white bg-primary-3-700 rounded-lg focus:ring-4
  //             focus:ring-primary-3-200 dark:focus:ring-primary-3-900 hover:bg-primary-3-800
  //               items-center"
  //       >
  //         Gửi
  //       </Button>
  //     </div>
  //   </div>
  // );

  return (
    <div className="flex flex-col border border-gray-300 rounded-lg overflow-hidden m-4 p-4 bg-[#f9fafb]">
      <div className="flex justify-between items-center mx-2">
        <img
          className="w-10 h-10 rounded-full"
          src={review.reviewUser.imageUrl}
          alt=""
        />
        <div className="flex items-center gap-4">
          <Rating readonly value={review.numberOfStar} />
        </div>
      </div>

      <Textarea
        labelProps={{
          className: "hidden",
        }}
        value={review.comment}
        // onChange={(event) => handleChangeEdit(event)}
        className="!overflow-hidden !resize-none !h-fit !min-h-fit !border !border-gray-300 bg-white
        text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent rounded-lg p-4 mt-4 disabled:bg-white"
        disabled
      />

      {/* {review.children?.map((child) => (
        <Comment review={child} key={child.id} />
      ))} */}

      {/* {isOpenReply && replyInput} */}

      {/* Buttons */}
      {/* <div className="flex flex-row mt-2 gap-2 justify-end">
        {isOpenReply && (
          <div className="text-right">
            <button
              className="text-sm font-medium px-5 py-2.5 text-center text-white bg-primary-3-700 rounded-lg items-center
                enabled:focus:ring-4 enabled:focus:ring-primary-3-200 enabled:dark:focus:ring-primary-3-900 enabled:hover:bg-primary-3-800"
              onClick={handleCancel}
            >
              Đóng
            </button>
          </div>
        )}

        {isOwner && (
          <div className="text-right">
            <Button
              type="button"
              size="sm"
              className="px-6 py-2 font-medium text-center text-white bg-primary-3-700 rounded-lg focus:ring-4
              focus:ring-primary-3-200 dark:focus:ring-primary-3-900 hover:bg-primary-3-800
                items-center"
            >
              Gửi
            </Button>
            <button
              className="text-sm font-medium px-5 py-2.5 text-center text-white bg-primary-3-700 rounded-lg items-center
                enabled:focus:ring-4 enabled:focus:ring-primary-3-200 enabled:dark:focus:ring-primary-3-900 enabled:hover:bg-primary-3-800"
              onClick={() => setIsDisableEdit((prev) => !prev)}
            >
              Sửa
            </button>
          </div>
        )}

        <button
          className="text-sm font-medium px-5 py-2.5 text-center text-white bg-primary-3-700 rounded-lg items-center
            enabled:focus:ring-4 enabled:focus:ring-primary-3-200 enabled:dark:focus:ring-primary-3-900 enabled:hover:bg-primary-3-800"
          onClick={handleClick}
          disabled={!isOwner}
        >
          Trả lời
        </button>
      </div> */}
    </div>
  );
};

export default Comment;
