import { Rating, Textarea } from "@material-tailwind/react";
import { IProductReview } from "share/types/product";
interface CommentProps {
  review: IProductReview;
}
const Comment = ({ review }: CommentProps) => {
  const moment = require("moment");

  console.log("🚀 ~ Comment ~ review:", review);
  return (
    <div className="flex flex-col border border-gray-300 rounded-lg overflow-hidden m-4 p-4 bg-[#f9fafb]">
      <div className="flex justify-between items-center mx-2">
        <div className="flex items-center gap-4">
          <img
            className="w-11 h-11 rounded-full"
            src={
              review.reviewUser.imageUrl.length > 0
                ? review.reviewUser.imageUrl
                : "/images/avatar-none-user.png"
            }
            alt=""
          />
          <h5 className="font-bold">{review.reviewUser.name}</h5>
        </div>
        <div>
          <div className="flex items-center gap-4">
            <Rating readonly value={review.numberOfStar} />
          </div>
          <div className="mt-4">
            <span>
              {review.createdAt &&
                moment(new Date(review.createdAt)).format("HH:mm DD/MM/YYYY")}
            </span>
          </div>
        </div>
      </div>

      <Textarea
        labelProps={{
          className: "hidden",
        }}
        value={review.comment}
        className="!overflow-hidden !resize-none !h-fit !min-h-fit !border !border-gray-300 bg-white
        text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent rounded-lg p-4 mt-4 disabled:bg-white"
        disabled
      />
    </div>
  );
};

export default Comment;
