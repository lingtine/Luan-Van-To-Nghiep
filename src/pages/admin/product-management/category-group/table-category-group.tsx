import { useParams } from "react-router-dom";
import { Spinner, Button } from "@material-tailwind/react";
import Table from "components/table/table";
import { useGetCategoryGroupsQuery } from "redux/api/catalog/category-group";
import { ICategoryGroup } from "share/types/category-group";
import { IContentConfirm } from "components/confirm-dialog/confirm-dialog";
interface ICategoryGroupTable extends ICategoryGroup {
  index: number;
}

function TableCategoryGroup({
  onRemove,
}: {
  onRemove: (data: IContentConfirm) => void;
}) {
  const { index } = useParams();

  const { data, isLoading, isSuccess } = useGetCategoryGroupsQuery({
    PageIndex: index,
  });
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
        return (
          <div className="flex gap-4 justify-end">
            <Button
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
              Xoá
            </Button>
          </div>
        );
      },
    },
  ];
  let content: React.ReactNode;
  if (isSuccess) {
    const { pageSize, pageIndex } = data;

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
  return <>{content}</>;
}

export default TableCategoryGroup;
