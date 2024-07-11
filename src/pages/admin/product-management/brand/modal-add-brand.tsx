import { useEffect, useState, memo } from "react";
import { Input, Textarea, Button } from "@material-tailwind/react";

import { toast } from "react-toastify";
import Modal from "components/modal/modal";
import UploadImage from "components/upload-image/upload-image";
import { useAddBrandMutation } from "redux/api/catalog/brand";
import { IBrandInput } from "share/types/brand";
import { Button as MUIButton } from "@mui/material";

function ModalAddBrand({ onToggle }: { onToggle: () => void }) {
  const [add, result] = useAddBrandMutation();

  const [dataForm, setDataForm] = useState<IBrandInput>({
    name: "",
    image: new DataTransfer().files[0],
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
      dataForm.name.trim().length === 0 
    ) {
      toast.error("Thông tin không hợp lệ");
    } else {
      add(dataForm);
    }
  };

  const handleAddImage = (file: File) => {
    setDataForm(() => ({
      ...dataForm,
      image: file,
    }));
  };

  return (
    <Modal onClose={onToggle}>
      <div className="flex gap-4">
        <section className="w-96">
          <header className="text-xl my-2 font-bold ">
            Hình Ảnh Thương Hiệu
          </header>
          <UploadImage onChange={handleAddImage} />
        </section>
        <section className="w-96">
          <form
            onSubmit={handleSubmit}
            className="flex justify-between gap-4 flex-col"
          >
            <header className="text-xl my-2 font-bold ">
              Thêm thương hiệu
            </header>
            <div className="flex flex-col gap-4 w-full">
              <Input
                name="name"
                onChange={handleChange}
                value={dataForm.name}
                crossOrigin={"use-credentials"}
                variant="outlined"
                label="Tên thương hiệu"
              />
              <Textarea
                name="description"
                onChange={handleChange}
                value={dataForm.description}
                label="Miêu tả thương hiệu"
              />
            </div>

            <div className="flex justify-end my-4">
              <MUIButton variant="contained" color="success" type="submit">Lưu</MUIButton>
            </div>
          </form>
        </section>
      </div>
    </Modal>
  );
}

export default memo(ModalAddBrand);
