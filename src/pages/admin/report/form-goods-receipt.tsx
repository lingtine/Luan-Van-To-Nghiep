import React from "react";
import { Textarea, Button } from "@material-tailwind/react";
import { useCreateReportMutation } from "redux/api/warehouse/report";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import SelectBoxDataWarehouse from "./select-box-warehouse";
import SelectBoxDataSupplier from "./select-box-supplier";
import GetProducts from "./get-products";
import { IProductDetail } from "share/types/product";
import { IReportInput } from "share/types/report";
interface FormGoodsReceiptProps {}
export interface IListProduct extends IProductDetail {
  quality: number;
}
const FormGoodsReceipt: React.FC<FormGoodsReceiptProps> = () => {
  const [addReport, { isSuccess }] = useCreateReportMutation();
  const [listProduct, setListProduct] = useState<IListProduct[]>([]);

  const navigate = useNavigate();
  const [dataForm, setDataForm] = useState<IReportInput>({
    reportProducts: [],
    reportType: "GoodsReceiptReport",
    supplierId: "",
    to: "",
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

    if (dataForm.description.trim().length === 0) {
      toast.error("Thông tin không hợp lệ");
    } else {
      dataForm.reportProducts = listProduct.map((product) => ({
        quantity: +product.quality,
        productId: product.id,
      }));
      addReport(dataForm);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/admin/report");
    }
  }, [isSuccess, navigate]);

  return (
    <form onSubmit={handleSubmit} className="flex justify-between gap-4">
      <GetProducts
        listProduct={listProduct}
        handleChangeListProduct={setListProduct}
      />
      <section className=" flex-[0_0_50%]">
        <header className="text-2xl my-4 font-bold ">
          Thông tin nơi nhận hàng
        </header>
        <div className="flex flex-col gap-4">
          <SelectBoxDataWarehouse
            getSelected={(value: string, name: string) => {
              setDataForm(() => ({
                ...dataForm,
                to: value,
              }));
            }}
            label="Kho nhận hàng"
          />
          <SelectBoxDataSupplier
            getSelected={(value: string, name: string) => {
              setDataForm(() => ({
                ...dataForm,
                supplierId: value,
              }));
            }}
          />
          <Textarea
            name="description"
            onChange={handleChange}
            value={dataForm.description}
            label="Miêu tả đặt tả"
          />
        </div>
        <div className="flex justify-end my-4">
          <Button type="submit">Lưu</Button>
        </div>
      </section>
    </form>
  );
};

export default FormGoodsReceipt;
