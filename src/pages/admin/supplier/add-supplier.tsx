import React from "react";
import { Button, Input, Textarea } from "@material-tailwind/react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useCreateSupplierMutation } from "redux/api/warehouse/supplier";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

interface IDataForm {
  id: string;
  name: string;
  description: string;
  address: string;
  phoneNumber: string;
  email: string;
}

interface AddSupplierProps {}

const AddSupplier: React.FC<AddSupplierProps> = () => {
  const navigate = useNavigate();
  const [addSupplier, { isSuccess }] = useCreateSupplierMutation();
  const [dataForm, setDataForm] = useState<IDataForm>({
    id: "",
    address: "",
    email: "",
    phoneNumber: "",
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
      dataForm.address.trim().length === 0 ||
      dataForm.description.trim().length === 0 ||
      dataForm.email.trim().length === 0 ||
      dataForm.phoneNumber.trim().length === 0
    ) {
      toast.error("Thông tin không hợp lệ");
    } else {
      addSupplier(dataForm);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/admin/suppliers");
      toast.success("Thêm thành công");
    }
  }, [isSuccess, navigate]);

  return (
    <div className="px-8">
      <div className="flex gap-4 border-y py-3  items-center">
        <Link to={"/admin/suppliers"}>
          <Button variant="text" className="text-lg">
            <AiOutlineArrowLeft />
          </Button>
        </Link>
        <div>
          <p className="text-sm">Trở về</p>
          <h4 className="text-xl font-bold">Thêm nhà cung cấp</h4>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex justify-between gap-4">
        <section className=" flex-[0_0_50%]">
          <header className="text-2xl my-4 font-bold ">
            Thông tin nhà cung cấp
          </header>
          <div className="flex flex-col gap-4">
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
              label="Miêu tả nhà cùng cấp"
            />
          </div>
          <div className="flex justify-end my-4">
            <Button type="submit">Thêm nhà cung cấp</Button>
          </div>
        </section>
      </form>
    </div>
  );
};

export default AddSupplier;
