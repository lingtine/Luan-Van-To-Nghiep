import { Button, Rating, Textarea } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAddReviewProductMutation } from "redux/api/catalog/review";
import { useAppSelector } from "redux/store";

interface ICommentFormProps {
  isChild: boolean;
  productId: string;
}

const CommentForm = ({ isChild, productId }: ICommentFormProps) => {
  const [star, setStar] = useState(5);
  const [comment, setComment] = useState("");
  const [createReview, result] = useAddReviewProductMutation();

  const { accessToken } = useAppSelector((state) => state.authSlice);
  const { user } = useAppSelector((state) => state.userSlice);

  const [dataForm, setDataForm] = useState<{
    productId: string;
    numberOfStar: number;
    comment: string;
    attachments?: FileList;
  }>({
    productId: productId,
    numberOfStar: star,
    comment: comment,
    attachments: new DataTransfer().files || null,
  });

  const avatarSize = isChild ? 7 : 10;
  const textareaRows = 1;

  const avatarClassNames = `w-${avatarSize} h-${avatarSize} rounded-full`;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!accessToken) {
      toast.warning("Bạn cần đăng nhập để bình luận");
    } else {
      setComment("");
      setStar(5);
      createReview(dataForm);
    }
  };

  useEffect(() => {
    if (result.isSuccess) {
      toast.success("Thao tác thành công");
    }
  }, [result.isSuccess]);

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setComment(event.target.value);
    setDataForm(() => ({ ...dataForm, comment: event.target.value }));
  };

  const handleChangeStar = (currentStar: number) => {
    setStar(currentStar);
    setDataForm(() => ({ ...dataForm, numberOfStar: currentStar }));
  };

  return (
    <form className="flex gap-4" onSubmit={(e) => handleSubmit(e)}>
      <div className="my-4 flex flex-col items-center w-full justify-between ">
        <div className="flex flex-row items-center justify-between w-full mb-4">
          <img
            className={avatarClassNames}
            src={
              user?.imageUrl
                ? user.imageUrl
                : "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIHBhUQBxASEhUVGBAXFRUSFhUPFRAWFhIXGBYVGRYYHSgiGBolGxgVITEiJSkrLy4uHR8zODMsNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAABAUGAwIB/8QANxABAAECAgcGBQIFBQAAAAAAAAECAwQRBRIhMUFRYRNxobHR4QYiMoHBcpEUNGKiwjM1QkOy/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AN6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACdhdF3MRGcxqxzq9AQRoLOhKKf9Waqv7Y8PVKp0dap3W4++3zBlRqqtH2p326ftGXkj3dDW6/ozp7pz8wZ0WWJ0PXa22sq46bJ/ZXTGU5SD4AAAAAAAAAAAAAAAAAAAA92rU3rkU24zmXmmmaqsqYzmd3Vp9G4KMJZ27ap3z+I6A54DRdOGjO5lVVz4R3eqwAAAAABFxuAoxdPzxlPCqN/ulAMli8LVhLurd+08JcGuxeGpxVnVufaeU82WxFmcPemm5vjx6g5AAAAAAAAAAAAAAAAAAt9A4XWrm5Xw2U9/GV64YKz2GFpp5RGffx8XcAAAAAAAABWacwva2NenfTv6x7eqzfKo1qcp4gxg6X7XY36qZ4TMOYAAAAAAAAAAAAAADtg6O0xdEf1U+bilaM/3CjPn+JBqgAAAAAAAAAAAZvTlGrpCesUz+Pwr1n8Qfzsfpj/1UrAAAAAAAAAAAAAAAHbCV9niqZnhVT5uIDaCPo+//EYSmrjllPfGyUgAAAAAAAAAHm5VFFEzVujOZBnNN16+kJ6RTHhn+UB7vXO1uzVVxmZ/d4AAAAAAAAAAAAAAAABa6CxfZ3ezr3Vbv1e6/YyJynY0eisfGKt6tz6o3/1dQWAAAAAAAACp07itS12dG+rf0j3Tcdi4wlnOrfwjnPoy925N65NVyc5kHgAAAAAAAAAAAAAAAAAB6ormiqJonKY3THB5TMHo2vFbYjVp5z+I4gs8BpeLsauJypnnuifRaROcbELDaKt2NsxrTzq2+G5OiMo2AAAAAIGO0nRhoyo+arlHDvlPQ8To23iPqpynnTsn3Bm8RfqxF3WuznPl0hzWGM0VXh9tHzx03x9leAAAAAAAAAAAAAAAAA9UUzXVEURnM7ojiUUTcriKIzmd0c2k0bo+MJRnVtqnfPLpAOGj9Exa+bE5TPLfEesrUAAAAAAAAAFdj9F04mNa1lTV4Vd/qsQGOvWqrNzVuxlMPDVY7BU4y3lVsnhPL2Zm/Zmxdmm7GUx49QcwAAAAAAAAAAAAWmhMH213Xubqd3Wr2BO0RgP4e3r3Y+af7Y5d6yAAAAAAAAAAAAABD0lgoxdnZ9UfTP47kwBjKqZpqyq2TG/o+LrTuD/7bfSKvxP4UoAAAAAAAAAAPduibtyKaN8zlDWYaxGHsRTRw8ecqXQGH17811f8dkd8+3mvwAAAAAAAAAAAAAAAAeblEXKJivbE7JZPF2Jw2Imirhu6xwlrlP8AEGHzoi5Tw2T3cPHzBRgAAAAAAAA6Ye32t+mnnMR4g0uirPY4GmOM7Z+/tklvkRlD6AAAAAAAAAAAAAAAAA5Yqz2+HqpnjE/vw8XUBjMst74laTtdljqo65/vtRQAAAAAAE7QtGvpCOkTPhl+UFa/D1OeJqnlT5zHoC/AAAAAAAAAAAAAAAAAAABQfEFGWKpnnHlPvCqXnxFT8lE9ao/eI9FGAAAAAAAuPh366+6nzl8AXoAAAAAAAAAAAAAAAAAAAKn4h/lqf1f4yoQAAAAB/9k="
            }
            alt=""
          />
          <span className="flex items-center gap-4">
            <Rating
              value={star}
              onChange={(currentValue) => handleChangeStar(currentValue)}
            />
          </span>
        </div>
        <div className="flex flex-row items-start justify-between w-full gap-4">
          {
            // isChild ? (
            //   <Input
            //     crossOrigin={"use-credentials"}
            //     variant="outlined"
            //     label="Bình luận"
            //   />
            // ) :
            <Textarea
              rows={textareaRows}
              resize={true}
              value={comment}
              onChange={(event) => handleCommentChange(event)}
              label="Bình luận"
              required
            />
          }

          <div className="text-right">
            <Button
              type="submit"
              size="sm"
              className="px-6 py-2 font-medium text-center text-white bg-primary-3-700 rounded-lg focus:ring-4
              focus:ring-primary-3-200 dark:focus:ring-primary-3-900 hover:bg-primary-3-800
                items-center"
            >
              Gửi
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
