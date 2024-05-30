import { useGetReviewsByProductsQuery } from "redux/api/catalog/review";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import "./index.css";

interface ProductReviewProps {
  productId: string;
}

const ProductReview = ({ productId }: ProductReviewProps) => {
  const { data, isFetching, isSuccess } =
    useGetReviewsByProductsQuery(productId);

  return (
    <div>
      <div className="items-center p-6">
        <h2 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white">
          Bình luận
        </h2>
      </div>
      <div className="divide-y">
        <div className="p-4">
          <CommentForm isChild={false} productId={productId} />
        </div>
        {isSuccess && (
          <div>
            {(data || []).map((comment, index) => (
              <Comment review={comment} key={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductReview;
/*
Container
  Form -> enter comment
  List Comment
    Comment
      Nested comment
*/
