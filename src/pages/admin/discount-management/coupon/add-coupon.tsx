import React from "react";
import { Button, Input, Textarea } from "@material-tailwind/react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useCreateCouponMutation } from "redux/api/discount/coupon";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useGetDiscountEventsQuery } from "redux/api/discount/discount-event";
import { ISelected } from "components/select-box/select-box";
import SelectBox from "components/select-box/select-box";
import { ICouponInput } from "share/types/coupon";
interface AddCouponProps {}

const AddCoupon: React.FC<AddCouponProps> = () => {
  const navigate = useNavigate();
  const [addCoupon, { isSuccess }] = useCreateCouponMutation();
  const { data, isSuccess: getDiscountEventSuccess } =
    useGetDiscountEventsQuery({});
  const [selected, setSelected] = useState<ISelected>();

  const [dataForm, setDataForm] = useState<ICouponInput>({
    name: "",
    description: "",
    discountEventId: "",
    reducedPrice: 0,
    quantity: 0,
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

  const handleSelect = (option: ISelected) => {
    setSelected(option);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      dataForm.name.trim().length === 0 ||
      !selected ||
      dataForm.reducedPrice === 0 ||
      dataForm.quantity === 0
    ) {
      toast.error("Thông tin không hợp lệ");
    } else {
      addCoupon({ ...dataForm, discountEventId: selected.id });
    }
  };

  let content;
  if (getDiscountEventSuccess) {
    const updateData = data.data.map((item) => ({ ...item, label: item.name }));
    content = (
      <SelectBox
        onChange={handleSelect}
        options={updateData}
        selected={selected}
        label="Chọn sự kiện"
      />
    );
  }

  useEffect(() => {
    if (isSuccess) {
      navigate("/admin/coupons");
      toast.success("Thêm thành công");
    }
  }, [isSuccess, navigate]);

  return (
    <div className="px-8">
      <div className="flex gap-4 border-y py-3  items-center">
        <Link to={"/admin/Coupons"}>
          <Button variant="text" className="text-lg">
            <AiOutlineArrowLeft />
          </Button>
        </Link>
        <div>
          <p className="text-sm">Trở về</p>
          <h4 className="text-xl font-bold">Thêm Phiếu Giảm Giá</h4>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex justify-between gap-4">
        <section className=" flex-[0_0_50%]">
          <header className="text-2xl my-4 font-bold ">
            Thông tin phiếu giảm giá
          </header>
          <div className="flex flex-col gap-4">
            <Input
              name="name"
              onChange={handleChange}
              value={dataForm.name}
              crossOrigin={"use-credentials"}
              variant="outlined"
              label="Tên phiếu giảm giá"
            />
            <Input
              name="quantity"
              onChange={handleChange}
              value={dataForm.quantity}
              crossOrigin={"use-credentials"}
              variant="outlined"
              type="number"
              label="Số lượng"
            />
            <Input
              name="reducedPrice"
              onChange={handleChange}
              value={dataForm.reducedPrice}
              crossOrigin={"use-credentials"}
              variant="outlined"
              type="number"
              label="Số tiền được giảm"
            />
            {content}
            <Textarea
              name="description"
              onChange={handleChange}
              value={dataForm.description}
              label="Miêu tả phiếu giảm giá"
            />
          </div>
          <div className="flex justify-end my-4">
            <Button type="submit">Thêm phiếu giảm giá</Button>
          </div>
        </section>
      </form>
    </div>
  );
};

export default AddCoupon;
