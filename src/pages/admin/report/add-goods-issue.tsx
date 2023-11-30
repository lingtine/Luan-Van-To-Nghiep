import React from "react";
import { Button } from "@material-tailwind/react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";
import FormGoodsIssue from "./form-goods-issue";
interface AddGoodsIssuedProps {}

const AddGoodsIssued: React.FC<AddGoodsIssuedProps> = () => {
  return (
    <div className="px-8">
      <div className="flex gap-4 border-y py-3  items-center">
        <Link to={"/admin/report"}>
          <Button variant="text" className="text-lg">
            <AiOutlineArrowLeft />
          </Button>
        </Link>
        <div>
          <p className="text-sm">Trở về</p>
          <h4 className="text-xl font-bold">Thêm phiếu xuất hàng</h4>
        </div>
      </div>

      <FormGoodsIssue />
    </div>
  );
};

export default AddGoodsIssued;
