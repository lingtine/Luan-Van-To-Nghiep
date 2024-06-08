import React, { useEffect, useState } from "react";
import { IconButton } from "@material-tailwind/react";
import { MdDelete, MdEdit } from "react-icons/md";

import { useDeleteCategoryMutation } from "redux/api/catalog/category";
import {
  IContentConfirm,
  ConfirmDialog,
} from "components/confirm-dialog/confirm-dialog";
import Table from "components/table/table";
import { ICategory, ICategoryTable } from "share/types/category";
import { toast } from "react-toastify";
import ModalUpdateCategory from "./modal-update-category";
interface ITable {
  data: ICategoryTable[];
}
const CategoryTable: React.FC<ITable> = ({ data }) => {
  const [remove, resultRemove] = useDeleteCategoryMutation();
  const [categoryRemove, setCategoryRemove] = useState<IContentConfirm>();
  const [categoryUpdate, setCategoryUpdate] = useState<ICategory>();

  useEffect(() => {
    if (resultRemove.isSuccess) {
      toast.success("Xoá thành công");
    }
  }, [resultRemove]);

  const configData = [
    {
      label: "STT",
      render: (data: ICategoryTable) => {
        return data.index;
      },
    },
    {
      label: "Tên Nhóm Danh Mục",
      render: (data: ICategoryTable) => {
        return data.name;
      },
    },

    {
      label: "Miêu tả",
      render: (data: ICategoryTable) => {
        return data.description;
      },
    },

    {
      label: "Tuỳ chọn",
      render: (data: ICategoryTable) => {
        const { index, ...rest } = data;

        return (
          <div className="flex gap-4 justify-end">
            <IconButton
              onClick={() => {
                handleCategoryGroupRemove({
                  id: data.id,
                  title: `Bạn có muốn xoá nhóm danh mục ${data.name}`,
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

  const handleToggleUpdate = (data?: ICategory) => {
    setCategoryUpdate(data);
  };
  const handleCategoryGroupRemove = (data?: IContentConfirm) => {
    if (data) {
      setCategoryRemove(data);
    } else {
      setCategoryRemove(undefined);
    }
  };
  return (
    <>
      <Table data={data} config={configData} />
      <ConfirmDialog
        data={categoryRemove}
        setData={handleCategoryGroupRemove}
        handleConfirm={() => {
          if (categoryRemove) {
            remove(categoryRemove.id);
            handleCategoryGroupRemove();
          }
        }}
      />
      {categoryUpdate && (
        <ModalUpdateCategory
          data={categoryUpdate}
          onToggle={handleToggleUpdate}
        />
      )}
    </>
  );
};

export default CategoryTable;
