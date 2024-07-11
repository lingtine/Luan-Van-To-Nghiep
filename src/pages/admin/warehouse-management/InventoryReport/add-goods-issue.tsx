import React from "react";
import { Button } from "@material-tailwind/react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";
import FormGoodsIssue from "./Components/form-goods-issue";
import { IReport } from "share/types/report";
interface AddGoodsIssuedProps {
  report?: IReport;
}

const AddGoodsIssued: React.FC<AddGoodsIssuedProps> = ({
  report,
}: AddGoodsIssuedProps) => {
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

      <FormGoodsIssue report={report}/>
    </div>
  );
};

export default AddGoodsIssued;
