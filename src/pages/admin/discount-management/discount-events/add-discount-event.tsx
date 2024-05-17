import React from "react";
import { Button, Input, Textarea } from "@material-tailwind/react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useCreateDiscountEventMutation } from "redux/api/discount/discount-event";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

interface IDataForm {
  id: string;
  name: string;
  description: string;
}

interface AddDiscountEventProps {}

const AddDiscountEvent: React.FC<AddDiscountEventProps> = () => {
  const navigate = useNavigate();
  const [addDiscountEvent, { isSuccess }] = useCreateDiscountEventMutation();
  const [dataForm, setDataForm] = useState<IDataForm>({
    id: "",
    name: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setDataForm(() => ({
      ...dataForm,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      dataForm.name.trim().length === 0 ||
      dataForm.description.trim().length === 0
    ) {
      toast.error("Thông tin không hợp lệ");
    } else {
      addDiscountEvent(dataForm);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/admin/discountEvents");
      toast.success("Thêm thành công");
    }
  }, [isSuccess, navigate]);

  return (
    <div className="px-8">
      <div className="flex gap-4 border-y py-3  items-center">
        <Link to={"/admin/discountEvents"}>
          <Button variant="text" className="text-lg">
            <AiOutlineArrowLeft />
          </Button>
        </Link>
        <div>
          <p className="text-sm">Trở về</p>
          <h4 className="text-xl font-bold">Thêm Sự Kiện</h4>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex justify-between gap-4">
        <section className=" flex-[0_0_50%]">
          <header className="text-2xl my-4 font-bold ">
            Thông tin sự kiện
          </header>
          <div className="flex flex-col gap-4">
            <Input
              name="name"
              onChange={handleChange}
              value={dataForm.name}
              crossOrigin={"use-credentials"}
              variant="outlined"
              label="Tên Sự Kiện"
            />

            <Textarea
              name="description"
              onChange={handleChange}
              value={dataForm.description}
              label="Miêu tả sự kiện"
            />
          </div>
          <div className="flex justify-end my-4">
            <Button type="submit">Thêm Sự Kiện</Button>
          </div>
        </section>
      </form>
    </div>
  );
};

export default AddDiscountEvent;
