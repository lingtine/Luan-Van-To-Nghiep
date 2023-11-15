import React from "react";
import { IProductSpecifications } from "redux/api/types";
interface TableProductSpecificationsProps {
  data: IProductSpecifications[];
}

const TableProductSpecifications: React.FC<TableProductSpecificationsProps> = ({
  data,
}) => {
  const content = data.map((item) => {
    return (
      <li key={item.id} className="my-2">
        {item.specificationName}: {item.specificationValue}
      </li>
    );
  });

  return (
    <div>
      <h4 className="text-xl font-semibold">Thông số sản phẩm</h4>
      <ul>{content}</ul>
    </div>
  );
};

export default TableProductSpecifications;
