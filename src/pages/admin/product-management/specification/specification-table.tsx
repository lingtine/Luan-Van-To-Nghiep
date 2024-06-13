import React, { useEffect, useState } from "react";
import { IconButton } from "@material-tailwind/react";
import { MdDelete, MdEdit } from "react-icons/md";

import { useDeleteSpecificationMutation } from "redux/api/catalog/specification";
import {
  IContentConfirm,
  ConfirmDialog,
} from "components/confirm-dialog/confirm-dialog";
import Table from "components/table/table";
import { ISpecification, ISpecificationTable } from "share/types/specification";
import { toast } from "react-toastify";
import ModalUpdateSpecification from "./modal-update-specification";
interface ITable {
  data: ISpecificationTable[];
}
const SpecificationTable: React.FC<ITable> = ({ data }) => {
  const [remove, resultRemove] = useDeleteSpecificationMutation();
  const [specificationRemove, setSpecificationRemove] =
    useState<IContentConfirm>();
  const [specificationUpdate, setSpecificationUpdate] =
    useState<ISpecification>();

  useEffect(() => {
    if (resultRemove.isSuccess) {
      toast.success("Xoá thành công");
    }
  }, [resultRemove]);

  const configData = [
    {
      label: "STT",
      render: (data: ISpecificationTable) => {
        return data.index;
      },
    },
    {
      label: "Tên thương hiệu",
      render: (data: ISpecificationTable) => {
        return data.name;
      },
    },

    {
      label: "Miêu tả",
      render: (data: ISpecificationTable) => {
        return data.description;
      },
    },

    {
      label: "Tuỳ chọn",
      render: (data: ISpecificationTable) => {
        const { index, ...rest } = data;

        return (
          <div className="flex gap-4 justify-end">
            <IconButton
              onClick={() => {
                handleSpecificationRemove({
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

  const handleToggleUpdate = (data?: ISpecification) => {
    if (data) {
      setSpecificationUpdate(data);
    } else {
      setSpecificationUpdate(undefined);
    }
  };
  const handleSpecificationRemove = (data?: IContentConfirm) => {
    if (data) {
      setSpecificationRemove(data);
    } else {
      setSpecificationUpdate(undefined);
    }
  };
  return (
    <>
      <Table data={data} config={configData} />
      <ConfirmDialog
        data={specificationRemove}
        setData={handleSpecificationRemove}
        handleConfirm={() => {
          if (specificationRemove) {
            remove(specificationRemove.id);
            handleSpecificationRemove();
          }
        }}
      />
      {specificationUpdate && (
        <ModalUpdateSpecification
          data={specificationUpdate}
          onToggle={handleToggleUpdate}
        />
      )}
    </>
  );
};

export default SpecificationTable;
