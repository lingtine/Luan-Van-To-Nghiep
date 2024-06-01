import React from "react";
import { useParams } from "react-router-dom";
interface ReportDetailProps {}

const ReportDetail: React.FC<ReportDetailProps> = () => {
  const { reportId } = useParams();

  return <div></div>;
};

export default ReportDetail;
