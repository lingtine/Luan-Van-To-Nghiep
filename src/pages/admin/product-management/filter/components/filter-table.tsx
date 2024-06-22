import { IFilterTable } from "share/types/filter";
import Table from "components/table/table";

interface FilterTableProps {
  data: IFilterTable[];
}

const FilterTable: React.FC<FilterTableProps> = ({ data }) => {
  const configData = [
    {
      label: "STT",
      render: (data: IFilterTable) => {
        return data.index;
      },
    },
    {
      label: "Tên bộ lọc",
      render: (data: IFilterTable) => {
        return data.filterName;
      },
    },

    {
      label: "Nhóm loại sản phẩm",
      render: (data: IFilterTable) => {
        return data.categoryGroupName;
      },
    },
    {
      label: "Giá trị lọc",
      render: (data: IFilterTable) => {
        return <div className="flex justify-end">{data.values.join(", ")}</div>;
      },
    },
  ];

  return <Table config={configData} data={data}></Table>;
};

export default FilterTable;
