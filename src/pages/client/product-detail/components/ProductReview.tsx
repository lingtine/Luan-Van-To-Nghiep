import { useGetReviewsByProductsQuery } from "redux/api/catalog/review";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

interface ProductReviewProps {
  productId: string;
}

const ProductReview = ({ productId }: ProductReviewProps) => {
  const { data, isSuccess, isLoading } = useGetReviewsByProductsQuery({
    productId,
    params: { pageIndex: 0, pageSize: 10000 },
  });

  if (isSuccess) {
    const { data: listComment } = data;
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
                {listComment.map((comment) => (
                  <Comment review={comment} key={comment.id} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  } else if (isLoading) {
    return <>Loading</>;
  }

  return <></>;
};

export default ProductReview;
