import { useEffect, useState, memo } from "react";
import { Input, Textarea, Button } from "@material-tailwind/react";

import { toast } from "react-toastify";
import Modal from "components/modal/modal";
import { useCreateSupplierMutation } from "redux/api/warehouse/supplier";
import { ISupplierInput } from "share/types/supplier";

function ModalAddSupplier({ onToggle }: { onToggle: () => void }) {
  const [add, result] = useCreateSupplierMutation();

  const [dataForm, setDataForm] = useState<ISupplierInput>({
    name: "",
    address: "",
    email: "",
    phoneNumber: "",
    description: "",
  });
  useEffect(() => {
    if (result.isSuccess) {
      onToggle();
      toast.success("Thêm thành công");
    }
  }, [result, onToggle]);

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
      dataForm.name.trim().length ||
      dataForm.description.trim().length ||
      dataForm.email.trim().length ||
      dataForm.phoneNumber.trim().length ||
      dataForm.address.trim().length
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
        <header className="text-xl my-2 font-bold ">Thêm nhà cung cấp</header>
        <div className="flex flex-col gap-4 w-full">
          <Input
            name="name"
            onChange={handleChange}
            value={dataForm.name}
            crossOrigin={"use-credentials"}
            variant="outlined"
            label="Tên nhà cung cấp"
          />
          <Input
            name="address"
            onChange={handleChange}
            value={dataForm.address}
            crossOrigin={"use-credentials"}
            variant="outlined"
            label="Tên địa chỉ"
          />
          <Input
            name="email"
            onChange={handleChange}
            value={dataForm.email}
            crossOrigin={"use-credentials"}
            variant="outlined"
            label="Email"
          />
          <Input
            name="phoneNumber"
            onChange={handleChange}
            value={dataForm.phoneNumber}
            crossOrigin={"use-credentials"}
            variant="outlined"
            label="Số điện thoại"
          />

          <Textarea
            name="description"
            onChange={handleChange}
            value={dataForm.description}
            label="Miêu tả"
          />
        </div>

        <div className="flex justify-end my-4">
          <Button type="submit">Thêm nhà cung cấp</Button>
        </div>
      </form>
    </Modal>
  );
}

export default memo(ModalAddSupplier);
