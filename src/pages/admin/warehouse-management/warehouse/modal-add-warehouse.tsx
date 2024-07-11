import { useEffect, useState, memo } from "react";
import { Input, Textarea } from "@material-tailwind/react";

import { toast } from "react-toastify";
import Modal from "components/modal/modal";
import { useCreateWarehouseMutation } from "redux/api/warehouse/warehouse";
import { IWarehouseInput } from "share/types/warehouse";
import { Button } from "@mui/material";

function ModalAddWarehouse({ onToggle }: { onToggle: () => void }) {
  const [add, result] = useCreateWarehouseMutation();

  const [dataForm, setDataForm] = useState<IWarehouseInput>({
    address: "",
    email: "",
    fax: "",
    hotLine: "",
    name: "",
    description: "",
    warehouseType: "Distribution",
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
      dataForm.name.trim().length === 0 ||
      dataForm.address.trim().length === 0 ||
      dataForm.description.trim().length === 0 ||
      dataForm.email.trim().length === 0 ||
      dataForm.fax.trim().length === 0 ||
      dataForm.hotLine.trim().length === 0
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
        <header className="text-xl my-2 font-bold ">Thêm kho mới</header>
        <div className="flex flex-col gap-4 w-full">
          <Input
            name="name"
            onChange={handleChange}
            value={dataForm.name}
            crossOrigin={"use-credentials"}
            variant="outlined"
            label="Tên kho"
          />
          <Input
            name="address"
            onChange={handleChange}
            value={dataForm.address}
            crossOrigin={"use-credentials"}
            variant="outlined"
            label="Địa chỉ"
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
            name="fax"
            onChange={handleChange}
            value={dataForm.fax}
            crossOrigin={"use-credentials"}
            variant="outlined"
            label="Fax"
          />
          <Input
            name="hotLine"
            onChange={handleChange}
            value={dataForm.hotLine}
            crossOrigin={"use-credentials"}
            variant="outlined"
            label="Hotline"
          />
          <Textarea
            name="description"
            onChange={handleChange}
            value={dataForm.description}
            label="Miêu tả miêu tả"
          />
        </div>

        <div className="flex justify-end my-4">
          <Button color="success" variant="contained" type="submit">Lưu</Button>
        </div>
      </form>
    </Modal>
  );
}

export default memo(ModalAddWarehouse);
