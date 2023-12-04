import { Button } from "@material-tailwind/react";
import React from "react";
import { useGetOrderReportMutation } from "redux/api/order/order";

interface DashboardAdminProps {}

const DashboardAdmin: React.FC<DashboardAdminProps> = () => {
  const [get, { isSuccess }] = useGetOrderReportMutation();

  return (
    <div>
      <Button
        onClick={() => {
          get({
            start: "2023-11-30T07:46:31.706Z",
            end: "2023-11-30T07:46:31.706Z",
            reporterId: "733e1283-14f3-48b2-81ce-08dbdddbce06",
          });
        }}
      >
        Nhấn
      </Button>
    </div>
  );
};

export default DashboardAdmin;
