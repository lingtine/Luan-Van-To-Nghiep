import Pagination from "components/pagination/pagitnation";
import { useGetReviewsByProductsQuery } from "redux/api/catalog/review";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import "./index.css";

interface ProductReviewProps {
  productId: string;
}

const ProductReview = ({ productId }: ProductReviewProps) => {
  const { data, isSuccess } = useGetReviewsByProductsQuery({
    productId,
    params: { pageIndex: 0, pageSize: 10 },
  });
  console.log("🚀 ~ ProductReview ~ data:", data);
  console.log("🚀 ~ ProductReview ~ isSuccess:", isSuccess);
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
            <div>
              {data.data
                ?.filter((review) => review.comment)
                .map((comment) => (
                  <Comment review={comment} key={comment.id} />
                ))}
            </div>
            {data.totalCount >= data.pageSize * (data.pageIndex + 1) && (
              <div className="flex justify-center my-8">
                <Pagination
                  pageIndex={data.pageIndex}
                  pageSize={data.pageSize}
                  totalCount={data.totalCount} url={""}                />
              </div>
            )}
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
