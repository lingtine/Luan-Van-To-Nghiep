import Comment from "./Comment";
import CommentForm from "./CommentForm";
import "./index.css";

interface ProductReviewProps {
  numberOfStar: number;
}

const ProductReview = ({ numberOfStar }: ProductReviewProps) => {
  return (
    <div className="divide-y">
      <div className="p-4"> 
        <CommentForm />
      </div>
      <div>
      {[...Array(10)].map((comment, index)=> <Comment/>)}
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
