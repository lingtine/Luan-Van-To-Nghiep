import React from "react";
import Table from "components/table/table";
import { useFormatPrice } from "hooks/use-format-price";
interface TableProductOrderProps {
  data: {}[];
}

const TableProductOrder: React.FC<TableProductOrderProps> = ({ data }) => {
  const [formatPrice] = useFormatPrice();

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
        return formatPrice.format(data.unitPrice);
      },
    },

    {
      label: "Tổng giá",
      render: (data: any) => {
        return (
          <div className="text-right">
            {formatPrice.format(data.quantity * data.unitPrice)}
          </div>
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
