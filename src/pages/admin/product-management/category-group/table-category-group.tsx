import React, { useState } from "react";

import { Spinner, IconButton } from "@material-tailwind/react";
import Table from "components/table/table";
import { useGetCategoryGroupsQuery } from "redux/api/catalog/category-group";
import { MdEdit, MdDelete } from "react-icons/md";
import { IContentConfirm } from "components/confirm-dialog/confirm-dialog";
import {
  ICategoryGroup,
  ICategoryGroupTable,
} from "share/types/category-group";
import ModalUpdateCategoryGroup from "./modal-update-category-group";
function TableCategoryGroup({
  onRemove,
}: {
  onRemove: (data: IContentConfirm) => void;
}) {
  const { data, isLoading, isSuccess } = useGetCategoryGroupsQuery({});
  const [categoryGroup, setCategoryGroup] = useState<ICategoryGroup>();
  const configData = [
    {
      label: "STT",
      render: (data: ICategoryGroupTable) => {
        return data.index;
      },
    },
    {
      label: "Tên Nhóm Danh Mục",
      render: (data: ICategoryGroupTable) => {
        return data.name;
      },
    },

    {
      label: "Miêu tả",
      render: (data: ICategoryGroupTable) => {
        return data.description;
      },
    },

    {
      label: "Tuỳ chọn",
      render: (data: ICategoryGroupTable) => {
        const { index, ...rest } = data;

        return (
          <div className="flex gap-4 justify-end">
            <IconButton
              onClick={() => {
                onRemove({
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
                handleToggle(rest);
              }}
            >
              <MdEdit />
            </IconButton>
          </div>
        );
      },
    },
  ];

  const handleToggle = (data?: ICategoryGroup) => {
    setCategoryGroup(data);
  };
  let content: React.ReactNode;
  if (isSuccess) {
    const { pageIndex, pageSize } = data;

    const dataUpdate: ICategoryGroupTable[] = data.data.map((item, index) => ({
      ...item,
      index: index + 1 + pageIndex * pageSize,
    }));
    content = <Table config={configData} data={dataUpdate}></Table>;
  } else if (isLoading) {
    content = (
      <div className="flex justify-center items-center h-[100vh]">
        <Spinner className="h-12 w-12" />
      </div>
    );
  }
  return (
    <>
      {content}

      {categoryGroup && (
        <ModalUpdateCategoryGroup
          categoryGroup={categoryGroup}
          onToggle={handleToggle}
        />
      )}
    </>
  );
}

export default TableCategoryGroup;
