import { useParams } from "react-router-dom";
import { useGetReportQuery } from "redux/api/warehouse/report";
import AddGoodsIssued from "./add-goods-issue";
import AddGoodsReceipted from "./add-goods-receipt";

const InventoryReportDetail = () => {
  const { id } = useParams();
  const { data } = useGetReportQuery(id ?? "");
  if (data?.reportType === "GoodsIssueReport") {
    return <AddGoodsIssued report={data} />;
  } else {
    return <AddGoodsReceipted report={data} />;
  }
};

export default InventoryReportDetail;
