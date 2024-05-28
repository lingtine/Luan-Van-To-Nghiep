import { Rating } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { IProductReview } from "redux/api/types";
import { useAppSelector } from "redux/store";

interface CommentProps{
  review: IProductReview,  
}


const Comment = () => {
  const { accessToken } = useAppSelector((state) => state.authSlice);

  const handleClick = ()=>{
        
    if (!accessToken) {
      toast.warning("Bạn cần đăng nhập để trả lời bình luận");
    }

    console.log("Comment: reply comment");
  }
  return (
    <>
      <div
        className="flex flex-col border border-gray-300 rounded-lg overflow-hidden m-4 p-4
       bg-[#f9fafb]"
      >
        <div className="flex justify-between items-center mr-6">
          <div className="">
            <img
              className="w-10 h-10 rounded-full"
              src="C:\Users\haobq\Pictures\icons8-powershell-480.png"
              alt=""
            />
          </div>
          <span className="flex items-center gap-4">
            <Rating readonly value={1} />
          </span>
        </div>
        <p className="border border-gray-300 rounded-lg bg-white p-6 mt-6 h-20 overflow-auto">
          asdlfasd;fasdf
          asdfdsffffffffffffffffffffffffffffffffffffffffffffasdlfasd;fasdf
          asdfdsffffffffffffffffffffffffffffffffffffffffffffasdlfasd;fasdf
          asdfdsffffffffffffffffffffffffffffffffffffffffffffasdlfasd;fasdf
          asdfdsffffffffffffffffffffffffffffffffffffffffffffasdlfasd;fasdf
          asdfdsffffffffffffffffffffffffffffffffffffffffffffasdlfasd;fasdf
          asdfdsffffffffffffffffffffffffffffffffffffffffffffasdlfasd;fasdf
          asdfdsffffffffffffffffffffffffffffffffffffffffffffasdlfasd;fasdf
          asdfdsffffffffffffffffffffffffffffffffffffffffffff
        </p>

        <div className="text-right basis-1/12 mt-4">
          <button
            className="px-6 py-2 text-lg font-medium text-center text-white bg-primary-3-700 rounded-lg focus:ring-4
            focus:ring-primary-3-200 dark:focus:ring-primary-3-900 hover:bg-primary-3-800
            items-center
            "
            onClick={handleClick}
          >
            Trả lời
          </button>
        </div>
      </div>
    </>
  );
};

export default Comment;
