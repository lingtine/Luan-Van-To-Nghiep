import { useEffect, useState, memo } from "react";
import { Input, Textarea } from "@material-tailwind/react";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import Modal from "components/modal/modal";
import { ISpecificationInput } from "share/types/specification";
import { useAddSpecificationMutation } from "redux/api/catalog/specification";

function ModalAddSpecification({ onToggle }: { onToggle: () => void }) {
  const [add, result] = useAddSpecificationMutation();

  const [dataForm, setDataForm] = useState<ISpecificationInput>({
    name: "",
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

    if (dataForm.name.trim().length === 0) {
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
        <header className="text-xl my-2 font-bold ">Thêm đặt tả</header>
        <div className="flex flex-col gap-4 w-full">
          <Input
            name="name"
            onChange={handleChange}
            value={dataForm.name}
            crossOrigin={"use-credentials"}
            variant="outlined"
            label="Tên dặt tả"
          />
          <Textarea
            name="description"
            onChange={handleChange}
            value={dataForm.description}
            label="Miêu tả đặt tả"
          />
        </div>

        <div className="flex justify-end my-4">
          <Button variant="contained" color="success" type="submit">
          Lưu
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default memo(ModalAddSpecification);
