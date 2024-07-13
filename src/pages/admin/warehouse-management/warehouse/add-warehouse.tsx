import React from "react";
import { Button, Input, Textarea } from "@material-tailwind/react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useCreateWarehouseMutation } from "redux/api/warehouse/warehouse";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { IWarehouseInput } from "share/types/warehouse";
const AddWarehouse = () => {
  const navigate = useNavigate();
  const [addWarehouse, { isSuccess }] = useCreateWarehouseMutation();
  const [dataForm, setDataForm] = useState<IWarehouseInput>({
    address: "",
    email: "",
    fax: "",
    hotLine: "",
    name: "",
    description: "",
    warehouseType: "Distribution",
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
      dataForm.fax.trim().length === 0 ||
      dataForm.hotLine.trim().length === 0
    ) {
      toast.error("Thông tin không hợp lệ");
    } else {
      addWarehouse(dataForm);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/admin/warehouses");
      toast.success("Thêm thành công");
    }
  }, [isSuccess, navigate]);

  return (
    <div className="px-8">
      <div className="flex gap-4 border-y py-3  items-center">
        <Link to={"/admin/warehouses"}>
          <Button variant="text" className="text-lg">
            <AiOutlineArrowLeft />
          </Button>
        </Link>
        <div>
          <p className="text-sm">Trở về</p>
          <h4 className="text-xl font-bold">Thêm Kho</h4>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex justify-between gap-4">
        <section className=" flex-[0_0_50%]">
          <header className="text-2xl my-4 font-bold ">Thông tin kho</header>
          <div className="flex flex-col gap-4">
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
            <Button type="submit">Lưu</Button>
          </div>
        </section>
      </form>
    </div>
  );
};

export default AddWarehouse;
