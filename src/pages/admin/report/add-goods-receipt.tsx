import React from "react";
import { Button } from "@material-tailwind/react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";
import FormGoodsReceipt from "./form-goods-receipt";
interface AddGoodsReceiptedProps {}

const AddGoodsReceipted: React.FC<AddGoodsReceiptedProps> = () => {
  return (
    <div className="px-8">
      <div className="flex gap-4 border-y py-3  items-center">
        <Link to={"/admin/reports"}>
          <Button variant="text" className="text-lg">
            <AiOutlineArrowLeft />
          </Button>
        </Link>
        <div>
          <p className="text-sm">Trở về</p>
          <h4 className="text-xl font-bold">Thêm phiếu nhận hàng</h4>
        </div>
      </div>

      <FormGoodsReceipt />
    </div>
  );
};

export default AddGoodsReceipted;
