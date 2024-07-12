import React from "react";
import { Textarea} from "@material-tailwind/react";
import { useCreateReportMutation } from "redux/api/warehouse/report";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import SelectBoxDataWarehouse from "../../../report/select-box-warehouse";
import SelectBoxDataSupplier from "../../../report/select-box-supplier";
import GetProducts from "./get-products";
import { IProductDetail } from "share/types/product";
import { IReport, IReportInput } from "share/types/report";
import { useGetProductByIdsMutation } from "redux/api/catalog/product";
import { Button } from "@mui/material";
interface FormGoodsReceiptProps {
  report?: IReport;
}
export interface IListProduct extends IProductDetail {
  quality: number;
}
const FormGoodsReceipt: React.FC<FormGoodsReceiptProps> = ({
  report,
}: FormGoodsReceiptProps) => {
  const [addReport, { isSuccess }] = useCreateReportMutation();
  const [getProductByIds, { data: products, isSuccess: isGetProductsSuccess }] =
    useGetProductByIdsMutation();
  const [listProduct, setListProduct] = useState<IListProduct[]>([]);

  useEffect(() => {
    if (report) {
      getProductByIds(report.reportProducts.map((x) => x.productId));
    }
  }, []);

  useEffect(() => {
    if (products && isGetProductsSuccess) {
      const existingProducts = report?.reportProducts
        .map((x): IListProduct => {
          const product = products.find((y) => y.id === x.productId);
          return {
            ...product!,
            quality: x.quantity,
          };
        })
        .filter((x) => x !== undefined);

      setListProduct(existingProducts ?? []);
    }
  }, [products]);

  const navigate = useNavigate();
  const [dataForm, setDataForm] = useState<IReportInput>(
    report ?? {
      reportProducts: [],
      reportType: "GoodsReceiptReport",
      supplierId: "",
      to: "",
      description: "",
    }
  );

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
          Thông tin phiếu
        </header>
        <div className="flex flex-col gap-4">
          <SelectBoxDataWarehouse
            id={report?.to}
            getSelected={(value: string, name: string) => {
              setDataForm(() => ({
                ...dataForm,
                to: value,
              }));
            }}
            label="Kho nhận hàng"
          />
          <SelectBoxDataSupplier
            id={report?.supplierId}
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
          <Button
          color="success"
          variant="contained"
          disabled={report !== undefined} type="submit">
            Lưu
          </Button>
        </div>
      </section>
    </form>
  );
};

export default FormGoodsReceipt;
