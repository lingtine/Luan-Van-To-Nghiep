import React from "react";

import { IProductSpecification } from "share/types/product";

interface TableProductSpecificationsProps {
  data: IProductSpecification[];
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

  return <ul>{content}</ul>;
};

export default TableProductSpecifications;
