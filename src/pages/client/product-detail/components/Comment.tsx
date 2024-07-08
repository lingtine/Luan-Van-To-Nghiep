import { Rating, Textarea } from "@material-tailwind/react";
import { IProductReview } from "share/types/product";
interface CommentProps {
  review: IProductReview;
}

const Comment = ({ review }: CommentProps) => {
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
        className="!overflow-hidden !resize-none !h-fit !min-h-fit !border !border-gray-300 bg-white
        text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent rounded-lg p-4 mt-4 disabled:bg-white"
        disabled
      />
    </div>
  );
};

export default Comment;
