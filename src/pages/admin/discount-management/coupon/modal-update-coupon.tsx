import { useEffect, useState, memo } from "react";
import { Input, Textarea, Button } from "@material-tailwind/react";
import { toast } from "react-toastify";

import { useUpdateCouponMutation } from "redux/api/discount/coupon";
import { useGetDiscountEventsQuery } from "redux/api/discount/discount-event";
import Modal from "components/modal/modal";
import { ICoupon, ICouponInput } from "share/types/coupon";
import SelectBox, { ISelected } from "components/select-box/select-box";
function ModalUpdateCoupon({
  onToggle,
  data,
}: {
  onToggle: () => void;
  data: ICoupon;
}) {
  const [update, result] = useUpdateCouponMutation();
  const { data: discountData, isSuccess: getDiscountEventSuccess } =
    useGetDiscountEventsQuery({});
  const [selected, setSelected] = useState<ISelected>();
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [dataForm, setDataForm] = useState<ICouponInput>({
    ...data,
  });

  useEffect(() => {
    if (result.isSuccess) {
      onToggle();
      toast.success("Chỉnh sửa thành công");
    }
    if (
      dataForm.description !== data.description ||
      dataForm.name !== data.name ||
      dataForm.discountEventId !== data.discountEventId ||
      dataForm.quantity !== data.quantity ||
      dataForm.reducedPrice !== data.reducedPrice
    ) {
      setIsUpdate(true);
    } else {
      setIsUpdate(false);
    }
  }, [result.isSuccess, dataForm, onToggle, data]);
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

  let selectBoxDiscountEvent;
  if (getDiscountEventSuccess) {
    const updateData = discountData.data.map((item) => ({
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
      update(dataForm);
    }
  };
  return (
    <Modal onClose={onToggle}>
      <form
        onSubmit={handleSubmit}
        className="flex justify-between gap-4 flex-col"
      >
        <header className="text-xl my-2 font-bold ">
          Chỉnh sửa mã giảm giá
        </header>
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
        <div className="flex justify-end my-4 gap-4">
          <Button
            color="red"
            onClick={() => {
              onToggle();
            }}
          >
            Huỷ
          </Button>
          <Button type="submit" disabled={!isUpdate}>
            Chỉnh sửa
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default memo(ModalUpdateCoupon);
