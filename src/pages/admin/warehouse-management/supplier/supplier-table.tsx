import React, { useEffect, useState } from "react";
import { IconButton } from "@material-tailwind/react";
import { MdDelete, MdEdit } from "react-icons/md";

import { useRemoveSupplierMutation } from "redux/api/warehouse/supplier";

import {
  IContentConfirm,
  ConfirmDialog,
} from "components/confirm-dialog/confirm-dialog";
import Table from "components/table/table";
import { ISupplier, ISupplierTable } from "share/types/supplier";
import { toast } from "react-toastify";
import ModalUpdateSupplier from "./modal-update-supplier";
interface ITable {
  data: ISupplierTable[];
}
const SupplierTable: React.FC<ITable> = ({ data }) => {
  const [remove, resultRemove] = useRemoveSupplierMutation();
  const [supplierRemove, setSupplierRemove] = useState<IContentConfirm>();
  const [supplierUpdate, setSupplierUpdate] = useState<ISupplier>();

  useEffect(() => {
    if (resultRemove.isSuccess) {
      toast.success("Xoá thành công");
    }
  }, [resultRemove]);

  const configData = [
    {
      label: "STT",
      render: (data: ISupplierTable) => {
        return data.index;
      },
    },
    {
      label: "Tên nhà cung cấp",
      render: (data: ISupplierTable) => {
        return <div className="min-w-[160px]">{data.name}</div>;
      },
    },

    {
      label: "Email",
      render: (data: ISupplierTable) => {
        return data.email;
      },
    },
    {
      label: "Số điện thoại",
      render: (data: ISupplierTable) => {
        return <div className="min-w-[140px]">{data.phoneNumber}</div>;
      },
    },
    {
      label: "Địa chỉ",
      render: (data: ISupplierTable) => {
        return data.address;
      },
    },
    {
      label: "Tuỳ chọn",
      render: (data: ISupplierTable) => {
        const { index, ...rest } = data;

        return (
          <div className="flex gap-4 justify-end">
            <IconButton
              onClick={() => {
                handleSupplierRemove({
                  id: data.id,
                  title: `Bạn có muốn xoá nhà cung cấp ${data.name}`,
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
                handleToggleUpdate(rest);
              }}
            >
              <MdEdit />
            </IconButton>
          </div>
        );
      },
    },
  ];

  const handleToggleUpdate = (data?: ISupplier) => {
    setSupplierUpdate(data);
  };
  const handleSupplierRemove = (data?: IContentConfirm) => {
    setSupplierRemove(data);
  };
  return (
    <>
      <Table data={data} config={configData} />
      <ConfirmDialog
        data={supplierRemove}
        setData={handleSupplierRemove}
        handleConfirm={() => {
          if (supplierRemove) {
            remove(supplierRemove.id);
            handleSupplierRemove();
          }
        }}
      />
      {supplierUpdate && (
        <ModalUpdateSupplier
          data={supplierUpdate}
          onToggle={handleToggleUpdate}
        />
      )}
    </>
  );
};

export default SupplierTable;
