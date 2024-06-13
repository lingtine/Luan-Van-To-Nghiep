import React, { useEffect, useState } from "react";
import { IconButton } from "@material-tailwind/react";
import { MdDelete, MdEdit } from "react-icons/md";

import { useDeleteBrandMutation } from "redux/api/catalog/brand";
import {
  IContentConfirm,
  ConfirmDialog,
} from "components/confirm-dialog/confirm-dialog";
import Table from "components/table/table";
import { IBrand, IBrandTable } from "share/types/brand";
import { toast } from "react-toastify";
import ModalUpdateBrand from "./modal-update-brand";
interface ITable {
  data: IBrandTable[];
}
const BrandTable: React.FC<ITable> = ({ data }) => {
  const [remove, resultRemove] = useDeleteBrandMutation();
  const [brandRemove, setBrandRemove] = useState<IContentConfirm>();
  const [brandUpdate, setBrandUpdate] = useState<IBrand>();

  useEffect(() => {
    if (resultRemove.isSuccess) {
      toast.success("Xoá thành công");
    }
  }, [resultRemove]);

  const configData = [
    {
      label: "STT",
      render: (data: IBrandTable) => {
        return data.index;
      },
    },
    {
      label: "Tên thương hiệu",
      render: (data: IBrandTable) => {
        return (
          <div className="flex gap-4">
            <img className="w-8" src={data.imageUrl} alt={data.name} />
            {/* <p>{data.name}</p> */}
          </div>
        );
      },
    },

    {
      label: "Miêu tả",
      render: (data: IBrandTable) => {
        return data.description;
      },
    },

    {
      label: "Tuỳ chọn",
      render: (data: IBrandTable) => {
        const { index, ...rest } = data;

        return (
          <div className="flex gap-4 justify-end">
            <IconButton
              onClick={() => {
                handleBrandRemove({
                  id: data.id,
                  title: `Bạn có muốn xoá thương hiệu ${data.name}`,
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

  const handleToggleUpdate = (data?: IBrand) => {
    setBrandUpdate(data);
  };
  const handleBrandRemove = (data?: IContentConfirm) => {
    setBrandRemove(data);
  };
  return (
    <>
      <Table data={data} config={configData} />
      <ConfirmDialog
        data={brandRemove}
        setData={handleBrandRemove}
        handleConfirm={() => {
          if (brandRemove) {
            remove(brandRemove.id);
            handleBrandRemove();
          }
        }}
      />
      {brandUpdate && (
        <ModalUpdateBrand data={brandUpdate} onToggle={handleToggleUpdate} />
      )}
    </>
  );
};

export default BrandTable;
