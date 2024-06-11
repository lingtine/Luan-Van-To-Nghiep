import { useEffect, useState, memo } from "react";
import { Input, Textarea, Button } from "@material-tailwind/react";

import { toast } from "react-toastify";
import Modal from "components/modal/modal";
import { IDiscountEventInput } from "share/types/discount-event";
import { useCreateDiscountEventMutation } from "redux/api/discount/discount-event";

function ModalAddDiscountEvent({ onToggle }: { onToggle: () => void }) {
  const [add, { isSuccess }] = useCreateDiscountEventMutation();

  const [dataForm, setDataForm] = useState<IDiscountEventInput>({
    name: "",
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      dataForm.name.trim().length === 0 ||
      dataForm.description.trim().length === 0
    ) {
      toast.error("Thông tin không hợp lệ");
    } else {
      add(dataForm);
    }
  };

  return (
    <Modal onClose={onToggle}>
      <form
        onSubmit={handleSubmit}
        className="flex justify-between gap-4 flex-col"
      >
        <header className="text-xl my-2 font-bold ">
          Thêm sự kiện giảm giá
        </header>
        <div className="flex flex-col gap-4 w-full">
          <Input
            name="name"
            onChange={handleChange}
            value={dataForm.name}
            crossOrigin={"use-credentials"}
            variant="outlined"
            label="Tên sự Kiện"
          />

          <Textarea
            name="description"
            onChange={handleChange}
            value={dataForm.description}
            label="Miêu tả sự kiện"
          />
        </div>

        <div className="flex justify-end my-4">
          <Button type="submit">Thêm sự kiện giảm Giá </Button>
        </div>
      </form>
    </Modal>
  );
}

export default memo(ModalAddDiscountEvent);
