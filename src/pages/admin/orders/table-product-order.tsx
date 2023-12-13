import React from "react";
import Table from "components/table/table";

interface TableProductOrderProps {
  data: {}[];
}

const TableProductOrder: React.FC<TableProductOrderProps> = ({ data }) => {
  const configTableProduct = [
    {
      label: "STT",
      render: (data: any) => {
        return data.index;
      },
    },
    {
      label: "Tên sản phẩm",
      render: (data: any) => {
        return data.name;
      },
    },
    {
      label: "Số lượng",
      render: (data: any) => {
        return data.quantity;
      },
    },

    {
      label: "Giá Bán",
      render: (data: any) => {
        return data.unitPrice;
      },
    },

    {
      label: "Tổng giá",
      render: (data: any) => {
        return (
          <div className="text-right">{data.quantity * data.unitPrice}</div>
        );
      },
    },
  ];
  const updateData = data.map((item, index) => ({
    ...item,
    index: index + 1,
  }));

  return <Table config={configTableProduct} data={updateData}></Table>;
};

export default TableProductOrder;
