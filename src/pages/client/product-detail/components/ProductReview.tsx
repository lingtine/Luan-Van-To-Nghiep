import { useGetReviewsByProductsQuery } from "redux/api/catalog/review";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

interface ProductReviewProps {
  productId: string;
}

const ProductReview = ({ productId }: ProductReviewProps) => {
  // const [currentPage, setCurrentPage] = useState(0);

  const { data, isSuccess } = useGetReviewsByProductsQuery({
    productId,
    params: { pageIndex: 0, pageSize: 10000 },
  });

  // const [currentData, setCurrentData] = useState(data);
  // const [currentSuccessState, setCurrentSuccessState] = useState(isSuccess);

  // const handleChangePage = (index: number) => {
  //   setCurrentPage(index);
  // };

  // useEffect(() => {
  //   const { current, isState } = useGetReviewsByProductsQuery({
  //     productId,
  //     params: { pageIndex: currentPage, pageSize: 10 },
  //   });
  //   setCurrentData(current);
  //   setCurrentSuccessState(isState);
  // }, [currentPage]);

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
                ?.filter((review) => review.comment !== null)
                .map((comment) => (
                  <Comment review={comment} key={comment.id} />
                ))}
            </div>
            {/* {data.totalCount >=
              data.pageSize * (data.pageIndex + 1) && (
              <div className="flex justify-center my-8">
                <PaginationClient
                  onChange={handleChangePage}
                  pageIndex={currentPage}
                  pageSize={data.pageSize}
                  totalNumber={data.totalCount}
                />
              </div>
            )} */}
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
