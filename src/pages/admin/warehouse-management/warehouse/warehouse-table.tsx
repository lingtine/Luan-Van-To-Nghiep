import React, { useEffect, useState } from "react";
import { IconButton } from "@material-tailwind/react";
import { MdDelete, MdEdit } from "react-icons/md";

import {
  IContentConfirm,
  ConfirmDialog,
} from "components/confirm-dialog/confirm-dialog";
import Table from "components/table/table";
import { toast } from "react-toastify";
import { IWarehouse, IWarehouseTable } from "share/types/warehouse";
import { useRemoveWarehouseMutation } from "redux/api/warehouse/warehouse";
import ModalUpdateWarehoure from "./modal-update-warehouse";

interface ITable {
  data: IWarehouseTable[];
}
const WarehouseTable: React.FC<ITable> = ({ data }) => {
  const [remove, resultRemove] = useRemoveWarehouseMutation();
  const [warehouseRemove, setWarehouseRemove] = useState<IContentConfirm>();
  const [warehouseUpdate, setWarehouseUpdate] = useState<IWarehouse>();

  useEffect(() => {
    if (resultRemove.isSuccess) {
      toast.success("Xoá thành công");
    }
  }, [resultRemove]);
  const configData = [
    {
      label: "STT",
      render: (data: IWarehouseTable) => {
        return data.index;
      },
    },
    {
      label: "Tên Kho",
      render: (data: IWarehouseTable) => {
        return <div className="min-w-[100px]">{data.name}</div>;
      },
    },
    {
      label: "Địa chỉ",
      render: (data: IWarehouseTable) => {
        return data.address;
      },
    },
    {
      label: "Email",
      render: (data: IWarehouseTable) => {
        return data.email;
      },
    },
    {
      label: "Hotline",
      render: (data: IWarehouseTable) => {
        return data.hotLine;
      },
    },

    {
      label: "Fax",
      render: (data: IWarehouseTable) => {
        return data.fax;
      },
    },

    {
      label: "Loại kho",
      render: (data: IWarehouseTable) => {
        return data.type;
      },
    },

    {
      label: "Tuỳ chọn",
      render: (data: IWarehouseTable) => {
        return (
          <div className="flex gap-4 justify-end">
            <IconButton
              onClick={() => {
                handleWarehouseRemove({
                  id: data.id,
                  title: `Bạn có muốn xoá nhóm thương hiệu ${data.name}`,
                  content:
                    "Thao tác này sẽ xóa bản ghi. Một khi đã xóa thì không thể khôi phục lại.",
                });
              }}
              color="red"
            >
              <MdDelete />
            </IconButton>
            <IconButton
              onClick={() => {
                handleToggleUpdate(data);
              }}
            >
              <MdEdit />
            </IconButton>
          </div>
        );
      },
    },
  ];

  const handleToggleUpdate = (data?: IWarehouse) => {
    setWarehouseUpdate(data);
  };
  const handleWarehouseRemove = (data?: IContentConfirm) => {
    setWarehouseRemove(data);
  };
  return (
    <>
      <Table data={data} config={configData} />
      <ConfirmDialog
        data={warehouseRemove}
        setData={handleWarehouseRemove}
        handleConfirm={() => {
          if (warehouseRemove) {
            remove(warehouseRemove.id);
            handleWarehouseRemove();
          }
        }}
      />
      {warehouseUpdate && (
        <ModalUpdateWarehoure
          data={warehouseUpdate}
          onToggle={handleToggleUpdate}
        />
      )}
    </>
  );
};

export default WarehouseTable;
