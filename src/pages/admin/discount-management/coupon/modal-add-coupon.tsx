import { useEffect, useState, memo } from "react";
import { Input, Textarea, Button } from "@material-tailwind/react";

import { toast } from "react-toastify";
import Modal from "components/modal/modal";
import { useCreateCouponMutation } from "redux/api/discount/coupon";
import { ICouponInput } from "share/types/coupon";
import SelectBox, { ISelected } from "components/select-box/select-box";
import { useGetDiscountEventsQuery } from "redux/api/discount/discount-event";

function ModalAddCoupon({ onToggle }: { onToggle: () => void }) {
  const [addCoupon, { isSuccess }] = useCreateCouponMutation();
  const { data, isSuccess: getDiscountEventSuccess } =
    useGetDiscountEventsQuery({});

  const [selected, setSelected] = useState<ISelected>();

  const [dataForm, setDataForm] = useState<ICouponInput>({
    name: "",
    discountEventId: "",
    quantity: 0,
    reducedPrice: 0,
    description: "",
  });
  useEffect(() => {
    if (isSuccess) {
      onToggle();
      toast.success("Thêm thành công");
    }
  }, [isSuccess, onToggle]);

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
    setDataForm(() => ({
      ...dataForm,
      discountEventId: option.id,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      dataForm.name.trim().length === 0 ||
      dataForm.quantity !== 0 ||
      dataForm.reducedPrice === 0 ||
      dataForm.discountEventId.trim().length === 0
    ) {
      toast.error("Thông tin không hợp lệ");
    } else {
      addCoupon(dataForm);
    }
  };

  let selectBoxDiscountEvent;
  if (getDiscountEventSuccess) {
    const updateData = data.data.map((item) => ({
      ...item,
      label: item.name,
    }));
    selectBoxDiscountEvent = (
      <SelectBox
        onChange={handleSelect}
        options={updateData}
        selected={selected}
        label="Chọn sự kiện"
      />
    );
  }

  return (
    <Modal onClose={onToggle}>
      <form
        onSubmit={handleSubmit}
        className="flex justify-between gap-4 flex-col"
      >
        <header className="text-xl my-2 font-bold ">Thêm phiếu giảm giá</header>
        <div className="flex flex-col gap-4 w-full">
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
          {selectBoxDiscountEvent}
          <Textarea
            name="description"
            onChange={handleChange}
            value={dataForm.description}
            label="Miêu tả phiếu giảm giá"
          />
        </div>

        <div className="flex justify-end my-4">
          <Button type="submit">Thêm phiếu giảm Giá </Button>
        </div>
      </form>
    </Modal>
  );
}

export default memo(ModalAddCoupon);
