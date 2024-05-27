import ReviewStar from "./ReviewStar";

interface ProductReviewProps {}

const ProductReview = ({}: ProductReviewProps) => {
  return (
    <div>
      <div>User profile</div>
      <div className="grid grid-rows-4 gap-4">
        <ReviewStar numberOfStar={4} />
      </div>
      <div>
        <form action="">
          <input type="text" name="" id="" placeholder="Review" />
          <button>Gửi</button>
        </form>
      </div>
    </div>
  );
};

export default ProductReview;
