import { useState } from "react";
import { FaStar } from "react-icons/fa6";
interface IReviewStarProps {
  numberOfStar: number;
}

const ReviewStar = ({ numberOfStar }: IReviewStarProps) => {
  const [rating, setRating] = useState(numberOfStar);
  console.log("🚀 ~ ReviewStar ~ rating:", rating)
  
  return (
    <>
      {[...Array(5)].map((star, index) => {
        const currentRating = index + 1;
      
        return (
          <label>
            <FaStar
            color={currentRating <= (rating) ? "#ffc107" : "#e4e5e9"} 
            size={30}/>

            <input
              className="hidden"
              type="radio"
              name="rating"
              value={currentRating}
              onClick={() => setRating(currentRating)}
            />
          </label>
        );
      })}
    </>
  );
};

export default ReviewStar;
