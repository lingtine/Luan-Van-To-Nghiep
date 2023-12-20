import React, { useEffect } from "react";
import { IDeliveryInfo } from "redux/api/types";
import Table from "components/table/table";
import { useRemoveDeliveryInfoMutation } from "redux/api/auth/customer-api";
import { toast } from "react-toastify";
import { Button } from "@material-tailwind/react";
interface TableDeliveryInfoProps {
  data: IDeliveryInfo[];
}

const TableDeliveryInfo: React.FC<TableDeliveryInfoProps> = ({ data }) => {
  const [removeDeliveryInfo, { isSuccess }] = useRemoveDeliveryInfoMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Xoá thành công");
    }
  }, [isSuccess]);

  const configData = [
    {
      label: "STT",
      render: (data: any) => {
        return data.index;
      },
    },
    {
      label: "Họ và tên",
      render: (data: IDeliveryInfo) => {
        return data.name;
      },
    },
    {
      label: "Email",
      render: (data: IDeliveryInfo) => {
        return data.name;
      },
    },
    {
      label: "Địa chỉ",
      render: (data: IDeliveryInfo) => {
        return (
          data.address.number +
          " " +
          data.address.street +
          " " +
          data.address.ward +
          " " +
          data.address.district +
          " " +
          data.address.city
        );
      },
    },

    {
      label: "Tuỳ chọn",
      render: (data: IDeliveryInfo) => {
        return (
          <div className="flex gap-4 justify-end">
            <Button
              color="red"
              onClick={() => {
                removeDeliveryInfo(data.id);
              }}
            >
              Xoá
            </Button>
          </div>
        );
      },
    },
  ];
  const updateData = data.map((item, index) => ({
    ...item,
    index: index + 1,
  }));

  return <Table config={configData} data={updateData}></Table>;
};

export default TableDeliveryInfo;
