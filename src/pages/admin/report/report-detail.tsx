import React from "react";
import { useParams } from "react-router-dom";
interface ReportDetailProps {}

const ReportDetail: React.FC<ReportDetailProps> = () => {
  const { reportId } = useParams();

  console.log(reportId);

  return <div></div>;
};

export default ReportDetail;
